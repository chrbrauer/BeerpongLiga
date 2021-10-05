# importing the requests library
import requests

# api-endpoint
URL = "http://localhost:3000/bpl"


def getIDFromGame(partie, games):
    ce = partie.replace(" vs ", ";").replace(" am ", ";").split(";")
    datum = encodeDatum(ce[2])
    heim = ce[0]
    gast = ce[1]
    for i in games:
        if i['datum'] == datum and i['heim']['teamname'] == heim and i['gast']['teamname'] == gast:
            return i['_id'], i['heim'], i['gast']


def encodeDatum(datum):
    return datum.split('.')[2] + '.' + datum.split('.')[1] + '.' + datum.split('.')[0]


def createTeam():
    print("Geben sie den Namen vom ersten Spieler ein (Vorname Nachname):")
    spieler_1 = input()
    print("Geben sie den Namen vom zweiten Spieler ein (Vorname Nachname):")
    spieler_2 = input()
    print("Geben sie den Namen des Teams ein:")
    teamname = input()
    PARAMS = {'spieler_1': spieler_1, 'spieler_2': spieler_2, 'teamname': teamname}
    r = requests.post(url=(URL + '/postTeam'), json=PARAMS)
    data = r.json()
    if data['status']:
        print('Team wurde erfolgreich erstellt!')
    else:
        print(data['message'])

def TeamToSeason():
    print('Liste aller Teams:')
    c = requests.get(url=(URL + '/getTeams')).json()
    for t in c['elements']:
        print(' -' + t['teamname'])
    print("\n" + "Geben sie den Teamnamen der ersten Mannschaft ein:")
    team = input()
    print("Geben die Saison ein.")
    saison = int(input())
    PARAMS = {'teamname': team, 'season': saison}
    r = requests.post(url=(URL + '/TeamToSeason'), json=PARAMS)
    data = r.json()
    if data['status']:
        print('Team wurde erfolgreich erstellt!')
    else:
        print(data['message'])


def createGame():
    print('Liste aller Teams:')
    c = requests.get(url=(URL + '/getTeams')).json()
    for t in c['elements']:
        print(' -' + t['teamname'])

    print("\n" + "Geben sie den Teamnamen der ersten Mannschaft ein:")
    heim = input()
    print("Geben sie den Teamnamen der zeiten Mannschaft ein:")
    gast = input()
    print("Geben die Saison an:")
    saison = int(input())
    print("Geben das Datum des Spiels ein:")
    datum = input()
    datum = encodeDatum(datum)
    PARAMS = {'heim': heim, 'gast': gast, 'datum': datum, 'season': saison}
    r = requests.post(url=(URL + '/postGame'), json=PARAMS)
    data = r.json()
    if data['status']:
        print('Spiel wurde erfolgreich erstellt!')
    else:
        print(data['message'])


def setResult():
    games = []
    print("Geben Sie die betreffende Saison an:")
    saison = int(input())
    print('Liste aller Begegbnungen:')
    c = requests.get(url=(URL + '/getGames?season='+str(saison))).json()
    for t in c['elements']:
        if t['score_heim'] < 1 and t['score_gast'] < 1:
            games.append(t)
            print(' ' + t['heim']['teamname'] + " vs " + t['gast']['teamname'] + ' am ' + encodeDatum(t['datum']))
    if len(games) == 0:
        print('Zurzeit gibt es keine offenen Partien.')
        return
    print("\n" + "Geben die Partie an:")
    partie = input()
    id, heim, gast = getIDFromGame(partie, games)
    print("Geben sie die Anzahl der Treffer von " + heim['teamname'] + " ein:")
    score_heim = int(input())
    print("Geben sie die Anzahl der Treffer von " + gast['teamname'] + " ein:")
    score_gast = int(input())
    PARAMS = {'_id': id, 'score_heim': score_heim, 'score_gast': score_gast}
    elo_heim = requests.get(url=(URL + '/getEloByID'), params={'team':heim['_id'],'season':saison}).json()['punkte']
    elo_gast = requests.get(url=(URL + '/getEloByID'), params={'team':gast['_id'],'season':saison}).json()['punkte']
    r = requests.put(url=(URL + '/putResult'), json=PARAMS)
    data = r.json()
    if data['status']:
        elo_heim_neu, elo_gast_neu = calcElo(score_heim, score_gast, elo_heim, elo_gast, 30)
        setPoints(heim['teamname'], elo_heim_neu, saison)
        setPoints(gast['teamname'], elo_gast_neu, saison)
        print('Spiel wurde erfolgreich erstellt!')
    else:
        print(data['message'])


def setPoints(Team, Punkte, Saison):
    PARAMS = {'teamname': Team, 'punkte': Punkte, 'season': Saison}
    r = requests.put(url=(URL + '/putPoints'), json=PARAMS)
    data = r.json()
    return data['status']


def calcElo(score_heim, score_gast, elo_heim, elo_gast, k):
    e_heim = 1 / (1 + 10 ** ((elo_gast - elo_heim) / 400))
    e_gast = 1 / (1 + 10 ** ((elo_heim - elo_gast) / 400))

    elo_heim_neu = round(elo_heim + k * ((score_heim - score_gast) - e_heim), 0)
    elo_gast_neu = round(elo_gast + k * ((score_gast - score_heim) - e_gast), 0)

    return int(elo_heim_neu), int(elo_gast_neu)


def choose():
    print('Was möchten Sie tun?')
    print(' (1) neues Team hinzufügen')
    print(' (2) Team zu Saison hinzufügen')
    print(' (3) Partie hinzufügen')
    print(' (4) Ergebnis eintragen')
    print(' (5) Beenden')
    print('')
    option = input()

    if option == '1':
        createTeam()
        choose()
    if option == '2':
        TeamToSeason()
        choose()
    if option == '3':
        createGame()
        choose()
    if option == '4':
        setResult()
        choose()
    if option == '5':
        return
    else:
        print('Keine gültige Eingabe! Bitte versuchen Sie es erneut \n\n')
        choose()


if __name__ == '__main__':
    choose()
