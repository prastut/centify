const moment = require("moment");

const ENG = {
  "Ruben_Loftus-Cheek":
    "https://api.fifa.com/api/v1/picture/players/2018fwc/411303_sq-300_jpg?allowDefaultPicture=true",
  Jamie_Vardy:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/400820_sq-300_jpg?allowDefaultPicture=true",
  Phil_Jones:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/358009_sq-300_jpg?allowDefaultPicture=true",
  Fabian_Delph:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/306520_sq-300_jpg?allowDefaultPicture=true",
  John_Stones:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/369434_sq-300_jpg?allowDefaultPicture=true",
  Danny_Rose:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/274036_sq-300_jpg?allowDefaultPicture=true",
  Dele_Alli:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/401298_sq-300_jpg?allowDefaultPicture=true",
  "Trent_Alexander-Arnold":
    "https://api.fifa.com/api/v1/picture/players/2018fwc/390761_sq-300_jpg?allowDefaultPicture=true",
  Kyle_Walker:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/356750_sq-300_jpg?allowDefaultPicture=true",
  Harry_Kane:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/369419_sq-300_jpg?allowDefaultPicture=true",
  Jordan_Henderson:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/356189_sq-300_jpg?allowDefaultPicture=true",
  Marcus_Rashford:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/401470_sq-300_jpg?allowDefaultPicture=true",
  Kieran_Trippier:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/306504_sq-300_jpg?allowDefaultPicture=true",
  Harry_Maguire:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/407498_sq-300_jpg?allowDefaultPicture=true",
  Jesse_Lingard:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/398743_sq-300_jpg?allowDefaultPicture=true",
  Gary_Cahill:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/305764_sq-300_jpg?allowDefaultPicture=true",
  Raheem_Sterling:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/336043_sq-300_jpg?allowDefaultPicture=true",
  Eric_Dier:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/369400_sq-300_jpg?allowDefaultPicture=true",
  Ashley_Young:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/299962_sq-300_jpg?allowDefaultPicture=true",
  Danny_Welbeck:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/274034_sq-300_jpg?allowDefaultPicture=true"
};

const SWE = {
  Martin_Olsson:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/358053_sq-300_jpg?allowDefaultPicture=true",
  Ludwig_Augustinsson:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/395264_sq-300_jpg?allowDefaultPicture=true",
  Marcus_Rohden:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/398549_sq-300_jpg?allowDefaultPicture=true",
  Isaac_Kiese_Thelin:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/395273_sq-300_jpg?allowDefaultPicture=true",
  Ola_Toivonen:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/300255_sq-300_jpg?allowDefaultPicture=true",
  Andreas_Granqvist:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/214667_sq-300_jpg?allowDefaultPicture=true",
  Viktor_Claesson:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/401465_sq-300_jpg?allowDefaultPicture=true",
  Emil_Forsberg:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/398550_sq-300_jpg?allowDefaultPicture=true",
  Kristoffer_Nordfeldt:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/360496_sq-300_jpg?allowDefaultPicture=true",
  Mikael_Lustig:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/300251_sq-300_jpg?allowDefaultPicture=true",
  Jimmy_Durmaz:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/365630_sq-300_jpg?allowDefaultPicture=true",
  "Karl-Johan_Johnsson":
    "https://api.fifa.com/api/v1/picture/players/2018fwc/398556_sq-300_jpg?allowDefaultPicture=true",
  Victor_Lindelof:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/395283_sq-300_jpg?allowDefaultPicture=true",
  Gustav_Svensson:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/406882_sq-300_jpg?allowDefaultPicture=true",
  John_Guidetti:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/398551_sq-300_jpg?allowDefaultPicture=true",
  Oscar_Hiljemark:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/372881_sq-300_jpg?allowDefaultPicture=true",
  Pontus_Jansson:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/373312_sq-300_jpg?allowDefaultPicture=true",
  Marcus_Berg:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/297243_sq-300_jpg?allowDefaultPicture=true",
  Emil_Krafth:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/398561_sq-300_jpg?allowDefaultPicture=true",
  Filip_Helander:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/395270_sq-300_jpg?allowDefaultPicture=true",
  Sebastian_Larsson:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/214675_sq-300_jpg?allowDefaultPicture=true",
  Robin_Olsen:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/398547_sq-300_jpg?allowDefaultPicture=true",
  Albin_Ekdal:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/360340_sq-300_jpg?allowDefaultPicture=true"
};

