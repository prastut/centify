import pymongo

client = pymongo.MongoClient("mongodb://bubble:bubble@104.196.215.99/Bubble")
db = client["Bubble"]

cro_ids = []
cro_ids.append(0)
cro_ids.append(4)

counter = 0

for post in db.CROFRA_FINAL_EVENTS.find().sort([("timeStamp", pymongo.DESCENDING)]):
    if post["event"] == "Goal":
        if counter in cro_ids:
            print "Croatia"
            db.CROFRA_FINAL_EVENTS.update(
                {"_id": post["_id"]}, {"$set": {"scoringTeam": "Croatia"}}, upsert=True)
        else:
            print "France"
            db.CROFRA_FINAL_EVENTS.update(
                {"_id": post["_id"]}, {"$set": {"scoringTeam": "France"}}, upsert=True)
        counter += 1
