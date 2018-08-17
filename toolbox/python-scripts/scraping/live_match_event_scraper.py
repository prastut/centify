import requests
import datetime
from pymongo import MongoClient
import time
import sys

client = MongoClient("mongodb://bubble:bubble@104.196.215.99:27017/Bubble")
db = client["EPL"]
collection = raw_input("Please enter the destination collection. \n")

events = ["GOAL", "YELLOW", "RED", "Goal", "Yellow", "Red"]
cards = ["Yellow", "Red", "YELLOW", "RED", "yellow", "red"]


def get(url, name='?'):

    print('---', name, '---')

    r = requests.get(url)

    data = r.json()
    # print(data.keys())
    # print(data['headDocument'].keys())
    # print(data['featured'].keys())
    # print(data['featured']['content'][0])
    # print(data['networkSettings'].keys())
    # print(data['siteSettings'].keys())
    # print(data['collectionSettings'].keys())

    if 'headDocument' in data:
        data = data['headDocument']['content']
    else:
        data = data['content'][::-1]

    for item in data:
        annotations = None
        if not 'bodyHtml' in item['content'].keys():
            continue
        # print item['content']['bodyHtml']
        dt = datetime.datetime.fromtimestamp(item['content']['createdAt'])
        if "annotations" in item['content'].keys():
            if "messagetag" in item['content']['annotations'].keys():
                annotations = str(
                    item['content']['annotations']['messagetag'][0])
        time = dt.strftime('%Y.%m.%d %H:%M')
        time = datetime.datetime.strptime(time, '%Y.%m.%d %H:%M')
        time = time - datetime.timedelta(hours=5, minutes=30)
        title = item['content']['bodyHtml']
        try:
            commentary = title.split("<p>")[-1]
            title = title.split('</strong>')[0].split('<strong>')[1]
            event_id = item['event']
            # print "event_id"
            save(time, title, event_id, annotations)
            # print(time, title)
            # print event_id
        except Exception as e:
            # print e
            continue


def save(time, title, event_id, annotations):
    # print "save called."
    doc_to_be_inserted = {}
    doc_to_be_inserted["timeStamp"] = time
    event_occured = None
    for event in events:
        if event in title:
            # print title
            event_occured = event
            break
    doc_to_be_inserted["title"] = title
    doc_to_be_inserted["event"] = event_occured if event_occured is not None else False
    
    if annotations is not None:
        if "yellow" in annotations:
            doc_to_be_inserted["event"] = "YELLOW"
            doc_to_be_inserted["card"] = "YELLOW"
        if "red" in annotations:
            doc_to_be_inserted["event"] = "RED"
            doc_to_be_inserted["card"] = "RED"
    else:
        doc_to_be_inserted["card"] = False
   
    doc_to_be_inserted["eventId"] = event_id
    
    # if doc_to_be_inserted["event"] == "GOAL":
    if doc_to_be_inserted["event"]:
        print doc_to_be_inserted

    # try:
    #     db[collection].insert(doc_to_be_inserted)
    #     # print doc_to_be_inserted
    # except Exception as e:
    #     return

        # requests.get('http://www.skysports.com/football/france-vs-croatia/live/385232')
        #get('https://data.livefyre.com/bs3/v3.1/bskyb.fyre.co/363166/MTE0MDIxNTE=/init', 'init')


def try_several():
    get('https://data.livefyre.com/bs3/v3.1/bskyb.fyre.co/363166/MTE0NjUwODE=/0.json')
    get('https://data.livefyre.com/bs3/v3.1/bskyb.fyre.co/363166/MTE0NjUwODE=/1.json')
    get('https://data.livefyre.com/bs3/v3.1/bskyb.fyre.co/363166/MTE0NjUwODE=/init', 'init')
    # get('https://data.livefyre.com/bs3/v3.1/bskyb.fyre.co/363166/MTE0NjUwMjg=/init', 'init')
    # comment the below piece of code in order to stream just the live match.
    # for x in range(0, 3):
    # # an example just below is the standard format of how serial parsing should be.
    # # get('https://data.livefyre.com/bs3/v3.1/bskyb.fyre.co/363166/MTE0MDIxNTE=/{}.json'.format(x), x)
    # get('https://data.livefyre.com/bs3/v3.1/bskyb.fyre.co/363166/MTE0NjUwMjg=/{}.json'.format(x), x)


# while True:
#     time.sleep(5)
#     try_several()

try_several()
