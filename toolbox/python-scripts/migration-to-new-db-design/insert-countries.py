from pymongo import MongoClient

client = MongoClient("mongodb://bubble:bubble@104.196.215.99:27017/Bubble")
db = client["EPL"]

entities_collection = "entities_new"

print ('-----------------------------------------')
print "Inserting Country Entities."

france = {
    'key': "France",
    'acronym': "FRA",
    'imageURL': "https://i.imgur.com/A4Ma0Vk.png",
    'type': "team"
}

croatia = {
    'key': "Croatia",
    'acronym': "CRO",
    'imageURL': "https://i.imgur.com/hAmile8.png",
    'type': "team"
}

countries = [france, croatia]


for country in countries:
    print country['key']
    db[entities_collection].insert(country)
