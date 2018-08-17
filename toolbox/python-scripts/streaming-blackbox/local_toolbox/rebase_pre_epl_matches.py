from pymongo import MongoClient

client = MongoClient("mongodb://bubble:bubble@104.196.215.99:27017/Bubble")
db_pre_epl = client["Bubble"]
db = client["EPL"]

fixture_id = "5b6efa5989d81053b5621f66"

# entity_dict_FRA = {
#     "Nabil_Fekir": "https://api.fifa.com/api/v1/picture/players/2018fwc/401458_sq-300_jpg?allowDefaultPicture=true",
#     "Ousmane_Dembele": "https://api.fifa.com/api/v1/picture/players/2018fwc/398680_sq-300_jpg?allowDefaultPicture=true",
#     "Benjamin_Pavard": "https://api.fifa.com/api/v1/picture/players/2018fwc/411471_sq-300_jpg?allowDefaultPicture=true",
#     "Benjamin_Mendy": "https://api.fifa.com/api/v1/picture/players/2018fwc/335995_sq-300_jpg?allowDefaultPicture=true",
#     "Olivier_Giroud": "https://api.fifa.com/api/v1/picture/players/2018fwc/358015_sq-300_jpg?allowDefaultPicture=true",
#     "Djibril_Sidibe": "https://api.fifa.com/api/v1/picture/players/2018fwc/398682_sq-300_jpg?allowDefaultPicture=true",
#     "Blaise_Matuidi": "https://api.fifa.com/api/v1/picture/players/2018fwc/358014_sq-300_jpg?allowDefaultPicture=true",
#     "Paul_Pogba": "https://api.fifa.com/api/v1/picture/players/2018fwc/367388_sq-300_jpg?allowDefaultPicture=true",
#     "Ngolo_Kante": "https://api.fifa.com/api/v1/picture/players/2018fwc/398681_sq-300_jpg?allowDefaultPicture=true",
#     "Antoine_Griezmann": "https://api.fifa.com/api/v1/picture/players/2018fwc/336435_sq-300_jpg?allowDefaultPicture=true",
#     "Presnel_Kimpembe": "https://api.fifa.com/api/v1/picture/players/2018fwc/401459_sq-300_jpg?allowDefaultPicture=true",
#     "Steven_Nzonzi": "https://api.fifa.com/api/v1/picture/players/2018fwc/319327_sq-300_jpg?allowDefaultPicture=true",
#     "Lucas_Hernandez": "https://api.fifa.com/api/v1/picture/players/2018fwc/411470_sq-300_jpg?allowDefaultPicture=true",
#     "Steve_Mandanda": "https://api.fifa.com/api/v1/picture/players/2018fwc/254133_sq-300_jpg?allowDefaultPicture=true",
#     "Adil_Rami": "https://api.fifa.com/api/v1/picture/players/2018fwc/299876_sq-300_jpg?allowDefaultPicture=true",
#     "Hugo_Lloris": "https://api.fifa.com/api/v1/picture/players/2018fwc/297105_sq-300_jpg?allowDefaultPicture=true",
#     "Corentin_Tolisso": "https://api.fifa.com/api/v1/picture/players/2018fwc/404566_sq-300_jpg?allowDefaultPicture=true",
#     "Deschamps_Didier": "https://api.fifa.com/api/v1/picture/players/2018fwc/48455_sq-300_jpg?allowDefaultPicture=true",
#     "Florian_Thauvin": "https://api.fifa.com/api/v1/picture/players/2018fwc/368965_sq-300_jpg?allowDefaultPicture=true",
#     "Thomas_Lemar": "https://api.fifa.com/api/v1/picture/players/2018fwc/402049_sq-300_jpg?allowDefaultPicture=true",
#     "Samuel_Umtiti": "https://api.fifa.com/api/v1/picture/players/2018fwc/368846_sq-300_jpg?allowDefaultPicture=true",
#     "Raphael_Varane": "https://api.fifa.com/api/v1/picture/players/2018fwc/359440_sq-300_jpg?allowDefaultPicture=true",
#     "Alphonse_Areola": "https://api.fifa.com/api/v1/picture/players/2018fwc/368840_sq-300_jpg?allowDefaultPicture=true",
#     "Kylian_Mbappe": "https://api.fifa.com/api/v1/picture/players/2018fwc/389867_sq-300_jpg?allowDefaultPicture=true"
# }
# entity_dict_CRO = {
#     "Sime_Vrsaljko": "https://api.fifa.com/api/v1/picture/players/2018fwc/336485_sq-300_jpg?allowDefaultPicture=true",
#     "Domagoj_Vida": "https://api.fifa.com/api/v1/picture/players/2018fwc/299896_sq-300_jpg?allowDefaultPicture=true",
#     "Marcelo_Brozovic": "https://api.fifa.com/api/v1/picture/players/2018fwc/380000_sq-300_jpg?allowDefaultPicture=true",
#     "Dominik_Livakovic": "https://api.fifa.com/api/v1/picture/players/2018fwc/369029_sq-300_jpg?allowDefaultPicture=true",
#     "Tin_Jedvaj": "https://api.fifa.com/api/v1/picture/players/2018fwc/372987_sq-300_jpg?allowDefaultPicture=true",
#     "Mario_Mandzukic": "https://api.fifa.com/api/v1/picture/players/2018fwc/375518_sq-300_jpg?allowDefaultPicture=true",
#     "Marko_Pjaca": "https://api.fifa.com/api/v1/picture/players/2018fwc/369057_sq-300_jpg?allowDefaultPicture=true",
#     "Lovre_Kalinic": "https://api.fifa.com/api/v1/picture/players/2018fwc/376287_sq-300_jpg?allowDefaultPicture=true",
#     "Andrej_Kramaric": "https://api.fifa.com/api/v1/picture/players/2018fwc/336472_sq-300_jpg?allowDefaultPicture=true",
#     "Vedran_Corluka": "https://api.fifa.com/api/v1/picture/players/2018fwc/297373_sq-300_jpg?allowDefaultPicture=true",
#     "Nikola_Kalinic": "https://api.fifa.com/api/v1/picture/players/2018fwc/297379_sq-300_jpg?allowDefaultPicture=true",
#     "Josip_Pivaric": "https://api.fifa.com/api/v1/picture/players/2018fwc/375261_sq-300_jpg?allowDefaultPicture=true",
#     "Milan_Badelj": "https://api.fifa.com/api/v1/picture/players/2018fwc/357991_sq-300_jpg?allowDefaultPicture=true",
#     "Dejan_Lovren": "https://api.fifa.com/api/v1/picture/players/2018fwc/312432_sq-300_jpg?allowDefaultPicture=true",
#     "Ante_Rebic": "https://api.fifa.com/api/v1/picture/players/2018fwc/369058_sq-300_jpg?allowDefaultPicture=true",
#     "Ivan_Rakitic": "https://api.fifa.com/api/v1/picture/players/2018fwc/296633_sq-300_jpg?allowDefaultPicture=true",
#     "Luka_Modric": "https://api.fifa.com/api/v1/picture/players/2018fwc/241559_sq-300_jpg?allowDefaultPicture=true",
#     "Duje_Caleta-Car": "https://api.fifa.com/api/v1/picture/players/2018fwc/372424_sq-300_jpg?allowDefaultPicture=true",
#     "Ivan_Strinic": "https://api.fifa.com/api/v1/picture/players/2018fwc/357988_sq-300_jpg?allowDefaultPicture=true",
#     "Filip_Bradaric": "https://api.fifa.com/api/v1/picture/players/2018fwc/402149_sq-300_jpg?allowDefaultPicture=true",
#     "Danijel_Subasic": "https://api.fifa.com/api/v1/picture/players/2018fwc/299887_sq-300_jpg?allowDefaultPicture=true",
#     "Ivan_Perisic": "https://api.fifa.com/api/v1/picture/players/2018fwc/359381_sq-300_jpg?allowDefaultPicture=true",
#     "Mateo_Kovacic": "https://api.fifa.com/api/v1/picture/players/2018fwc/339987_sq-300_jpg?allowDefaultPicture=true",
#     "Dalic_Zlatko": "https://api.fifa.com/api/v1/picture/players/2018fwc/400769_sq-300_jpg?allowDefaultPicture=true"
# }

