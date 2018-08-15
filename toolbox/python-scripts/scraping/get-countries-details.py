from bs4 import BeautifulSoup
import requests

wiki_base_url = "https://en.wikipedia.org"
premier_league_page = "/wiki/2018%E2%80%9319_Premier_League"

premier_league_page = requests.get(wiki_base_url + premier_league_page)

premier_league_page_soup = BeautifulSoup(
    premier_league_page.text, "html.parser")

all_tables = premier_league_page_soup.find_all("table")
teams_table = all_tables[1]
team_table_rows = teams_table.find("tbody").find_all("tr")

print "======================================================"
print "Getting team page link"
print ""

# get team wiki page link
teams_details_from_wiki = []

for row in team_table_rows:
    all_td_elements = row.find_all("td")
    if len(all_td_elements) > 0:
        team_link_packet = row.find_all("td")[0].find("a")
        details = {
            'league': "EPL",
            'type': "Team",
            'key': "_".join(team_link_packet.get_text().split(" ")),
            'title': team_link_packet.get("title"),
            'pretty_name': team_link_packet.get_text(),
            'wiki_page_link': wiki_base_url + team_link_packet.get("href"),
        }
        teams_details_from_wiki.append(details)

print "Checking for Arsenal"
print teams_details_from_wiki[0]

# get team image page link
print "======================================================"
print "Getting team page link"
print ""

teams_details_from_wiki_with_image_page_links = []

for team in teams_details_from_wiki:
    print "Image Page Link " + team['key']
    team_page = requests.get(team['wiki_page_link'])
    team_page_soup = BeautifulSoup(team_page.text, "html.parser")
    updated_details = team.copy()
    updated_details['wiki_image_link_page'] = wiki_base_url + team_page_soup.find(
        "table").find("a").get("href")
    teams_details_from_wiki_with_image_page_links.append(updated_details)

print ""
print "Checking for Arsenal"
print teams_details_from_wiki_with_image_page_links[0]


# get image link
print "======================================================"
print "Getting Image URL link"
print ""
teams_details_from_wiki_with_image_link = []

for index, team in enumerate(teams_details_from_wiki_with_image_page_links):
    print "Image URL " + team['title']
    team_page = requests.get(team['wiki_image_link_page'])
    team_page_soup = BeautifulSoup(team_page.text, "html.parser")
    updated_details = team.copy()
    try:
        updated_details['wiki_image_url'] = "https:" + team_page_soup.find(
            "div", class_="fullMedia").find("a").get("href")
    except AttributeError as e:
        print ""
        print "Error getting Image URL for: " + team["title"]
        print ""

    teams_details_from_wiki_with_image_link.append(updated_details)

print ""
print "Checking for Arsenal"
print teams_details_from_wiki_with_image_link[0]
