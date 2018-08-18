import entity_dict
from pymongo import MongoClient
from itertools import chain
from collections import defaultdict

entity_dict_url = {}

entity_dict_url = entity_dict.entity_dict_ENG_url.copy()
entity_dict_url.update(entity_dict.entity_dict_CRO_url)

client = MongoClient("mongodb://bubble:bubble@104.196.215.99/Bubble", 27017)
db = client["Bubble"]
for key in entity_dict_url:
    doc_to_be_inserted = {}
    doc_to_be_inserted[key] = entity_dict_url[key]
    db.CROENG_ENTITIES.insert(doc_to_be_inserted)