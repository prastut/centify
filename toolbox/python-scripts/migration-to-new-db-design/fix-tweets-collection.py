from pymongo import MongoClient
 
client = MongoClient("mongodb://bubble:bubble@104.196.215.99:27017/Bubble")
db_pre_epl = client["Bubble"]
db = client["EPL"]
 
fixture_id = "5b6efa5989d81053b5621f66"
 
print ('-----------------------------------------')
print "Trending."
trending_id = fixture_id + "_trending"
for post in db_pre_epl.TRENDING_CROFRA_FINAL.find({}, {"_id": False}):
    print post
    db[trending_id].insert(post)