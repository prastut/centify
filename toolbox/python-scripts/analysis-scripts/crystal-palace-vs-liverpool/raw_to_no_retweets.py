# -*- coding: utf-8 -*-
from pymongo import MongoClient

ENTITIES_COLLECTION = "entities"
FIXTURE_ID = "5b7afa907da5160c055a738c"
FIXTURE_PROCESSED_ID = FIXTURE_ID + "-no-retweets"

db = MongoClient("localhost", 27017)["EPL"]

tweets_cusor = db[FIXTURE_ID].find()


for tweet in tweets_cusor:
    tweet_text = tweet['tweet']

    if "RT" not in tweet_text[:2]:
        db[FIXTURE_PROCESSED_ID].insert(tweet)
