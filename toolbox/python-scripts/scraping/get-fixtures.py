from datetime import datetime
from bs4 import BeautifulSoup
import requests

url = "https://www.theguardian.com/football/premierleague/fixtures"


page = requests.get(url)

fixtures_soup = BeautifulSoup(page.text, "html.parser")

all_matches_container_div = fixtures_soup.find(
    "div", class_="football-matches__container")

all_matches_under_one_day_array = all_matches_container_div.find_all(
    "div", class_="football-matches__day")

test_match = all_matches_under_one_day_array[1]
raw_date = test_match.find("div", class_="date-divider").get_text()

all_rows = test_match.find("tbody").find_all("tr")

time = all_rows[0].find("time").get('datetime')

team_home = all_rows[0].find(
    "div", class_="football-match__team--home").get_text()

team_away = all_rows[0].find(
    "div", class_="football-match__team--away").get_text()

print "".join(team_home.split())


# machine_readable_date = datetime.strptime(raw_date, "%A %d %B %Y")


# print machine_readable_date
