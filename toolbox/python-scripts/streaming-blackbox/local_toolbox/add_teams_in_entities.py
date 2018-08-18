from pymongo import MongoClient

client = MongoClient('mongodb://bubble:bubble@104.196.215.99:27017/Bubble')
db = client['EPL']

teams = ['Manchester_United', 'Manchester_City', 'Chelsea',
         'Arsenal', 'Tottenham_Hotspurs', 'Liverpool', 'West_Ham_United', 'Cardiff_City', 'Newcastle_United',
         'AFC_Bournemouth', 'Crystal_Palace', 'Brighton', 'Leicester_City', 'Huddersfiled_Town', 'Fulham', 'Watford',
         'Burnley']

acronym = ['MUN', 'MCI', 'CHE', 'ARS', 'TOT',
           'LIV', 'WHU', 'CCFC', 'NUFC', 'AFCB', 'CPFC', 'BHA', 'LCFC', 'HTFC', 'WWFC', 'FUL', 'WFC', 'BFC']

image_urls = [
    "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
    "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
    "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
    "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg",
    "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    "https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg",
    "https://upload.wikimedia.org/wikipedia/en/3/3c/Cardiff_City_crest.svg",
    "https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg",
    "https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/AFC_Bournemouth_%282013%29.svg/241px-AFC_Bournemouth_%282013%29.svg.png",
    "https://upload.wikimedia.org/wikipedia/en/0/0c/Crystal_Palace_FC_logo.svg",
    "https://upload.wikimedia.org/wikipedia/en/f/fd/Brighton_%26_Hove_Albion_logo.svg",
    "https://upload.wikimedia.org/wikipedia/en/2/2d/Leicester_City_crest.svg",
    "https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/Huddersfield_Town_A.F.C._logo.svg/1200px-Huddersfield_Town_A.F.C._logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/en/e/eb/Fulham_FC_%28shield%29.svg",
    "https://upload.wikimedia.org/wikipedia/en/e/e2/Watford.svg",
    "https://upload.wikimedia.org/wikipedia/en/6/62/Burnley_F.C._Logo.svg"
]

for i in range(0, len(teams)):
    print '---------------------'
    doc_to_be_inserted = {}
    doc_to_be_inserted['entityName'] = teams[i]
    doc_to_be_inserted['acronym'] = acronym[i]
    doc_to_be_inserted['league'] = 'EPL'
    doc_to_be_inserted['imageURL'] = image_urls[i]
    doc_to_be_inserted['type'] = 'Team'
    print doc_to_be_inserted
    db["entities_temp"].insert(doc_to_be_inserted)
    del doc_to_be_inserted
print '---------------------'
