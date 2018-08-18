import requests
import datetime
from pymongo import MongoClient
from bson import ObjectId
import time
import sys
import json
import re
from bs4 import BeautifulSoup

## ===== CONFIG ## 
fixture_collection = "fixtures"
entities_collection = "entities_new"

fixture_id = None
events_collection = None
team_one_acronym = None
team_two_acronym = None
## ===== ##

MONGO_URL = os.getenv(
    'MONGODB_URI', "mongodb://bubble:bubble@104.196.215.99:27017/Bubble")
    
client = MongoClient(MONGO_URL)
db = client["EPL"]

recorded_time_stamps = set()
global_score_state = {}


def make_sense_from_raw_html(raw_event_info):
    return BeautifulSoup(raw_event_info, 'html.parser')
    
def parse_goal(title):
    try:
        score_state_string = re.search(r'[0-9]-[0-9]', title).group()
        score_state = [int(x) for x in score_state_string.split("-")]

        global_score_state[team_one_acronym] = score_state[0]
        global_score_state[team_two_acronym] = score_state[1]
    except AttributeError as e:
        pass

def parse_major_event(raw_major_event, c):
    major_event = raw_major_event[0].split("icon-")[-1]

    switch_major_event_dict = {
        'goal': "GOAL",
        'full-time': "FULL-TIME",
        'half-time': "HALF-TIME",
        'yellow-card': "YELLOW",
        'red-card': "RED",
        'penalty-missed': "PENALTY-MISSED",
        'injury': "INJURY", 
        'substitution': "SUBSTITUTION", 
        'whistle': "START-SECOND-HALF", 
    }

    return switch_major_event_dict.get(major_event, None)



def parse_minor_event(commentary):
    major_events_inside_minor_events = ["SAVE", "OUCH", "WIDE", "NO GOAL", "CLOSE"]
    minor_events_inside_minor_events = [
        {'text': "cross", 'event': "CROSS"}, 
        {'text': "foul", 'event': "FOUL"}, 
        {'text': "corner", 'event': "CORNER"}
        
    ]

    for event in major_events_inside_minor_events:
        if event in commentary:
           return event

    for event in minor_events_inside_minor_events:
        if event['text'] in commentary:
            return event['event']

    return None

def get(url, name='?'):
    raw_data = requests.get(url).json()
    formatted_raw_data = None

    if 'headDocument' in raw_data:
        formatted_raw_data = raw_data['headDocument']['content']
    else:
        formatted_raw_data = raw_data['content'][::-1]

    for item in formatted_raw_data:
            event_timestamp = datetime.datetime.fromtimestamp(item['content']['createdAt'])
            
            if event_timestamp not in recorded_time_stamps:
                
                event_packet = {}
                event = None


                recorded_time_stamps.add(event_timestamp)
                try:
                    raw_content = item['content']

                    annotations = raw_content.get('annotations', None)
                    raw_event_info = raw_content.get('bodyHtml', None) 
                    raw_major_event = annotations.get('messagetag', None)
                    
                    sensible_event_info = make_sense_from_raw_html(raw_event_info)
                    title = sensible_event_info.find("strong").get_text()
                    commentary = " ".join([paragraph.get_text() for paragraph in sensible_event_info.find_all("p")[1:] ])
 
                    if raw_major_event:
                        event = parse_major_event(raw_major_event, sensible_event_info)
                    else:
                        #event not inside annotations
                        event = parse_minor_event(commentary)

                    #Logging Purposes
                    print event

                    # Update global store state
                    parse_goal(title)
                    
                    #Batch all info together
                    event_packet['event'] = event
                    event_packet['title'] = title
                    event_packet['commentary'] = commentary
                    event_packet['score'] = global_score_state
                    event_packet['timeStamp'] = event_timestamp

                    save(event_packet)
                
                except AttributeError as e:
                    print e
            else:
                # Repeated tweet
                pass

def save(event_packet):
    try:
        db[events_collection].insert(event_packet)
    except Exception as e:
        return

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

if __name__ == "__main__":
    
    fixture_id = raw_input("Enter fixture id: ")
    events_collection = fixture_id + "_events"

    fixture_details = db[fixture_collection].find_one({"_id": ObjectId(fixture_id)})
    
    if fixture_details:
        team_one_key = fixture_details['teamOne']
        team_two_key = fixture_details['teamTwo']

        team_one_details = db[entities_collection].find_one({'key': team_one_key})
        team_two_details = db[entities_collection].find_one({'key': team_two_key})

        team_one_acronym = team_one_details['acronym']
        team_two_acronym = team_two_details['acronym']

        global_score_state = {team_one_acronym: 0, team_two_acronym: 0}
        
        print global_score_state
        try_several()
    else:
        print "Fixture not present inside " + fixture_collection + "collection"
        exit()


   

# while True:
#     time.sleep(5)
#     try_several()

# try_several()

			