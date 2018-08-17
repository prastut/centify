from pymongo import MongoClient

client = MongoClient("mongodb://bubble:bubble@104.196.215.99:27017/Bubble")
db = client["EPL"]
counter = 0
for post in db["entities_temp"].find({"team": "Tottenham-Hotspur"}):
    doc_to_be_updated = {}
    doc_to_be_updated["league"] = post["league"]
    doc_to_be_updated["imageURL"] = post["imageURL"]
    doc_to_be_updated["team"] = "Tottenham_Hotspurs"
    doc_to_be_updated["entityName"] = post["entityName"]
    doc_to_be_updated["teamSquadURL"] = post["teamSquadURL"]
    # print post
    # print doc_to_be_updated
    db["entities_temp"].update({"_id": post["_id"]}, {
                               "$set": doc_to_be_updated}, upsert=False)
    counter += 1

print counter
