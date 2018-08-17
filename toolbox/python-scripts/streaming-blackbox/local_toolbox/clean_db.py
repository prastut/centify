import pymongo
from bson.objectid import ObjectId

client = pymongo.MongoClient(
    "mongodb://bubble:bubble@104.196.215.99/Bubble", 27017)
db = client["Bubble"]

for post in db.BELFRA_SEMI_JUL17.find():
    if post["tweet"][:2] == "RT":
        delete_one({'_id': ObjectId(post["_id"])})
