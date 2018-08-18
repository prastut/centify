import pymongo
from entity_dict import entity_dict_FRA

client = pymongo.MongoClient("mongodb://bubble:bubble@104.196.215.99/Bubble")
db = client["Bubble"]

for post in db.TRENDING_CROFRA_FINAL.find():
    if "diffTrending" in post.keys():
        for entity in entity_dict_FRA:
            if entity in post["diffTrending"].keys():
                print post
