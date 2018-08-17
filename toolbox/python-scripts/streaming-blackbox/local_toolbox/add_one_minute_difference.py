import pymongo
import sys

client = pymongo.MongoClient("mongodb://bubble:bubble@104.196.215.99/Bubble")
db = client["Bubble"]

counter = 0
prev = {}
curr = {}
for post in db.TRENDING_CROFRA_FINAL.find().sort([("timeStamp", 1)]):
    counter += 1
    if counter == 1:
        prev = post["until_now"]
        continue
    curr = post["until_now"]
    diff = {}
    for keys_curr in curr.keys():
        if keys_curr in prev.keys():
            difference = curr[keys_curr] - prev[keys_curr]
            if difference == 0:
                continue
            diff[keys_curr] = curr[keys_curr] - prev[keys_curr]
        else:
            diff[keys_curr] = curr[keys_curr]
    for keys_prev in prev.keys():
        if keys_prev not in curr.keys():
            diff[keys_prev] = curr[keys_prev]
    # db.Doc.update({"_id": b["_id"]}, {"$set": {"geolocCountry": myGeolocCountry}})
    db.TRENDING_CROFRA_FINAL.update(
        {"_id": post["_id"]}, {"$set": {"diffTrending": diff}}, upsert=True)
    prev = curr
    print counter

# db.foo.update({"_id": ObjectId("4e93037bbf6f1dd3a0a9541a")}, {$set: {"new_field": 1}})
