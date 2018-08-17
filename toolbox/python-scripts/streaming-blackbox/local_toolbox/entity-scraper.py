from bs4 import BeautifulSoup
import requests
import os
import pymongo
import sys

#URL = os.getenv('TEAM_URL', "http://www2.squawka.com/teams/arsenal/squad")
urls = []
# text_file = open("squad.txt", "r")
# lines = text_file.readlines()

# urls.append("http://www2.squawka.com/teams/arsenal/squad")
# urls.append("http://www2.squawka.com/teams/brighton-and-hove-albion/squad")
# urls.append("http://www2.squawka.com/teams/bournemouth/squad")
# urls.append("http://www2.squawka.com/teams/burnley/squad")
# urls.append("http://www2.squawka.com/teams/chelsea/squad")
# urls.append("http://www2.squawka.com/teams/crystal-palace/squad")
# urls.append("http://www2.squawka.com/teams/everton/squad")
# urls.append("http://www2.squawka.com/teams/huddersfield-town/squad")
# urls.append("http://www2.squawka.com/teams/leicester-city/squad")
# urls.append("http://www2.squawka.com/teams/liverpool/squad")
# urls.append("http://www2.squawka.com/teams/manchester-city/squad")
# urls.append("http://www2.squawka.com/teams/manchester-united/squad")
# urls.append("http://www2.squawka.com/teams/newcastle-united/squad")
# urls.append("http://www2.squawka.com/teams/southampton/squad")
# urls.append("http://www2.squawka.com/teams/stoke-city/squad")
# urls.append("http://www.squawka.com/teams/swansea-city/squad")
# urls.append("http://www2.squawka.com/teams/tottenham-hotspur/squad")
# urls.append("http://www2.squawka.com/teams/watford/squad")
# urls.append("http://www2.squawka.com/teams/west-bromwich-albion/squad")
# urls.append("http://www2.squawka.com/teams/west-ham-united/squad")

urls.append('http://www2.squawka.com/teams/fulham/squad')
client = pymongo.MongoClient("mongodb://bubble:bubble@104.196.215.99/Bubble")
db = client["EPL"]

teams = []
# teams.append("arsenal")
# teams.append("brighton")
# teams.append("bournemouth")
# teams.append("burnley")
# teams.append("chelsea")
# teams.append("crystal-palace")
# teams.append("everton")
# teams.append("huddersfield-town")
# teams.append("leicester-city")
# teams.append("liverpool")
# teams.append("manchester-city")
# teams.append("manchester-united")
# teams.append("newcastle-united")
# teams.append("southampton")
# teams.append("stoke-city")
# teams.append("swansea-city")
# teams.append("tottenham-hotspur")
# teams.append("watford")
# teams.append("west-bromwich-albion")
# teams.append("west-ham-united")
teams.append('Fulham')
# for i in range(0, len(teams)):
#     teams[i] = teams[i].title()
#     print teams[i]

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
        name = columns[1].text.strip()
        if name == "Player":
            continue
        splitted_name = name.split(" ")
        unique_name = ""
        for i in range(0, len(splitted_name)):
            name_list.append(splitted_name[i])
            if not (i == len(splitted_name) - 1):
                unique_name += splitted_name[i] + "_"
        unique_name += splitted_name[-1]
        name_list.append(name)
        doc_to_be_inserted["league"] = "EPL"
        doc_to_be_inserted["team"] = teams[team_counter]
        doc_to_be_inserted["teamSquadURL"] = url
        a = str(image_items[player_counter].find("img"))
        doc_to_be_inserted["imageURL"] = a.split('src="')[1].split('"/>')[0]
        name_dict = {}
        name_dict[unique_name] = name_list
        doc_to_be_inserted["entityName"] = name_dict
        print doc_to_be_inserted
        db.entities_temp.insert(doc_to_be_inserted)
        del doc_to_be_inserted
        del name_list
        player_counter += 1
    team_counter += 1
