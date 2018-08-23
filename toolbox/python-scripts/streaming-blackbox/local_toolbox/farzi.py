import pymongo
client = pymongo.MongoClient('mongodb://bubble:bubble@104.196.215.99/Bubble', 27017)
db = client["Bubble"]

fault_counter = 0
counter = 0

print "About to check"
for post in db.BELFRA_SEMI.find():
	if "entity_name" not in post.keys():
		fault_counter += 1
	counter += 1
	print counter
print "Its over."
print fault_counter