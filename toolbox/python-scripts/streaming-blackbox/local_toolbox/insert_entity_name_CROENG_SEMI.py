from entity_dict import entity_dict_CRO, entity_dict_ENG
import pymongo
from collections import defaultdict
from itertools import chain

client = pymongo.MongoClient('mongodb://bubble:bubble@104.196.215.99/Bubble', 27017)
db = client["Bubble"]

entity_dict_final = defaultdict(list)
for k, v in chain(entity_dict_CRO.items(), entity_dict_ENG.items()):
    entity_dict_final[k].append(v)

counter = 0

for post in db.CROENG_SEMI.find():
    if "entity_name" in post.keys():
        counter += 1
        print counter
        continue
	text = post["text"]
	_id = post["_id"]
	for i in entity_dict_final:
		for j in entity_dict_final[i]:
			if(text in j):
				db.CROENG_SEMI.update({"_id": _id}, {"$set": {"entity_name": i}}, upsert=True)
	counter += 1
	print counter

#db.foo.update({"_id" :ObjectId("4e93037bbf6f1dd3a0a9541a") },{$set : {"new_field":1}})
"""

for i in entity_dict_final:
                for j in entity_dict_final[i]:
                    if(entity["text"] in j):
                        entity["tweet"] = response["tweet"]
                        entity["tweetId"] = response["tweetId"]
                        entity["timeStamp"] = response["timeStamp"]
                        entity["userProfile"] = response["userProfile"]
                        entity["entity_name"] = i
                        entity["max_emotion"] = max(
                            entity["emotion"].items(), key=operator.itemgetter(1))[0]
                        db[mongo_collection].insert(entity)
"""                        