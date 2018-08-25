import os
from pymongo import MongoClient
from bson import ObjectId
import settings_watson
import json
from multiprocessing import Pool
from watson_developer_cloud import NaturalLanguageUnderstandingV1
from watson_developer_cloud.natural_language_understanding_v1 import Features, EntitiesOptions, KeywordsOptions, CategoriesOptions

## ===== CONFIG ##
RAW_TWEETS_COLLECTION = "CROFRA_FINAL_RAW_TWEETS"
WATSON_PROCESSED_COLLECTION = "CROFRA_FINAL_PROCESSED_TWEETS"

FIXTURE_COLLECTION = "fixtures"
ENTITIES_COLLECTION = "entities"

FIXTURE_ID = "5b814e20cb67141dfdf05308"
last_sequence_in_processed_collection = None
## ===== ##


# === Mongo Config
natural_language_understanding = NaturalLanguageUnderstandingV1(
    username=settings_watson.username,
    password=settings_watson.password,
    version='2018-03-16')


def merge_two_dicts(x, y):
    z = x.copy()
    z.update(y)
    return z


def create_connect():
    return MongoClient("mongodb://root:root@localhost:27017/", maxPoolSize=20)


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


def consumer(raw_tweet_object):
    if int(raw_tweet_object['sequence']) > last_sequence_in_processed_collection:
        print ""
        print raw_tweet_object['tweet']
        print raw_tweet_object['sequence']
        analyzed_tweet_object = analyze_tweet_from_watson(raw_tweet_object)
        if analyzed_tweet_object:
            db = create_connect()['EPL']
            db[WATSON_PROCESSED_COLLECTION].insert(analyzed_tweet_object)
        else:
            print "Watson finished"

        print ""


if __name__ == "__main__":
    # multiprocessing_config
    tweets_batch = []
    pool = Pool(10)
    limited = 100
    skipped = 0

    db = create_connect()['EPL']
    raw_tweets_count = db[RAW_TWEETS_COLLECTION].count()

    last_sequence_in_processed_collection = int(list(
        db[WATSON_PROCESSED_COLLECTION].find().sort([("sequence", -1)]).limit(1))[0]['sequence'])

    print last_sequence_in_processed_collection

    while True:
        raw_tweets_cursor = db[RAW_TWEETS_COLLECTION].find(
            {}, {'_id': False}).skip(skipped).limit(limited)

        if skipped > raw_tweets_count:
            break

        pool.map(consumer, raw_tweets_cursor)
        skipped = skipped + limited
