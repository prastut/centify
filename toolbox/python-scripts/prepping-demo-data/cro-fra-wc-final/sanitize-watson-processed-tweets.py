from pymongo import MongoClient
from bson import ObjectId
from itertools import chain
from collections import defaultdict
import operator

## ===== CONFIG ##
WATSON_PROCESSED_COLLECTION = "CROFRA_FINAL_PROCESSED_TWEETS"
FIXTURE_COLLECTION = "fixtures"
ENTITIES_COLLECTION = "entities"

CRO_FRA_FIXTURE_ID = "5b814e20cb67141dfdf05308"

## ===== ##

db = MongoClient("mongodb://localhost:27017/")['EPL']

fixture_details = db[FIXTURE_COLLECTION].find_one(
    {"_id": ObjectId(CRO_FRA_FIXTURE_ID)})

team_one = fixture_details["teamOne"]
team_two = fixture_details["teamTwo"]

entities_cursor = db[ENTITIES_COLLECTION].find(
    {
        "$or": [
            {"team": team_one}, {"team": team_two}, {
                "key": team_one}, {"key": team_two}
        ]
    }
)

entities = []
document_to_be_appended = {}
for entity in entities_cursor:
    splitted_key = entity["key"].split("_")
    full_name = ""
    for x in range(0, len(splitted_key) - 1):
        full_name += splitted_key[x] + " "
    full_name += splitted_key[-1]
    splitted_key.append(full_name)
    document_to_be_appended[entity["key"]] = splitted_key

entity_dict_final = defaultdict(list)
for k, v in chain(document_to_be_appended.items()):
    entity_dict_final[k].append(v)


db[WATSON_PROCESSED_COLLECTION].create_index([("sequence", 1)])
tweets_cursor = db[WATSON_PROCESSED_COLLECTION].find(
    {}, {'_id': False}).sort([("sequence", 1)])


def get_sentiment(sentiment_object):
    if sentiment_object["label"] == "positive":
        return sentiment_object["score"]*100
    elif sentiment_object["label"] == "negative":
        return 100*(1 - abs(sentiment_object["score"]))
    else:
        return 50


def get_emotion(emotion_object):
    return max(emotion_object.items(), key=operator.itemgetter(1))[0]


for tweet_object in tweets_cursor:
    analysis = tweet_object["watson"]
    all_entities_found_in_analysis = analysis["entities"]

    for found_entity_object in all_entities_found_in_analysis:
        if "emotion" not in found_entity_object.keys():
            continue

        try:
            for sampled_entity_key in entity_dict_final:
                for sampled_entity_key_permutation in entity_dict_final[sampled_entity_key]:
                    found_entity_permutation = found_entity_object["text"]

                    if found_entity_permutation in sampled_entity_key_permutation:
                        updated_tweet_object = tweet_object.copy()
                        updated_tweet_object.pop("watson", None)

                        updated_tweet_object["key"] = sampled_entity_key
                        updated_tweet_object["sentiment"] = get_sentiment(
                            found_entity_object["sentiment"])
                        updated_tweet_object["emotion"] = get_emotion(
                            found_entity_object["emotion"])

                        db[CRO_FRA_FIXTURE_ID].insert(updated_tweet_object)

        except Exception as e:
            print "error"
            print e
