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

    try:
        first_name = entity_object[entity_key][0]
        last_name = entity_object[entity_key][1]
        full_name = entity_object[entity_key][2]

        new_entity.update({
            'entity': {
                'key': entity_key,
                'firstName': first_name,
                'lastName': last_name,
                'fullName': full_name
            }})

    except IndexError as e:
        print e
        continue

    db[entities_new].insert(new_entity)
