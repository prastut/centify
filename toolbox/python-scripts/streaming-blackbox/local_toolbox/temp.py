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
entity_dict_final = defaultdict(list)

for k, v in chain(entity_dict.entity_dict_CRO.items(), entity_dict.entity_dict_FRA.items()):
    entity_dict_final[k].append(v)
# for k, v in entity_dict_final.items():
#     print(k, v)

final_count = {}

print "starting the loop"
counter = 0
# while starting_time <= finishing_time:
# print "Starting and finishing time for this iteration is: "
# print str(starting_time) + " " + str(finishing_time)
for time_instance in db.TRENDING_CROFRA_FINAL.find():
    counter += 1
    print counter
    finishing_time = time_instance["timeStamp"]
    doc_to_be_inserted = {}
    five_second_sentiment = defaultdict(dict)
    five_second_earlier_timestamp = finishing_time - \
        datetime.timedelta(seconds=5)
    for post in db.CROFRA_FINAL.find({"timeStamp": {"$gte": five_second_earlier_timestamp, "$lte": finishing_time}}):
        if "entity_name" not in post.keys():
            continue
        sentiment_label = post["sentiment"]["label"]
        if sentiment_label == "neutral":
            continue
        sentiment_score = abs(post["sentiment"]["score"])
        # print "The sentiment label and score for this post is: "
        # print str(sentiment_label) + " " + str(sentiment_score)
        for i in entity_dict_final:
            if post["entity_name"] == i:
                # print "Entity matched is: " + str(i)
                if post["entity_name"] in five_second_sentiment.keys():
                    # print "entity already exists, going to update the sentiment score with label: " + \
                    #     str(sentiment_label)
                    if sentiment_label in five_second_sentiment.keys():
                        five_second_sentiment[i][sentiment_label] += sentiment_score
                    else:
                        five_second_sentiment[i][sentiment_label] = sentiment_score
                else:
                    # print "entity did not exist, going to add it with label: " + \
                    #     str(sentiment_label)
                    five_second_sentiment[i][sentiment_label] = sentiment_score
    # print "for loop iterating over 5 seconds time period is over."
    # print five_second_sentiment
    for i in five_second_sentiment.keys():
        current_total = 0
        if "positive" in five_second_sentiment[i].keys():
            current_total += five_second_sentiment[i]["positive"]
        if "negative" in five_second_sentiment[i].keys():
            current_total += five_second_sentiment[i]["negative"]
        if "positive" in five_second_sentiment[i].keys():
            five_second_sentiment[i]["positive"] = (
                (five_second_sentiment[i]["positive"])/(current_total))
        if "negative" in five_second_sentiment[i].keys():
            five_second_sentiment[i]["negative"] = (
                (five_second_sentiment[i]["negative"])/(current_total))
    # print "Printing the complete sentiment."
    # print five_second_sentiment
    # doc_to_be_inserted["sentiment"] = five_second_sentiment
    db.TRENDING_CROFRA_FINAL.update(
        {"_id": time_instance["_id"]}, {"$set": {"sentiment": five_second_sentiment}}, upsert=True)
    del five_second_sentiment
    # print doc_to_be_inserted
    # del doc_to_be_inserted
