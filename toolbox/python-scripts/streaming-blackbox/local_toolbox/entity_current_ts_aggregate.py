import datetime
import sys
import time
from collections import defaultdict
from itertools import chain

import pymongo

import entity_dict

client = pymongo.MongoClient(
    "mongodb://bubble:bubble@104.196.215.99/Bubble", 27017)
db = client["Bubble"]

# get the first timestamp.
# add 5 minutes to it
# iterate over record within this time period
# check for entity count and save the results
# each row in a collectio corresponds to minute(0 => 0 to 5), entity_name and count
starting_time_cursor = db.CROFRA_FINAL.find().sort([("timeStamp", 1)])
for starting_time in starting_time_cursor:
    starting_time = starting_time["timeStamp"]
    break
finishing_time_cursor = db.CROFRA_FINAL.find().sort([("timeStamp", -1)])
for finishing_time in finishing_time_cursor:
    finishing_time = finishing_time["timeStamp"]
    print "Finishing time"
    print finishing_time
    break

entity_dict_final = defaultdict(list)
for k, v in chain(entity_dict.entity_dict_CRO.items(), entity_dict.entity_dict_FRA.items()):
    entity_dict_final[k].append(v)
for k, v in entity_dict_final.items():
    print(k, v)

while starting_time <= finishing_time:
    doc_to_be_inserted = {}
    final_count = {}
    one_second_later = starting_time + datetime.timedelta(seconds=1)
    for post in db.CROFRA_FINAL.find({"timeStamp": {"$gte": starting_time, "$lte": one_second_later}}):
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
        db.CROFRA_FINAL_TRENDING_TS.insert(doc_to_be_inserted)
    else:
        print "Empty pannenga"
    del doc_to_be_inserted
    del final_count
    starting_time = one_second_later
