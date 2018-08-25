import os
from pymongo import MongoClient
from bson import ObjectId
import settings_watson
import json
from watson_developer_cloud import NaturalLanguageUnderstandingV1
from watson_developer_cloud.natural_language_understanding_v1 import Features, EntitiesOptions, KeywordsOptions, CategoriesOptions

## ===== CONFIG ##
RAW_TWEETS_COLLECTION = "CROFRA_FINAL_RAW_TWEETS"
WATSON_PROCESSED_COLLECTION = "CROFRA_FINAL_PROCESSED_TWEETS"

FIXTURE_COLLECTION = "fixtures"
ENTITIES_COLLECTION = "entities"

FIXTURE_ID = "5b814e20cb67141dfdf05308"
## ===== ##


# === Mongo Config
db = MongoClient("mongodb://root:root@localhost:27017/")["EPL"]

natural_language_understanding = NaturalLanguageUnderstandingV1(
    username=settings_watson.username,
    password=settings_watson.password,
    version='2018-03-16')


def merge_two_dicts(x, y):
    z = x.copy()
    z.update(y)
    return z


def analyze_tweet_from_watson(raw_tweet_object):
    try:
        response = natural_language_understanding.analyze(
            text=raw_tweet_object["tweet"],
            features=Features(
                entities=EntitiesOptions(
                    emotion=True,
                    sentiment=True,
                    limit=2),
                keywords=KeywordsOptions(
                    emotion=True,
                    sentiment=True,
                    limit=2)),
            language='en'
        )

        return merge_two_dicts(raw_tweet_object, {'watson': response})
    except Exception as e:
        print raw_tweet_object['sequence']
        print e
        return None


if __name__ == "__main__":
    fixture_details = db[FIXTURE_COLLECTION].find_one(
        {"_id": ObjectId(FIXTURE_ID)})

    team_one = fixture_details["teamOne"]
    team_two = fixture_details["teamTwo"]

    all_entities_for_fixture = list(db[ENTITIES_COLLECTION].find(
        {
            "$or": [
                {"team": team_one}, {"team": team_two}, {
                    "key": team_one}, {"key": team_two}
            ]
        }
    ))

    last_sequence_in_processed_collection = int(list(
        db[WATSON_PROCESSED_COLLECTION].find().sort([("sequence", -1)]).limit(1))[0]['sequence'])

    print last_sequence_in_processed_collection

    raw_tweets_cursor = db[RAW_TWEETS_COLLECTION].find({}, {'_id': False})

    for raw_tweet_object in raw_tweets_cursor:
        if int(raw_tweet_object['sequence']) > last_sequence_in_processed_collection:
            print raw_tweet_object['tweet']
            analyzed_tweet_object = analyze_tweet_from_watson(raw_tweet_object)
            if analyzed_tweet_object:
                db[WATSON_PROCESSED_COLLECTION].insert(analyzed_tweet_object)
                print ""
            else:
                print "Watson finished"
                break
