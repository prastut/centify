import pymongo

client = pymongo.MongoClient("mongodb://bubble:bubble@104.196.215.99/Bubble")
db = client["Bubble"]

for post in db.CRO_ENTITIES.find():
    if post["entityName"] == "Croatia":
        db.CRO_ENTITIES.update({"_id": post["_id"]}, {
                               "$set": {"entityType": "Team"}}, upsert=True)
    else:
        db.CRO_ENTITIES.update({"_id": post["_id"]}, {
                               "$set": {"entityType": "Player"}}, upsert=True)

for post in db.FRA_ENTITIES.find():
    if post["entityName"] == "France":
        db.FRA_ENTITIES.update({"_id": post["_id"]}, {
                               "$set": {"entityType": "Team"}}, upsert=True)
    else:
        db.FRA_ENTITIES.update({"_id": post["_id"]}, {
                               "$set": {"entityType": "Player"}}, upsert=True)
