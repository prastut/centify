import datetime

import pymongo

client = pymongo.MongoClient("mongodb://bubble:bubble@104.196.215.99/Bubble")
db = client["Bubble"]

break_off = datetime.datetime.strptime(
    "2018-07-15T15:48:00Z", '%Y-%m-%dT%H:%M:%SZ')
for post in db.CROFRA_FINAL_EVENTS.find().sort([("timeStamp", 1)]):
    if post["timeStamp"] > break_off:
        # print post["timeStamp"]
        correct_timestamp = post["timeStamp"] + datetime.timedelta(minutes=18)
        db.CROFRA_FINAL_EVENTS.update(
            {"_id": post["_id"]}, {"$set": {"timeStamp": correct_timestamp}}, upsert=True)
