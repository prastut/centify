from pymongo import MongoClient

## ===== CONFIG ##
COLLECTION = "5b814e20cb67141dfdf05308_trending"
## ===== ##


db = MongoClient("mongodb://localhost:27017/")['EPL']

db["fixtures"].update_many( {}, { '$rename': { 'startTime': 'timeStamp'}})