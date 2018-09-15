from pymongo import MongoClient
import datetime
from bson import ObjectId
from collections import defaultdict
from itertools import chain
import sys

## ===== CONFIG ##
fixture_collection = "fixtures"
entities_collection = "entities_new"

fixture_id = None
## ===== ##

# === Mongo Config
MONGO_URL = os.getenv(
    'MONGODB_URI', "mongodb://bubble:bubble@104.196.215.99:27017/Bubble")

client = MongoClient(MONGO_URL)
db = client["EPL"]
##

"""
    Fetching the collection names for:
        1. fixture info.
        2. resolving trending collection's name.
"""

fixture_id = raw_input("Enter fixture id: ")
trending_collection = fixture_id + "_trending"

"""
    Fetching the entities from the fixture id.

"""
fixture_id = raw_input("Enter fixture id: ")
fixture = db[fixture_collection].find_one({"_id": ObjectId(fixture_id)})
team_one = fixture["teamOne"]
team_two = fixture["teamTwo"]

# fetching entities
entities_cursor = db[entities_collection].find(
    {
        "$or": [
            {"team": team_one}, {"team": team_two}, {
                "key": team_one}, {"key": team_two}
        ]
    }
)

entities = []
for entity in entities_cursor:
    entities.append(entity)

starting_time_cursor = db[fixture_id].find().sort([("timeStamp", 1)])
for starting_time in starting_time_cursor:
    starting_time = starting_time["timeStamp"]
    break

finishing_time = starting_time + datetime.timedelta(hours=2, minutes=30)

final_count = {}
print starting_time
print finishing_time

while starting_time <= finishing_time:
    doc_to_be_inserted = {}
    current_count = {}
    ten_seconds_later = starting_time + datetime.timedelta(seconds=10)
    for post in db[fixture_id].find({"timeStamp": {"$gte": starting_time, "$lte": ten_seconds_later}}):
        if "entity_name" not in post.keys():
            print "No entity name found."
            continue
        for i in range(0, len(entities)):
            print "Consider the following entities."
            print entities[i]['entityName'].keys()
            if post["entity_name"] in entities[i]['entityName'].keys():
                if post["entity_name"] in final_count.keys():
                    final_count[post["entity_name"]] += 1
                else:
                    final_count[post["entity_name"]] = 1
                if post["entity_name"] in current_count.keys():
                    current_count[post["entity_name"]] += 1
                else:
                    current_count[post["entity_name"]] = 1
    doc_to_be_inserted["until_now"] = final_count
    doc_to_be_inserted["current_count"] = current_count
    doc_to_be_inserted["timeStamp"] = starting_time
    print doc_to_be_inserted
    if bool(doc_to_be_inserted) is True:
        db[trending_collection].insert(doc_to_be_inserted)
    else:
        print "Empty pannenga"
    del doc_to_be_inserted
    del current_count
    starting_time = ten_seconds_later

"""
        for i in entity_dict_final:
            if post["entity_name"] == i:
                if post["entity_name"] in final_count.keys():
                    final_count[i] += 1
                else:
                    final_count[i] = 1
                if post["entity_name"] in current_count.keys():
                    current_count[i] += 1
                else:
                    current_count[i] = 1
    doc_to_be_inserted["until_now"] = final_count
    doc_to_be_inserted["current_count"] = current_count
    doc_to_be_inserted["timeStamp"] = starting_time
    if bool(doc_to_be_inserted) is True:
        db.TRENDING_CROFRA_FINAL.insert(doc_to_be_inserted)
    else:
        print "Empty pannenga"
    del doc_to_be_inserted
    del current_count
    starting_time = one_second_later

"""
