from datetime import datetime, timedelta
from time import sleep

from pymongo import MongoClient

client = MongoClient("mongodb://bubble:bubble@104.196.215.99:27017/Bubble")
db = client["EPL"]

# matches until september 15

fixtures = []

fixture_dict = {}
fixture_dict['startTime'] = datetime.strptime(
    '2018-08-18 22:00:00', '%Y-%m-%d %H:%M:%S')
fixture_dict['teamOne'] = 'Chelsea'
fixture_dict['teamTwo'] = 'Arsenal'
fixture_dict['league'] = 'EPL'
fixtures.append(fixture_dict)


fixture_dict = {}
fixture_dict['startTime'] = datetime.strptime(
    '2018-08-25 19:30:00', '%Y-%m-%d %H:%M:%S')
fixture_dict['teamOne'] = 'Arsenal'
fixture_dict['teamTwo'] = 'West_Ham_United'
fixture_dict['league'] = 'EPL'
fixtures.append(fixture_dict)


fixture_dict = {}
fixture_dict['startTime'] = datetime.strptime(
    '2018-09-02 18:00:00', '%Y-%m-%d %H:%M:%S')
fixture_dict['teamOne'] = 'Cardiff_City'
fixture_dict['teamTwo'] = 'Arsenal'
fixture_dict['league'] = 'EPL'
fixtures.append(fixture_dict)


fixture_dict = {}
fixture_dict['startTime'] = datetime.strptime(
    '2018-09-15 19:30:00', '%Y-%m-%d %H:%M:%S')
fixture_dict['teamOne'] = 'Newcastle_United'
fixture_dict['teamTwo'] = 'Arsenal'
fixture_dict['league'] = 'EPL'
fixtures.append(fixture_dict)


# Arsenal finished

fixture_dict = {}
fixture_dict['startTime'] = datetime.strptime(
    '2018-08-26 20:30:00', '%Y-%m-%d %H:%M:%S')
fixture_dict['teamOne'] = 'Newcastle_United'
fixture_dict['teamTwo'] = 'Chelsea'
fixture_dict['league'] = 'EPL'
fixtures.append(fixture_dict)


fixture_dict = {}
fixture_dict['startTime'] = datetime.strptime(
    '2018-09-01 19:30:00', '%Y-%m-%d %H:%M:%S')
fixture_dict['teamOne'] = 'Chelsea'
fixture_dict['teamTwo'] = 'AFC_Bournemouth'
fixture_dict['league'] = 'EPL'
fixtures.append(fixture_dict)


fixture_dict = {}
fixture_dict['startTime'] = datetime.strptime(
    '2018-09-15 19:30:00', '%Y-%m-%d %H:%M:%S')
fixture_dict['teamOne'] = 'Chelsea'
fixture_dict['teamTwo'] = 'Cardiff_City'
fixture_dict['league'] = 'EPL'
fixtures.append(fixture_dict)


# Chelsea finished

fixture_dict = {}
fixture_dict['startTime'] = datetime.strptime(
    '2018-08-21 00:30:00', '%Y-%m-%d %H:%M:%S')
fixture_dict['teamOne'] = 'Crystal_Palace'
fixture_dict['teamTwo'] = 'Liverpool'
fixture_dict['league'] = 'EPL'
fixtures.append(fixture_dict)


fixture_dict = {}
fixture_dict['startTime'] = datetime.strptime(
    '2018-08-25 22:00:00', '%Y-%m-%d %H:%M:%S')
fixture_dict['teamOne'] = 'Liverpool'
fixture_dict['teamTwo'] = 'Brighton'
fixture_dict['league'] = 'EPL'
fixtures.append(fixture_dict)


fixture_dict = {}
fixture_dict['startTime'] = datetime.strptime(
    '2018-09-01 17:00:00', '%Y-%m-%d %H:%M:%S')
fixture_dict['teamOne'] = 'Leicester_City'
fixture_dict['teamTwo'] = 'Liverpool'
fixture_dict['league'] = 'EPL'
fixtures.append(fixture_dict)


fixture_dict = {}
fixture_dict['startTime'] = datetime.strptime(
    '2018-09-15 17:00:00', '%Y-%m-%d %H:%M:%S')
fixture_dict['teamOne'] = 'Tottenham_Hotspurs'
fixture_dict['teamTwo'] = 'Liverpool'
fixture_dict['league'] = 'EPL'
fixtures.append(fixture_dict)


