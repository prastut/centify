import requests
import datetime


def get(url, name='?'):

    print('---', name, '---')

    r = requests.get(url)

    data = r.json()
    # print(data.keys())
    # print(data['headDocument'].keys())
    # print(data['featured'].keys())
    # print(data['featured']['content'][0])
    # print(data['networkSettings'].keys())
    # print(data['siteSettings'].keys())
    # print(data['collectionSettings'].keys())

    if 'headDocument' in data:
        data = data['headDocument']['content']
    else:
        data = data['content'][::-1]

    for item in data:
        dt = datetime.datetime.fromtimestamp(item['content']['createdAt'])
        time = dt.strftime('%Y.%m.%d %H:%M')
        # print "Accessing bodyHtml from: " + str(item['content'].keys())
        try:
            title = item['content']['bodyHtml']
            title = title.split('</strong>')[0].split('<strong>')[1]
            print(time, title)
        except KeyError as k:
            # print title
            # print k
            continue
        except IndexError as index_error:
            # print title
            # print index_error
            continue


# requests.get('http://www.skysports.com/football/france-vs-croatia/live/385232')
get('https://data.livefyre.com/bs3/v3.1/bskyb.fyre.co/363166/MTE0NjUwODE=/init', 'init')
for x in range(1, -1, -1):
    get('https://data.livefyre.com/bs3/v3.1/bskyb.fyre.co/363166/MTE0MDIxNTE=/{}.json'.format(x), x)
