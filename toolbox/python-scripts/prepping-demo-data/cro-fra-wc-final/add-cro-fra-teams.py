from pymongo import MongoClient

db = MongoClient("localhost", 27017)["EPL"]

ENTITIES_COLLECTION = "entities"

france = {
    'league': "FIFA_WC",
    'acronym': "FRA",
    'imageURL': "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    'key': "France",
    'type': "Team"
}

croatia = {
    'league': "FIFA_WC",
    'acronym': "CRO",
    'imageURL': "https://upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Croatia.svg",
    'key': "Croatia",
    'type': "Team"
}

countries = [france, croatia]

for country in countries:
    db[ENTITIES_COLLECTION].insert(country)