const BEL = {
  Simon_Mignolet:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/298738_sq-300_jpg?allowDefaultPicture=true",
  Jan_Vertonghen:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/290904_sq-300_jpg?allowDefaultPicture=true",
  Adnan_Januzaj:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/379910_sq-300_jpg?allowDefaultPicture=true",
  Thomas_Vermaelen:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/216880_sq-300_jpg?allowDefaultPicture=true",
  Romelu_Lukak:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/358112_sq-300_jpg?allowDefaultPicture=true",
  Leander_Dendoncker:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/402015_sq-300_jpg?allowDefaultPicture=true",
  Martinez_Roberto:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/396423_sq-300_jpg?allowDefaultPicture=true",
  Nacer_Chadli:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/358108_sq-300_jpg?allowDefaultPicture=true",
  Dedryck_Boyata:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/358118_sq-300_jpg?allowDefaultPicture=true",
  Yannick_Carrasco:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/398653_sq-300_jpg?allowDefaultPicture=true",
  Kevin_De_Bruyne:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/358120_sq-300_jpg?allowDefaultPicture=true",
  Marouane_Fellaini:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/290902_sq-300_jpg?allowDefaultPicture=true",
  Vincent_Kompany:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/216004_sq-300_jpg?allowDefaultPicture=true",
  Thorgan_Hazard:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/378834_sq-300_jpg?allowDefaultPicture=true",
  Thibaut_Courtois:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/358106_sq-300_jpg?allowDefaultPicture=true",
  Michy_Batshuayi:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/378835_sq-300_jpg?allowDefaultPicture=true",
  Moussa_Dembele:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/290825_sq-300_jpg?allowDefaultPicture=true",
  Youri_Tielemans:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/401444_sq-300_jpg?allowDefaultPicture=true",
  Toby_Alderweireld:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/290864_sq-300_jpg?allowDefaultPicture=true",
  Thomas_Meunier:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/358122_sq-300_jpg?allowDefaultPicture=true",
  Axel_Witsel:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/290821_sq-300_jpg?allowDefaultPicture=true",
  Eden_Hazard:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/273996_sq-300_jpg?allowDefaultPicture=true",
  Koen_Casteels:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/373315_sq-300_jpg?allowDefaultPicture=true",
  Dries_Mertens:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/358114_sq-300_jpg?allowDefaultPicture=true"
};

const FRA = {
  Nabil_Fekir:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/401458_sq-300_jpg?allowDefaultPicture=true",
  Ousmane_Dembele:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/398680_sq-300_jpg?allowDefaultPicture=true",
  Benjamin_Pavard:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/411471_sq-300_jpg?allowDefaultPicture=true",
  Benjamin_Mendy:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/335995_sq-300_jpg?allowDefaultPicture=true",
  Olivier_Giroud:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/358015_sq-300_jpg?allowDefaultPicture=true",
  Djibril_Sidibe:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/398682_sq-300_jpg?allowDefaultPicture=true",
  Blaise_Matuidi:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/358014_sq-300_jpg?allowDefaultPicture=true",
  Paul_Pogba:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/367388_sq-300_jpg?allowDefaultPicture=true",
  Ngolo_Kante:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/398681_sq-300_jpg?allowDefaultPicture=true",
  Antoine_Griezmann:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/336435_sq-300_jpg?allowDefaultPicture=true",
  Presnel_Kimpembe:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/401459_sq-300_jpg?allowDefaultPicture=true",
  Steven_Nzonzi:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/319327_sq-300_jpg?allowDefaultPicture=true",
  Lucas_Hernandez:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/411470_sq-300_jpg?allowDefaultPicture=true",
  Steve_Mandanda:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/254133_sq-300_jpg?allowDefaultPicture=true",
  Adil_Rami:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/299876_sq-300_jpg?allowDefaultPicture=true",
  Hugo_Lloris:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/297105_sq-300_jpg?allowDefaultPicture=true",
  Corentin_Tolisso:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/404566_sq-300_jpg?allowDefaultPicture=true",
  Deschamps_Didier:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/48455_sq-300_jpg?allowDefaultPicture=true",
  Florian_Thauvin:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/368965_sq-300_jpg?allowDefaultPicture=true",
  Thomas_Lemar:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/402049_sq-300_jpg?allowDefaultPicture=true",
  Samuel_Umtiti:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/368846_sq-300_jpg?allowDefaultPicture=true",
  Raphael_Varane:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/359440_sq-300_jpg?allowDefaultPicture=true",
  Alphonse_Areola:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/368840_sq-300_jpg?allowDefaultPicture=true",
  Kylian_Mbappe:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/389867_sq-300_jpg?allowDefaultPicture=true"
};

