# -*- coding: utf-8 -*-

from pymongo import MongoClient

ENTITIES_COLLECTION = "entities"
FIXTURE_ID = "5b7afa907da5160c055a738c"

db = MongoClient("localhost", 27017)["EPL"]

tweets_cusor = db[FIXTURE_ID].find()

retweet_count = 0

not_emotion_count = 0

for index, tweet in enumerate(tweets_cusor):
    if "emotion" not in tweet:
        not_emotion_count = not_emotion_count + 1
    else:
        tweet_text = tweet['tweet']

        if "RT" in tweet_text[:2]:
            retweet_count = retweet_count + 1


print "Total Tweets = " + str(index)
print "RT Count = " + str(retweet_count) + \
    " therefore original tweets = " + str(index - retweet_count)
print "No emotion = " + str(not_emotion_count)
