from pymongo import MongoClient

client = MongoClient("mongodb://bubble:bubble@104.196.215.99:27017/Bubble")
db = client["EPL"]

events_old = "5b650df1a44157441f6a23a6_events"
events_new = events_old + "_new"

print ('-----------------------------------------')
print "Fixing Entities."




# key_list_excluding_player = [
#     "league", "imageURL", "team", "teamSquadURL", "_id"]



for entity_object in db[entities_old].find({}):
    entity_key = None
    try: 
        entity_key = entity_object["entityName"].keys()[0]
    except AttributeError as e:
        entity_key = entity_object["entityName"]
	
    new_entity = entity_object.copy()
    
    new_entity['key'] = entity_key

    new_entity.pop("entityName", None)

    print new_entity['key']

    db[entities_new].insert(new_entity)
