from bs4 import BeautifulSoup

import requests

r  = requests.get("https://www.fifa.com/worldcup/teams/team/43935/")
markup = r.text

soup = BeautifulSoup(markup, "html.parser")

player_list =  soup.find("div", class_="fi-team__members").findAll("div", class_="fi-p")

for player in player_list:
	name = player.find("a").get('title')
	image = player.find("image").get("xlink:href")

