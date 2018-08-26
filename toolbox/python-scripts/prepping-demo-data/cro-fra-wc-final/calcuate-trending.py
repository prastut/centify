from pymongo import MongoClient
from bson import ObjectId
from itertools import chain
from collections import defaultdict
import operator

## ===== CONFIG ##
CRO_FRA_FIXTURE_ID = "5b814e20cb67141dfdf05308"
CRO_FRA_FIXTURE_ID_TRENDING = CRO_FRA_FIXTURE_ID + "_trending"
## ===== ##

db = MongoClient("mongodb://localhost:27017/")['EPL']

db[CRO_FRA_FIXTURE_ID].create_index([("sequence", 1)])
tweets_cursor = db[CRO_FRA_FIXTURE_ID].find(
    {}, {'_id': False}).sort([("sequence", 1)])


until_now_dict = {}

for tweet_object in tweets_cursor:
  
  key = tweet_object['key']

  if key not in until_now_dict:
	  until_now_dict[key] = 1
  else:
	  until_now_dict[key] = until_now_dict[key] + 1

  
  trending_dict = {
	  'sequence': tweet_object['sequence'],
	  'created_at': tweet_object['created_at'],
	  'until_now': until_now_dict,
  }

  print ""
  print trending_dict
  print ""

  db[CRO_FRA_FIXTURE_ID_TRENDING].insert(trending_dict)