import requests
import datetime
from pymongo import MongoClient
from bson import ObjectId
import os
import time
import sys
import json
import re
from bs4 import BeautifulSoup
import json

## ===== CONFIG ##
fixture_collection = "fixtures"
entities_collection = "entities"

fixture_id = None
events_collection = None
team_one_acronym = None
team_two_acronym = None

SKY_SPORTS_BASE_LINK = "https://data.livefyre.com/bs3/v3.1/bskyb.fyre.co/363166/MTE0MDIxNTE=/"
## ===== ##

db = MongoClient("localhost", 27017)["EPL"]

recorded_time_stamps = set()
global_score_state = {}


def make_sense_from_raw_html(raw_event_info):
    return BeautifulSoup(raw_event_info, 'html.parser')


def parse_goal(title):
    try:
        find_score_state_string = re.search(r'[0-9]-[0-9]', title)
        if find_score_state_string:
            score_state_string = find_score_state_string.group()
            score_state = [int(x) for x in score_state_string.split("-")]
            global_score_state[team_one_acronym] = score_state[0]
            global_score_state[team_two_acronym] = score_state[1]
    except:
        raise


def parse_major_event(raw_major_event, c):
    major_event = raw_major_event[0].split("icon-")[-1]

    switch_major_event_dict = {
        'goal': "GOAL",
        'kick-off': "KICK-OFF",
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
    major_events_inside_minor_events = [
        "SAVE", "OUCH", "WIDE", "NO GOAL", "CLOSE"]
    minor_events_inside_minor_events = [
        {'text': "cross", 'event': "CROSS"},
        {'text': "foul", 'event': "FOUL"},
        {'text': "corner", 'event': "CORNER"}

    ]

    print commentary

    for event in major_events_inside_minor_events:
        if event in commentary:
            print event
            return event

    for event in minor_events_inside_minor_events:
        if event['text'] in commentary:
            return event['event']

    return None


def get_events_from_parsed_info(formatted_raw_data):

    for item in formatted_raw_data:
        event_timestamp = datetime.datetime.fromtimestamp(
            item['content']['createdAt']) - datetime.timedelta(hours=5, minutes=30)

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
                commentary = " ".join(
                    [paragraph.get_text() for paragraph in sensible_event_info.find_all("p")[1:]])

                if raw_major_event:
                    event = parse_major_event(
                        raw_major_event, sensible_event_info)
                else:
                    # event not inside annotations
                    event = parse_minor_event(commentary)

                    # Update global store state
                parse_goal(title)

                # Batch all info together
                event_packet['event'] = event
                event_packet['title'] = title
                event_packet['commentary'] = commentary
                event_packet['score'] = global_score_state
                event_packet['timeStamp'] = event_timestamp

                save(event_packet)

            except Exception as e:
                print "Error"
                print e
                continue


def get_parse_info(raw_data, link):
    if 'headDocument' in raw_data:
        return raw_data['headDocument']['content']
    else:
        return raw_data['content'][::-1]


def get_json(url):
    try:
        raw_data = requests.get(url)
        raw_data.raise_for_status()

        return raw_data.json()
    except:
        raise


def save(event_packet):
    try:
        db[events_collection].insert(event_packet)
    except:
        print "Error in saving packet"
        print "e"

        # requests.get('http://www.skysports.com/football/france-vs-croatia/live/385232')
        # get('https://data.livefyre.com/bs3/v3.1/bskyb.fyre.co/363166/MTE0MDIxNTE=/init', 'init')


def run_past_match():

    links = []

    for json_permutation in range(40, 46):
        links.append("{}.json".format(json_permutation))

    links.append("init")

    for link in links:
        print ""
        print link
        print ""

        try:
            raw_json = get_json(SKY_SPORTS_BASE_LINK + link)
            parsed_info = get_parse_info(raw_json, link)
            get_events_from_parsed_info(parsed_info)
        except:
            continue


def get_teams_acronym(fixture_details):
    team_one_key = fixture_details['teamOne']
    team_two_key = fixture_details['teamTwo']

    team_one_details = db[entities_collection].find_one(
        {'key': team_one_key})
    team_two_details = db[entities_collection].find_one(
        {'key': team_two_key})

    return [team_one_details['acronym'], team_two_details['acronym']]


if __name__ == "__main__":

    fixture_id = "5b814e20cb67141dfdf05308"
    events_collection = fixture_id + "_events"

    fixture_details = db[fixture_collection].find_one(
        {"_id": ObjectId(fixture_id)})

    if fixture_details:
        [team_one_acronym, team_two_acronym] = get_teams_acronym(
            fixture_details)

        global_score_state = {team_one_acronym: 0, team_two_acronym: 0}

        run_past_match()

        # run_live()

    else:
        print "Fixture not present inside " + fixture_collection + "collection"
        exit()
