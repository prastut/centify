import pymongo
client_server = pymongo.MongoClient(
    "mongodb://bubble:bubble@104.196.215.99:27017/Bubble")
db_server = client_server["EPL"]

client_local = pymongo.MongoClient("localhost", 27017)
db_local = client_local["EPL"]

for post in db_local.fixtures.find():
    document_to_be_inserted = {}
    document_to_be_inserted["teamTwo"] = post["teamTwo"]
    document_to_be_inserted["timeStamp"] = post["timeStamp"]
    document_to_be_inserted["teamOne"] = post["teamOne"]
    db_server.fixtures.insert(document_to_be_inserted)