# for k in entity_dict_CRO.keys():
#     doc_to_be_inserted = {}
#     name_list = []
#     actual_name = k.split("_")
#     name_list.append(actual_name[0])
#     name_list.append(actual_name[1])
#     name_list.append(actual_name[0] + " " + actual_name[1])
#     doc_to_be_inserted[k] = name_list
#     doc_to_be_inserted["imageURL"] = entity_dict_CRO[k]
#     doc_to_be_inserted["league"] = "FIFA WC"
#     doc_to_be_inserted["team"] = "Croatia"
#     doc_to_be_inserted["teamSquadURL"] = "http://www2.squawka.com/teams/croatia/squad"
#     db.entities.insert(doc_to_be_inserted)

# for k in entity_dict_FRA.keys():
#     doc_to_be_inserted = {}
#     name_list = []
#     actual_name = k.split("_")
#     name_list.append(actual_name[0])
#     name_list.append(actual_name[1])
#     name_list.append(actual_name[0] + " " + actual_name[1])
#     doc_to_be_inserted[k] = name_list
#     doc_to_be_inserted["imageURL"] = entity_dict_FRA[k]
#     doc_to_be_inserted["league"] = "FIFA WC"
#     doc_to_be_inserted["team"] = "France"
#     doc_to_be_inserted["teamSquadURL"] = "http://www2.squawka.com/teams/france/squad"
#     db.entities.insert(doc_to_be_inserted)
# print ('-----------------------------------------')
# print "Processed Tweets."
# counter = 0
# for post in db_pre_epl.CROFRA_FINAL.find({}, {"_id": False}):
#     counter += 1
#     if counter <= 6881:
#         continue
#     print post
#     db[fixture_id].insert(post)

print ('-----------------------------------------')
print "Trending."
trending_id = fixture_id + "_trending"
for post in db_pre_epl.TRENDING_CROFRA_FINAL.find({}, {"_id": False}):
    pprint post
    db[trending_id].insert(post)

# print ('-----------------------------------------')
# print "Events."
# event_id = fixture_id + "_events"
# for post in db_pre_epl.CROFRA_FINAL_EVENTS.find({}, {"_id": False}):
#     print post
#     db[event_id].insert(post)

# print ('-----------------------------------------')
# print "Trending."
# trending_id = fixture_id + "_trending"
# for post in db_pre.CROFRA_FINAL_TRENDING.find({}, {"timeStamp": False}):
#     print post
#     db[trending_id].insert(post)
