# -*- coding: utf-8 -*-
import logging
import re
import configparser

from kafka import KafkaProducer
from kafka.errors import KafkaError
import settings_twitter
import tweepy
from bson import ObjectId

logging.basicConfig(filename='streaming.log', level=logging.DEBUG)


# _id = raw_input()
# kafka_topic = _id
# _id = ObjectId(_id)


class StreamListener(tweepy.StreamListener):

    def __init__(self):
        self.producer = KafkaProducer(
            bootstrap_servers=['localhost:9092'], retries=5)

    def on_status(self, status):
        if status.retweeted:
            return
        tweetText = status.text.encode('utf8')
        if (re.findall(self.httpCheck, tweetText) or re.findall(self.httpsCheck, tweetText)):
            return
        # if tweetText[:2] == "RT":
        #     return
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
        logging.error(status_code)
        return True


if __name__ == '__main__':
    # Setup logging

    config = configparser.ConfigParser()
    config.read('config.txt')

    # Read Twitter Credentials
    consumer_key = config['TWITTER']['consumerKey']
    consumer_secret = config['TWITTER']['consumerSecret']
    access_key = config['TWITTER']['accessToken']
    access_secret = config['TWITTER']['accessTokenSecret']

    # Auth Object
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_key, access_secret)
    api = tweepy.API(auth)

    logging.info("Twitter API Auth successful")

    # Hashtags to filter for
    hashtagsDict = dict(config['HASHTAGS'].items())

    hashtagsListToFilter = []

    for key in hashtagsDict:
        hashtagsListToFilter.append(hashtagsDict[key])

    logging.info("Tracking %s", hashtagsListToFilter)

    # Create Stream and bind listener
    logging.info("Starting Stream")
    while True:
        try:
            print("trying")
            stream = tweepy.Stream(auth=api.auth, listener=StreamListener())
            print("Connection made.")
            stream.filter(languages=["en"], track=hashtagsListToFilter)
        except Exception as e:
            logging.error(e)