# Liverpool finished

fixture_dict = {}
fixture_dict['startTime'] = datetime.strptime(
    '2018-08-19 18:00:00', '%Y-%m-%d %H:%M:%S')
fixture_dict['teamOne'] = 'Manchester_City'
fixture_dict['teamTwo'] = 'Huddersfield'
fixture_dict['league'] = 'EPL'
fixtures.append(fixture_dict)


fixture_dict = {}
fixture_dict['startTime'] = datetime.strptime(
    '2018-08-25 17:00:00', '%Y-%m-%d %H:%M:%S')
fixture_dict['teamOne'] = 'Wolves'
fixture_dict['teamTwo'] = 'Manchester_City'
fixture_dict['league'] = 'EPL'
fixtures.append(fixture_dict)


fixture_dict = {}
fixture_dict['startTime'] = datetime.strptime(
    '2018-09-01 22:00:00', '%Y-%m-%d %H:%M:%S')
fixture_dict['teamOne'] = 'Manchester_City'
fixture_dict['teamTwo'] = 'Newcastle_United'
fixture_dict['league'] = 'EPL'
fixtures.append(fixture_dict)


fixture_dict = {}
fixture_dict['startTime'] = datetime.strptime(
    '2018-09-15 19:30:00', '%Y-%m-%d %H:%M:%S')
fixture_dict['teamOne'] = 'Manchester_City'
fixture_dict['teamTwo'] = 'Fulham'
fixture_dict['league'] = 'EPL'
fixtures.append(fixture_dict)


# Manchester City finished

fixture_dict = {}
fixture_dict['startTime'] = datetime.strptime(
    '2018-08-18 19:30:00', '%Y-%m-%d %H:%M:%S')
fixture_dict['teamOne'] = 'Tottenham_Hotspurs'
fixture_dict['teamTwo'] = 'Fulham'
fixture_dict['league'] = 'EPL'
fixtures.append(fixture_dict)


fixture_dict = {}
fixture_dict['startTime'] = datetime.strptime(
    '2018-08-28 00:30:00', '%Y-%m-%d %H:%M:%S')
fixture_dict['teamOne'] = 'Manchester_United'
fixture_dict['teamTwo'] = 'Tottenham_Hotspurs'
fixture_dict['league'] = 'EPL'
fixtures.append(fixture_dict)


fixture_dict = {}
fixture_dict['startTime'] = datetime.strptime(
    '2018-09-02 20:30:00', '%Y-%m-%d %H:%M:%S')
fixture_dict['teamOne'] = 'Watford'
fixture_dict['teamTwo'] = 'Tottenham_Hotspurs'
fixture_dict['league'] = 'EPL'
fixtures.append(fixture_dict)


# Tottenham Hotspurs finished

fixture_dict = {}
fixture_dict['startTime'] = datetime.strptime(
    '2018-08-19 20:30:00', '%Y-%m-%d %H:%M:%S')
fixture_dict['teamOne'] = 'Brighton'
fixture_dict['teamTwo'] = 'Manchester_United'
fixture_dict['league'] = 'EPL'
fixtures.append(fixture_dict)


fixture_dict = {}
fixture_dict['startTime'] = datetime.strptime(
    '2018-08-28 00:30:00', '%Y-%m-%d %H:%M:%S')
fixture_dict['teamOne'] = 'Manchester_United'
fixture_dict['teamTwo'] = 'Tottenham_Hotspurs'
fixture_dict['league'] = 'EPL'
fixtures.append(fixture_dict)


fixture_dict = {}
fixture_dict['startTime'] = datetime.strptime(
    '2018-09-01 19:30:00', '%Y-%m-%d %H:%M:%S')
fixture_dict['teamOne'] = 'Burnley'
fixture_dict['teamTwo'] = 'Manchester_United'
fixture_dict['league'] = 'EPL'
fixtures.append(fixture_dict)


fixture_dict = {}
fixture_dict['startTime'] = datetime.strptime(
    '2018-09-15 22:00:00', '%Y-%m-%d %H:%M:%S')
fixture_dict['teamOne'] = 'Watford'
fixture_dict['teamTwo'] = 'Manchester_United'
fixture_dict['league'] = 'EPL'
fixtures.append(fixture_dict)


# Manchester United finished

for fixture in fixtures:
    fixture['startTime'] -= timedelta(hours=5, minutes=30)
    print ('--------')
    print fixture
    db["fixtures_temp"].insert(fixture)
