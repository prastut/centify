import datetime
import os
import sys

import pymongo


class Bubble:

    def __init__(self, full_set_collection, mongodb_url):
        self.full_set_collection = full_set_collection
        self.client = pymongo.MongoClient(mongodb_url, 27017)
        self.db = self.client["Bubble"]
        self.client_local = pymongo.MongoClient(
            "mongodb://bubble:bubble@104.196.215.99/Bubble", 27017)
        self.db_local = self.client_local["Bubble"]

    def raise_error(messsage):
        print messsage
        sys.exit()

    def set_time_bounds(self, starting_time, finishing_time):
        self.starting_time = datetime.datetime.strptime(
            starting_time, '%Y-%m-%d %H:%M:%S')
        self.finishing_time = datetime.datetime.strptime(
            finishing_time, '%Y-%m-%d %H:%M:%S')

    def get_time_bounds(self):
        self.first_time_instance = self.db[self.full_set_collection].find().sort([
            ("timeStamp", 1)])
        self.last_time_instance = self.db[self.full_set_collection].find().sort([
            ("timeStamp", -1)])
        print "This collection has the following time bounds: "
        for i in self.first_time_instance:
            print i["timeStamp"]
            break
        for i in self.last_time_instance:
            print i["timeStamp"]
            break

    def check_collection_name(self):
        if self.full_set_collection not in self.db.collection_names():
            raise_error("Collection does not exist")

    def generate_subset_collection(self):
        destination_collection_name = raw_input(
            "Please enter the name of the collection you want to save. \n")
        for post in self.db[self.full_set_collection].find({"timeStamp": {"$gte": self.starting_time, "$lte": self.finishing_time}}):
            self.db_local[destination_collection_name].insert(post)


full_set_collection = raw_input("Please enter the main collection \n")
mongodb_url = os.getenv(
    'MONGODB_URL', "mongodb://bubble:bubble@104.196.215.99/Bubble")
ob_Bubble = Bubble(full_set_collection, mongodb_url)
ob_Bubble.check_collection_name()
ob_Bubble.get_time_bounds()
print "Please enter the starting and finishing time as per your requirements \n"
starting_time = raw_input("Enter starting time\n")
finishing_time = raw_input("Enter finishing time\n")
ob_Bubble.set_time_bounds(starting_time, finishing_time)
ob_Bubble.generate_subset_collection()
