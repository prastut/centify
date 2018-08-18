from pymongo import MongoClient
import datetime
from bson import ObjectId
from collections import defaultdict
from itertools import chain


# ===== CONFIG ## 
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


fixture_id = raw_input("Please enter the fixture id: \n")
trending_collection = fixture_id + "_trending"

"""
    Fetching the entities from the fixture id.

"""
fixture = db.fixtures.find_one({"_id": ObjectId(fixture_id)})
team_one = fixture["teamOne"]
team_two = fixture["teamTwo"]
# fetching entities
entities_cursor = db.entities.find(
    {
        "$or": [
            {"team": team_one}, {"team": team_two}
        ]
    },
    {
        '_id': False, 'league': False, 'teamSquadURL': False, "imageURL": False, "team": False
    }
)

entities = {}
for entity in entities_cursor:
    for k in entity.keys():
        entities[k] = entity[k]
print entities
entity_dict_final = defaultdict(list)
for k, v in chain(entities.items()):
    entity_dict_final[k].append(v)
print entity_dict_final

print "The fixture id is: " + str(fixture_id)
starting_time_cursor = db[fixture_id].find().sort([("timeStamp", 1)])
for starting_time in starting_time_cursor:
    starting_time = starting_time["timeStamp"]
    break
finishing_time_cursor = db[fixture_id].find().sort([("timeStamp", -1)])
for finishing_time in finishing_time_cursor:
    finishing_time = finishing_time["timeStamp"]
    print "Finishing time"
    print finishing_time
    break

finishing_time = datetime.datetime.strptime(
    "2018-08-12 18:00:00", '%Y-%m-%d %H:%M:%S')
while starting_time <= finishing_time:
    doc_to_be_inserted = {}
    final_count = {}
    ten_seconds_later = starting_time + datetime.timedelta(seconds=10)
    for post in db[fixture_id].find({"timeStamp": {"$gte": starting_time, "$lte": ten_seconds_later}}):
        if "entity_name" not in post.keys():
            continue
        for i in entity_dict_final:
            if post["entity_name"] == i:
                if post["entity_name"] in final_count.keys():
                    final_count[i] += 1
                else:
                    final_count[i] = 1
    doc_to_be_inserted["count"] = final_count
    doc_to_be_inserted["timeStamp"] = starting_time
    print doc_to_be_inserted
    if bool(doc_to_be_inserted) is True:
        db[trending_collection].insert(doc_to_be_inserted)
    else:
        print "Empty pannenga"
    del doc_to_be_inserted
    del final_count
    starting_time = ten_seconds_later


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