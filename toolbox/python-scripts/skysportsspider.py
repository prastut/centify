from urllib.parse import urlparse
from urllib.request import Request
import json
import os,csv

import scrapy
from scrapy import Selector
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
from bs4 import BeautifulSoup

from multiprocessing import Process, Queue
from threading import Thread
import time

from bubblebackend import database_helper, Event

class SkysportItem(scrapy.Item):
    time = scrapy.Field()
    title = scrapy.Field()
    text = scrapy.Field()
    attachments = scrapy.Field()

class SkySportCommentSpider(scrapy.Spider):
    name = 'skysport_comment'

    def __init__(self, start_url=None, *args, **kwargs):
        super(SkySportCommentSpider, self).__init__(*args, **kwargs)
        self.start_url = start_url
        self.url = ''
        self.json_domain = 'https://data.livefyre.com/'
        self.request_counter = 0
        self.result = []
        self.item = SkysportItem()
        self.count_404 = 0

    def start_requests(self):
        url = self.start_url
        yield scrapy.Request(url, self.parse)

    def parse(self, response):
        hashed_url = response.xpath('//*[@id="pinned"]/@data-url').extract_first()
        try:
            path = urlparse(hashed_url).path.replace('featured', '')
            self.url = '{domain}{path}'.format(domain=self.json_domain, path=path)
            next_url = self.url + '{}.json'.format(self.request_counter)
            yield scrapy.Request(next_url, self.load_comment)

        except TypeError:
            comments = response.xpath('//div[contains(@id, "live-text")]').extract()
            for comment in comments:
                sel = Selector(text=comment)
                self.item['time'] = sel.xpath('//a/time/text()').extract_first()
                self.item['text'] = sel.xpath('//p/text()').extract_first()
                yield self.item

    def load_comment(self, response):
        jsonresponse = json.loads(response.body_as_unicode())
        if jsonresponse.get('content'):
            for obj in jsonresponse['content']:
                if obj['vis'] == 1:
                    self.item['time'] = obj['content']['createdAt']
                    body = Selector(text=obj['content']['bodyHtml'])
                    self.item['title'] = body.xpath('//strong/text()').extract_first()
                    soup = BeautifulSoup(''.join(body.xpath('//p').extract()[1:]))
                    self.item['text'] = soup.get_text().strip()
                    # attachment = obj['content'].get('attachments')
                    if obj['content'].get('attachments'):
                        if obj['content']['attachments'][0].get('html'):
                            attachment_body = Selector(
                                text=obj['content']['attachments'][0]['html'])
                            self.item['attachments'] = attachment_body.xpath('//img/@src').extract_first()
                    yield self.item
                else:
                    continue
            self.request_counter += 1
            next_url = self.url + '{}.json'.format(self.request_counter)
            yield response.follow(next_url, self.load_comment)

def run_reactor(url):

    settings = get_project_settings()
    work_dir = os.path.dirname(os.path.realpath(__file__))
    output_file = '{}/data.json'.format(work_dir)
    settings.set('FEED_FORMAT', 'json')
    settings.set('FEED_URI', output_file)
    process = CrawlerProcess(settings)
    process.crawl(SkySportCommentSpider, start_url=url)
    process.start(stop_after_crawl=False)

    

def run_skysports_spider(url):
    work_dir = os.path.dirname(os.path.realpath(__file__))
    output_file = '{}/data.json'.format(work_dir)
    def f(q):
        try:
            settings = get_project_settings()
            settings.set('FEED_FORMAT', 'json')
            settings.set('FEED_URI', output_file)
            settings.set("LOG_ENABLED", False)
            process = CrawlerProcess(settings)
            process.crawl(SkySportCommentSpider, start_url=url)
            process.start()
            q.put(None)
        except Exception as e:
            q.put(e)

    q = Queue()
    p = Process(target=f, args=(q,))
    p.start()
    result = q.get()
    p.join()

    if result is not None:
        raise result

    with open(output_file) as data_file:
        try:
            data = json.load(data_file)
        except:
            pass
        os.remove(output_file)
    return data

class SkySportsCommentary(Thread):
    
    __stop = False
    
    def __init__(self,channels,callback,match_id=None,match_url=None,update_rate=10):

        if match_id:
            match_details = database_helper.get_match(match_id)
            self.url = match_details["scraping_url"]
        elif match_url:
            self.url = match_url
        else:
            raise Exception("Requires match_id or match_url")
        self.update_rate = update_rate
        Thread.__init__(self)
        self.callback = callback
        self.text_to_channels = {}
        for key, value in channels.items():
            for text in value:
                if text in self.text_to_channels:
                    print(text, " already in text to channels")
                if len(text) > 3:
                    self.text_to_channels[text] = key

    
    def run(self):
        while True:
            if self.__stop == True:
                print("Stopping Commentary")
                return
            data = run_skysports_spider(self.url)
            self.__parse_data(data)
            
            time.sleep(self.update_rate)
    
    def stop(self):
        self.__stop = True

    def check_entities(self,text):
        entities = []
        for ele in self.text_to_channels:
            if ele.lower() in text.lower():
                entities.append(self.text_to_channels[ele])
        return entities

    def get_event(self,data_point,entities):
        time = data_point["time"]
        valid_events =["GOAL!","CHANCE!","SAVE!","SHOT!","YELLOW!","BAR!","GOAL DISALLOWED!","SUB!","SUBS!","NO PENALTY!","SITTER!","MISS!"]
        title = data_point["title"]
        text = data_point["text"]
        for event in valid_events:
            if event in title or event in text:
                new_event = Event(time,event,entities)
                return new_event
        return None
    
    def __parse_data(self,data):
        raw_data = {}
        raw_events = {}
        
        for ele in data:
            text = ele["text"]
            minute = None
            if ele["text"] == "":
                continue

            entities = self.check_entities(text)
            event = self.get_event(ele,entities)

            if text.split(":")[0][:1].strip().isdigit():
                minute = eval(text.split(":")[0].strip())

            ## If Minute not available Try to get the minute
            if minute == None:
                current_time = int(ele["time"])
                prev_commentary_sorted = sorted(raw_data.items(),reverse=True,key = lambda x: x[0])
                if len(prev_commentary_sorted) > 0:
                    previous_comment_time = prev_commentary_sorted[0][0]
                    prev_commntary_minute = prev_commentary_sorted[0][1]["minute"]
                    if prev_commntary_minute:
                        minute = int(prev_commntary_minute)+int((current_time - previous_comment_time)/60)
                
            raw_data[int(ele["time"])] = {"minute": minute, "event": event, "text": text,"entities":entities}
        
        
        self.callback(raw_data,data)       

if __name__ == "__main__":
    result = run_skysports_spider(url='http://www.skysports.com/football/liverpool-vs-man-utd/live/373171')

    with open("output.csv","w") as f:
        csv_writer = csv.writer(f)
        keys = list(result[0].keys())
        csv_writer.writerow(keys)
        for ele in result:
            row = [ele[x] for x in keys]
            csv_writer.writerow(row)