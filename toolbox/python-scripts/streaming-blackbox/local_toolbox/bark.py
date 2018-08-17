import os
import requests
from bs4 import BeautifulSoup
import sys

URL = os.getenv('TEAM_URL', "http://www2.squawka.com/teams/arsenal/squad")

r = requests.get(URL)

soup = BeautifulSoup(r.text, "html.parser")

# ------------
print('\n--- version 1 ---\n')

table = soup.find("table", class_="browseteams")
all_rows = table.find_all("tr")
print "all rows one" + str(len(all_rows))
for row in all_rows[1:]:
    all_columns = row.find_all("td")
    # print(all_columns[1].text.strip())

# ------------
print('\n--- version 2 ---\n')

image_items = soup.find_all("td", class_="squad_playerphoto")

for item in image_items:
    print(item.text.strip())
    a = str(item.find("img"))
    print(a.split('src="')[1].split('"/>')[0])