const CRO = {
  Sime_Vrsaljko:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/336485_sq-300_jpg?allowDefaultPicture=true",
  Domagoj_Vida:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/299896_sq-300_jpg?allowDefaultPicture=true",
  Marcelo_Brozovic:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/380000_sq-300_jpg?allowDefaultPicture=true",
  Dominik_Livakovic:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/369029_sq-300_jpg?allowDefaultPicture=true",
  Tin_Jedvaj:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/372987_sq-300_jpg?allowDefaultPicture=true",
  Mario_Mandzukic:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/375518_sq-300_jpg?allowDefaultPicture=true",
  Marko_Pjaca:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/369057_sq-300_jpg?allowDefaultPicture=true",
  Lovre_Kalinic:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/376287_sq-300_jpg?allowDefaultPicture=true",
  Andrej_Kramaric:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/336472_sq-300_jpg?allowDefaultPicture=true",
  Vedran_Corluka:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/297373_sq-300_jpg?allowDefaultPicture=true",
  Nikola_Kalinic:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/297379_sq-300_jpg?allowDefaultPicture=true",
  Josip_Pivaric:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/375261_sq-300_jpg?allowDefaultPicture=true",
  Milan_Badelj:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/357991_sq-300_jpg?allowDefaultPicture=true",
  Dejan_Lovren:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/312432_sq-300_jpg?allowDefaultPicture=true",
  Ante_Rebic:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/369058_sq-300_jpg?allowDefaultPicture=true",
  Ivan_Rakitic:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/296633_sq-300_jpg?allowDefaultPicture=true",
  Luka_Modric:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/241559_sq-300_jpg?allowDefaultPicture=true",
  "Duje_Caleta-Car":
    "https://api.fifa.com/api/v1/picture/players/2018fwc/372424_sq-300_jpg?allowDefaultPicture=true",
  Ivan_Strinic:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/357988_sq-300_jpg?allowDefaultPicture=true",
  Filip_Bradaric:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/402149_sq-300_jpg?allowDefaultPicture=true",
  Danijel_Subasic:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/299887_sq-300_jpg?allowDefaultPicture=true",
  Ivan_Perisic:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/359381_sq-300_jpg?allowDefaultPicture=true",
  Mateo_Kovacic:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/339987_sq-300_jpg?allowDefaultPicture=true",
  Dalic_Zlatko:
    "https://api.fifa.com/api/v1/picture/players/2018fwc/400769_sq-300_jpg?allowDefaultPicture=true"
};

const MATCHES_LIST = [
  {
    key: "CROFRA_FINAL",
    matchName: "Croatia vs France",
    matchTileImage:
      "https://www.sportzcraazy.com/wp-content/uploads/2018/07/France-Vs-Croatia.png",
    isLive: false,
    teamOneId: "CRO",
    teamTwoId: "FRA",
    startTime: moment.utc("2018-07-15 15:18:30")
  }
  // {
  //   key: "BELFRA_SEMI",
  //   matchName: "Belgium vs France",
  //   matchTileImage:
  //     "https://i.ytimg.com/vi/D_hu6xpwn4Q/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCqRPhweDAYucAxelwQqhrTO1qJbQ",
  //   isLive: false,
  //   teamOneId: "BEL",
  //   teamTwoId: "FRA",
  //   startTime: moment.utc("2018-07-10 18:00:00")
  // }
];

module.exports = {
  BEL,
  FRA,
  SWE,
  ENG,
  CRO,
  MATCHES_LIST
};
