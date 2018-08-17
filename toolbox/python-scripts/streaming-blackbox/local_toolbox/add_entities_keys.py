from pymongo import MongoClient

client = MongoClient("mongodb://bubble:bubble@104.196.215.99:27017/Bubble")
db = client["EPL"]

counter = 0

to_be_ingored_keys = ['league', 'imageURL', 'team', '_id', 'teamSquadURL']
for post in db["entities_temp"].find({"team": "Fulham"}):
    counter += 1
    doc_to_be_updated = {}
    doc_to_be_updated["league"] = post['league']
    doc_to_be_updated['imageURL'] = post['imageURL']
    doc_to_be_updated['team'] = post['team']
    doc_to_be_updated['teamSquadURL'] = post['teamSquadURL']
    doc_to_be_updated['entityName'] = post['entityName']
    db["entities_temp"].insert(doc_to_be_updated)
    print doc_to_be_updated
