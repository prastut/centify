from bs4 import BeautifulSoup
import requests
import os
from pymongo import MongoClient


ENTITIES_COLLECTION = "entities"

db = MongoClient("localhost", 27017)["EPL"]


urls = []

urls.append("http://www2.squawka.com/teams/arsenal/squad")
urls.append("http://www2.squawka.com/teams/brighton-and-hove-albion/squad")
urls.append("http://www2.squawka.com/teams/bournemouth/squad")
urls.append("http://www2.squawka.com/teams/burnley/squad")
urls.append("http://www2.squawka.com/teams/chelsea/squad")
urls.append("http://www2.squawka.com/teams/crystal-palace/squad")
urls.append("http://www2.squawka.com/teams/everton/squad")
urls.append("http://www2.squawka.com/teams/huddersfield-town/squad")
urls.append("http://www2.squawka.com/teams/leicester-city/squad")
urls.append("http://www2.squawka.com/teams/liverpool/squad")
urls.append("http://www2.squawka.com/teams/manchester-city/squad")
urls.append("http://www2.squawka.com/teams/manchester-united/squad")
urls.append("http://www2.squawka.com/teams/newcastle-united/squad")
urls.append("http://www2.squawka.com/teams/southampton/squad")
urls.append("http://www2.squawka.com/teams/stoke-city/squad")
urls.append("http://www.squawka.com/teams/swansea-city/squad")
urls.append("http://www2.squawka.com/teams/tottenham-hotspur/squad")
urls.append("http://www2.squawka.com/teams/watford/squad")
urls.append("http://www2.squawka.com/teams/west-bromwich-albion/squad")
urls.append("http://www2.squawka.com/teams/west-ham-united/squad")
urls.append('http://www2.squawka.com/teams/fulham/squad')


teams = []
teams.append("Arsenal")
teams.append("Brighton")
teams.append("Bournemouth")
teams.append("Burnley")
teams.append("Chelsea")
teams.append("Crystal_Palace")
teams.append("Everton")
teams.append("Huddersfield_town")
teams.append("Leicester_City")
teams.append("Liverpool")
teams.append("Manchester_City")
teams.append("Manchester_United")
teams.append("Newcastle_United")
teams.append("Southampton")
teams.append("Stoke_City")
teams.append("Swansea_City")
teams.append("Tottenham_Hotspur")
teams.append("Watford")
teams.append("West_Bromwich_Albion")
teams.append("West_Ham_United")
teams.append('Fulham')

print "urls: "
print len(urls)

print "teams: " + str(len(teams))

team_counter = 0

for url in urls:
    r = requests.get(url)
    soup = BeautifulSoup(r.text, "html.parser")
    table = soup.find("table", class_="browseteams")
    all_rows = table.find_all("tr")
    image_items = soup.find_all("td", class_="squad_playerphoto")
    player_counter = 0
    for row in all_rows[1:]:
        doc_to_be_inserted = {}
        name_list = []
        columns = row.find_all("td")
        key = "_".join(columns[1].text.strip().split(" "))
        a = image_items[player_counter].find("img")

        doc_to_be_inserted["league"] = "EPL"
        doc_to_be_inserted["team"] = teams[team_counter]
        doc_to_be_inserted["teamSquadURL"] = url
        doc_to_be_inserted["imageURL"] = a.get("src")
        doc_to_be_inserted["key"] = key
        doc_to_be_inserted["type"] = "Player"

        print doc_to_be_inserted
        db[ENTITIES_COLLECTION].insert(doc_to_be_inserted)
        del doc_to_be_inserted
        del name_list
        player_counter += 1
    team_counter += 1
