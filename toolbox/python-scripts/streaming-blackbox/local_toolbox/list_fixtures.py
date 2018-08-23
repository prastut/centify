from datetime import datetime
from pymongo import MongoClient

client = MongoClient("localhost", 27017)
db = client["EPL"]

fixtures = {
    "2018-08-10": {
        "20:00:00": {
            "teamOne": "Manchester_United",
            "teamTwo": "Leicester_City"
        }
    },
    "2018-08-11": {
        "12:30:00": {
            "teamOne": "Newcastle_United",
            "teamTwo": "Tottenham_Hostpurs"
        }
    },
    "2018-08-11": {
        "12:30:00": {
            "teamOne": "AFC_Bournemouth",
            "teamTwo": "Cardiff_City"
        }
    },
    "2018-08-11": {
        "12:30:00": {
            "teamOne": "Fulham",
            "teamTwo": "Crystal_Palace"
        }
    },
    "2018-08-11": {
        "12:30:00": {
            "teamOne": "Huddersfield _Town",
            "teamTwo": "Chelsea"
        }
    },
    "2018-08-11": {
        "12:30:00": {
            "teamOne": "Watford",
            "teamTwo": "Brighton"
        }
    },
    "2018-08-11": {
        "17:30:00": {
            "teamOne": "Wolves",
            "teamTwo": "Everton"
        }
    },
    "2018-08-12": {
        "13:30:00": {
            "teamOne": "Liverpool",
            "teamTwo": "West_Ham"
        }
    },
    "2018-08-12": {
        "13:30:00": {
            "teamOne": "Southampton",
            "teamTwo": "Burnley"
        }
    },
    "2018-08-12": {
        "16:00:00": {
            "teamOne": "Arsenal",
            "teamTwo": "Manchester_City"
        }
    },
    "2018-08-18": {
        "12:30:00": {
            "teamOne": "Cardiff",
            "teamTwo": "Newcastle_United"
        }
    },
    "2018-08-18": {
        "12:30:00": {
            "teamOne": "Burnley",
            "teamTwo": "Watford"
        }
    },
    "2018-08-18": {
        "12:30:00": {
            "teamOne": "Everton",
            "teamTwo": "Southampton"
        }
    },
    "2018-08-18": {
        "12:30:00": {
            "teamOne": "Wolves",
            "teamTwo": "Leicester_City"
        }
    },
    "2018-08-18": {
        "12:30:00": {
            "teamOne": "Tottenham_Spurs",
            "teamTwo": "Fulham"
        }
    },
    "2018-08-18": {
        "12:30:00": {
            "teamOne": "West_Ham",
            "teamTwo": "AFC_Bournemouth"
        }
    },
    "2018-08-18": {
        "17:30:00": {
            "teamOne": "Chelsea",
            "teamTwo": "Arsenal"
        }
    },
    "2018-08-19": {
        "13:30:00": {
            "teamOne": "Manchester_City",
            "teamTwo": "Huddersfield"
        }
    },
    "2018-08-19": {
        "16:00:00": {
            "teamOne": "Manchester_United",
            "teamTwo": "Brighton"
        }
    },
    "2018-08-20": {
        "20:00:00": {
            "teamOne": "Crystal_Palace",
            "teamTwo": "Liverpool"
        }
    },
    "2018-08-25": {
        "12:30:00": {
            "teamOne": "Wolves",
            "teamTwo": "Manchester_City"
        }
    },
    "2018-08-25": {
        "12:30:00": {
            "teamOne": "Arsenal",
            "teamTwo": "West_Ham"
        }
    },
    "2018-08-25": {
        "12:30:00": {
            "teamOne": "AFC_Bournemouth",
            "teamTwo": "Everton"
        }
    },
    "2018-08-25": {
        "12:30:00": {
            "teamOne": "Fulham",
            "teamTwo": "Burnley"
        }
    },
    "2018-08-25": {
        "12:30:00": {
            "teamOne": "Huddersfield_Town",
            "teamTwo": "Cardiff_City"
        }
    },
    "2018-08-25": {
        "12:30:00": {
            "teamOne": "Southampton",
            "teamTwo": "Leicester_City"
        }
    },
    "2018-08-25": {
        "17:30:00": {
            "teamOne": "Liverpool",
            "teamTwo": "Brighton"
        }
    },
    "2018-08-26": {
        "13:30:00": {
            "teamOne": "Watford",
            "teamTwo": "Crystal_Palace"
        }
    },
    "2018-08-26": {
        "16:00:00": {
            "teamOne": "Newcastle_United",
            "teamTwo": "Chelsea"
        }
    },
    "2018-08-27": {
        "20:00:00": {
            "teamOne": "Manchester_United",
            "teamTwo": "Tottenham_Spurs"
        }
    },
    aaj se
    "2018-09-01": {
        "12:30:00": {
            "teamOne": "Liverpool",
            "teamTwo": "Leicester_City"
        }
    },
    "2018-09-01": {
        "12:30:00": {
            "teamOne": "Brighton",
            "teamTwo": "Fulham"
        }
    },
    "2018-09-01": {
        "12:30:00": {
            "teamOne": "AFC_Bournemouth",
            "teamTwo": "Cardiff_City"
        }
    },
    "2018-09-01": {
        "12:30:00": {
            "teamOne": "Fulham",
            "teamTwo": "Crystal_Palace"
        }
    },
    "2018-08-10": {
        "12:30:00": {
            "teamOne": "Huddersfield _Town",
            "teamTwo": "Chelsea"
        }
    },
    "2018-08-10": {
        "12:30:00": {
            "teamOne": "Watford",
            "teamTwo": "Brighton"
        }
    },
    "2018-08-10": {
        "17:30:00": {
            "teamOne": "Wolves",
            "teamTwo": "Everton"
        }
    },
    "2018-08-12": {
        "13:30:00": {
            "teamOne": "Liverpool",
            "teamTwo": "West_Ham"
        }
    },
    "2018-08-12": {
        "13:30:00": {
            "teamOne": "Southampton",
            "teamTwo": "Burnley"
        }
    },
    "2018-08-12": {
        "16:00:00": {
            "teamOne": "Arsenal",
            "teamTwo": "Manchester_City"
        }
    },
    "2018-08-18": {
        "12:30:00": {
            "teamOne": "Cardiff",
            "teamTwo": "Newcastle_United"
        }
    },
    "2018-08-18": {
        "12:30:00": {
            "teamOne": "Burnley",
            "teamTwo": "Watford"
        }
    },
    "2018-08-18": {
        "12:30:00": {
            "teamOne": "Everton",
            "teamTwo": "Southampton"
        }
    },
    "2018-08-18": {
        "12:30:00": {
            "teamOne": "Wolves",
            "teamTwo": "Leicester_City"
        }
    },
    "2018-08-18": {
        "12:30:00": {
            "teamOne": "Tottenham_Spurs",
            "teamTwo": "Fulham"
        }
    },
    "2018-08-18": {
        "12:30:00": {
            "teamOne": "West_Ham",
            "teamTwo": "AFC_Bournemouth"
        }
    },
    "2018-08-18": {
        "17:30:00": {
            "teamOne": "Chelsea",
            "teamTwo": "Arsenal"
        }
    },
    "2018-08-19": {
        "13:30:00": {
            "teamOne": "Manchester_City",
            "teamTwo": "Huddersfield"
        }
    },
    "2018-08-19": {
        "16:00:00": {
            "teamOne": "Manchester_United",
            "teamTwo": "Brighton"
        }
    },
    "2018-08-20": {
        "20:00:00": {
            "teamOne": "Crystal_Palace",
            "teamTwo": "Liverpool"
        }
    },
    "2018-08-25": {
        "12:30:00": {
            "teamOne": "Wolves",
            "teamTwo": "Manchester_City"
        }
    },
    "2018-08-25": {
        "12:30:00": {
            "teamOne": "Arsenal",
            "teamTwo": "West_Ham"
        }
    },
    "2018-08-25": {
        "12:30:00": {
            "teamOne": "AFC_Bournemouth",
            "teamTwo": "Everton"
        }
    },
    "2018-08-25": {
        "12:30:00": {
            "teamOne": "Fulham",
            "teamTwo": "Burnley"
        }
    },
    "2018-08-25": {
        "12:30:00": {
            "teamOne": "Huddersfield_Town",
            "teamTwo": "Cardiff_City"
        }
    },
    "2018-08-25": {
        "12:30:00": {
            "teamOne": "Southampton",
            "teamTwo": "Leicester_City"
        }
    },
    "2018-08-25": {
        "17:30:00": {
            "teamOne": "Liverpool",
            "teamTwo": "Brighton"
        }
    },
    "2018-08-26": {
        "13:30:00": {
            "teamOne": "Watford",
            "teamTwo": "Crystal_Palace"
        }
    },
    "2018-08-26": {
        "16:00:00": {
            "teamOne": "Newcastle_United",
            "teamTwo": "Chelsea"
        }
    },
    "2018-08-27": {
        "20:00:00": {
            "teamOne": "Manchester_United",
            "teamTwo": "Tottenham_Spurs"
        }
    },
}

for i in fixtures:
    print i
    for j in fixtures[i]:
        print j
        complete_time = str(i) + " " + str(j)
        print complete_time
        time_stamp = datetime.strptime(complete_time, '%Y-%m-%d %H:%M:%S')
        team_one = fixtures[i][j]["teamOne"]
        team_two = fixtures[i][j]["teamTwo"]
        doc_to_be_inserted = {}
        doc_to_be_inserted["timeStamp"] = time_stamp
        doc_to_be_inserted["teamOne"] = team_one
        doc_to_be_inserted["teamTwo"] = team_two
        print doc_to_be_inserted
        db.fixtures.insert(doc_to_be_inserted)
