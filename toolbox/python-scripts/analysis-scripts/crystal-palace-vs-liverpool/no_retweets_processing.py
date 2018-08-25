# -*- coding: utf-8 -*-
from pymongo import MongoClient
import operator

ENTITIES_COLLECTION = "entities"
FIXTURE_ID = "5b7afa907da5160c055a738c"

FIXTURE_NO_RETWEETS_ID = FIXTURE_ID + "-no-retweets"
FIXTURE_NO_RETWEETS_PLUS_PROCESSED_ID = FIXTURE_NO_RETWEETS_ID + "-processed"


db = MongoClient("localhost", 27017)["EPL"]

tweets_cusor = db[FIXTURE_NO_RETWEETS_ID].find()


for tweet_object in tweets_cusor:
    max_emotion = max(
        tweet_object['emotion'].iteritems(), key=operator.itemgetter(1))[0]

    new_tweet_object = tweet_object.copy()
    new_tweet_object['maxEmotion'] = max_emotion
