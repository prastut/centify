# -*- coding: utf-8 -*-
# def call_watson_pickably(tweet):
#     call_watson(tweet)


from collections import defaultdict
import sys
import ast
import csv
import datetime
from itertools import chain
import json
from multiprocessing import Pool
import operator
import os
import re
import sys
import time

from bson import ObjectId

from kafka import KafkaProducer
from kafka.errors import KafkaError
from kafka import KafkaConsumer
import pymongo
from pymongo import MongoClient
import settings_twitter
import settings_watson
import tweepy
from watson_developer_cloud import NaturalLanguageUnderstandingV1
from watson_developer_cloud.natural_language_understanding_v1 import Features, EntitiesOptions, KeywordsOptions, CategoriesOptions


producer = KafkaProducer(bootstrap_servers=['localhost:9092'])
producer = KafkaProducer(retries=5)
response_batch = []

# Variables
MONGO_DB_URL = 'mongodb://bubble:bubble@104.196.215.99:27017/Bubble'
FIXTURE_COLLECTION = 'fixtures'
ENTITY_COLLECTION = 'entities_new'
SAMPLE_MATCH_ID = "5b75f46c73dbef8460d1de89"

db = MongoClient(MONGO_DB_URL, 27017)["EPL"]
#match_id = raw_input("Please enter the match_id: \n")
match_id = SAMPLE_MATCH_ID
match_collection = ObjectId(match_id)

fixture = db[FIXTURE_COLLECTION].find_one({"_id": match_collection})
team_one = fixture["teamOne"]
team_two = fixture["teamTwo"]

entities_find_params = {
    "$or": [
        {"team": team_one}, {"team": team_two}, {"key": team_one}, {"key": team_two}
    ]
}

all_entities_corresponding_to_match = db[ENTITY_COLLECTION].find(
    entities_find_params)


# Calculating ALL PNC for entities go here:


# entities = {}
# for entity in all_entities_corresponding_to_match:
#     for k in entity["entityName"].keys():
#         entities[k] = entity[k]

# print entities
# entity_dict_final = defaultdict(list)
# for k, v in chain(entities.items()):
#     entity_dict_final[k].append(v)
# print entity_dict_final

natural_language_understanding = NaturalLanguageUnderstandingV1(
    username=settings_watson.username,
    password=settings_watson.password,
    version='2018-03-16')


def connect_mongo():
    client = MongoClient(
        'mongodb://bubble:bubble@104.196.215.99:27017/Bubble', 27017)
    db = client["EPL"]
    return db


def call_watson(tweet):
    print "call watson called."
    try:
        response = natural_language_understanding.analyze(
            text=tweet["tweet"],
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
        response["tweet"] = tweet["tweet"]
        response["tweetId"] = tweet["id"]
        response["timeStamp"] = tweet["created_at"]
        response["userProfile"] = tweet["userProfile"]
        save_results(response)
    except Exception as e:
        print("Error in call watson")
        print(e)


def save_results(response):
    db = connect_mongo()
    entities_tweet = response["entities"]
    for entity in entities_tweet:
        if "emotion" not in entity.keys():
            print "Not having emotion"
            continue
        try:
            for i in entity_dict_final:
                for j in entity_dict_final[i]:
                    print "matching " + str(entity["text"]) + " with " + str(j)
                    if(entity["text"] in j):
                        entity["tweet"] = response["tweet"]
                        entity["tweetId"] = response["tweetId"]
                        entity["timeStamp"] = response["timeStamp"]
                        entity["userProfile"] = response["userProfile"]
                        entity["entity_name"] = i
                        entity["maxEmotion"] = max(
                            entity["emotion"].items(), key=operator.itemgetter(1))[0]
                        db[str(mongo_collection)].insert(entity)
                        print "saved"
        except Exception as e:
            print("Error inside save_results")
            print(e)


tweets_batch = []


def main():
    print "Yo"
    p = Pool(4)
    consumer = KafkaConsumer(
        topic, bootstrap_servers='localhost:9092', auto_offset_reset='earliest')
    for message in consumer:
        tweet = (message.value)
        tweet.replace('\n', '\\n')
        tweet = eval(tweet)
        if tweet["tweet"][:2] == "RT":
            continue
        tweets_batch.append(tweet)
        if(len(tweets_batch) == 4):
            p.map(call_watson_pickably, tweets_batch)
            del tweets_batch[:]


if __name__ == "__main__":
    main()
