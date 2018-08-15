from pymongo import MongoClient

client = MongoClient("mongodb://bubble:bubble@104.196.215.99:27017/Bubble")
db = client["EPL"]

entities_old = "entities"
entities_new = "entities_new"

print ('-----------------------------------------')
print "Fixing Entities."


key_list_excluding_player = [
    "league", "imageURL", "team", "teamSquadURL", "_id"]


for entity_object in db[entities_old].find({}):
    entity_key = None
    for key in list(entity_object.keys()):
        if not key in key_list_excluding_player:
            entity_key = key

    print entity_key
    new_entity = entity_object.copy()

    new_entity.update({
        'key': entity_key,
        'type': "Player"
    })

    db[entities_new].insert(new_entity)
