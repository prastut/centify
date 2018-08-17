import datetime
import os
import sys
import re
import pymongo
import requests
from bs4 import BeautifulSoup

from list_of_epl_teams import list_of_EPL_clubs


def strip_one_space(s):
    if s.endswith(" "):
        s = s[:-1]
    if s.startswith(" "):
        s = s[1:]
    return s


url = "https://www.premierleague.com/news/720651"

client = pymongo.MongoClient("mongodb://bubble:bubble@104.196.215.99/Bubble")
db = client["EPL"]

r = requests.get(url)
soup = BeautifulSoup(r.text, "html.parser")

counter = 0

for h6 in soup.find_all('h6'):
    para = h6.find_next_sibling('p')
    h6_string = str(h6)
    para_string = str(para)
    # processing dates
    date_and_month_string = h6_string.split(", ")[-1].split("<")[0]
    date_and_month_string = date_and_month_string.split()
    if len(date_and_month_string) == 2 and counter < 33:
        date_and_month_string.append("2018")
    if len(date_and_month_string) == 2 and counter >= 33:
        date_and_month_string.append("2019")
    date_and_month_string = ' '.join(date_and_month_string)
    date_and_month_datetime = datetime.datetime.strptime(
        date_and_month_string, '%d %B %Y').date()
    # processing time and match
    para_string = para_string.split("p>")[1].split("</")[0]
    para_string = para_string.split("<br/>")
    # check whether the time is mentioned
    print date_and_month_datetime
    print para_string
    counter += 1
