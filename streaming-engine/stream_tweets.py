# -*- coding: utf-8 -*-
import csv
import datetime
import json
import os
import re
import time

from kafka import KafkaProducer
from kafka.errors import KafkaError
import settings_twitter
import tweepy
from bson import ObjectId

producer = KafkaProducer(bootstrap_servers=['localhost:9092'])
producer = KafkaProducer(retries=5)

print "Enter the fixture id:"
_id = raw_input()
kafka_topic = _id
_id = ObjectId(_id)


class StreamListener(tweepy.StreamListener):
    tweet = {}
    httpsCheck = 'https?://(?:[-\w.]|(?:%[\da-fA-F]{2}))+'
    httpCheck = 'http?://(?:[-\w.]|(?:%[\da-fA-F]{2}))+'
    idSelf = 0

    def on_status(self, status):
        if status.retweeted:
            return
        tweetText = status.text.encode('utf8')
        if (re.findall(self.httpCheck, tweetText) or re.findall(self.httpsCheck, tweetText)):
            return
        if tweetText[:2] == "RT":
            return
        try:
            self.tweet["userProfile"] = status.user._json[
                "profile_image_url_https"]
            # print("User profile done")
            self.idSelf += 1
            # print("Id self incremented.")
            self.tweet["tweet"] = status.text.encode('utf8')
            # print("Tweet inserted.")
            self.tweet["id"] = status.id
            # print("Status' id inserted.")
            self.tweet["sequence"] = self.idSelf
            # print("sequence updated.")
            self.tweet["created_at"] = status.created_at
            # print("timestamp inserted")
            future = producer.send(kafka_topic, bytes(
                str(self.tweet).encode('utf8')))
            print("Pushed.")
        except Exception as e:
            print("In on_status")
            print(e)
        finally:
            producer.flush()

    def on_error(self, status_code):
        print("Error, oops")
        if status_code == 420:
            return False


auth = tweepy.OAuthHandler(
    settings_twitter.TWITTER_APP_KEY, settings_twitter.TWITTER_APP_SECRET)
auth.set_access_token(settings_twitter.TWITTER_KEY,
                      settings_twitter.TWITTER_SECRET)
api = tweepy.API(auth)
print("Twitter API Authentication is successful!")
stream_listener = StreamListener()


def start_stream():

    print "Enter the fixture hashtag:"
    hashtag = raw_input()
    print("start stream")
    while True:
        try:
            print("trying")
            stream = tweepy.Stream(auth=api.auth, listener=stream_listener)
            print("Connection made.")
            stream.filter(languages=["en"], track=[hashtag, "#EPL"])
        except Exception as e:
            print(e)


start_stream()
