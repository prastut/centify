import pymongo

client = pymongo.MongoClient("locahost", 27017)
db = client["EPL"]

list_of_EPL_clubs = {
    "Manchester_United": [
        'Man Utd'
    ],
    "Leicester_City": [
        "Leicester"
    ],
    "Crystal_Palace": [
        "Crystal Palace"
    ],
    "Liverpool": [
        "Liverpool"
    ],
    "Tottenham_Hostpurs": [
        "Spurs"
    ],
    "Southampton": [
        "Southampton"
    ],
    "Brighton": [
        "Brighton"
    ],
    "Cardiff": [
        "Cardiff"
    ],
    "Burnley": [
        "Burnley"
    ],
    "AFC_Bournemouth": [
        "AFC Bournemouth"
    ]
}
