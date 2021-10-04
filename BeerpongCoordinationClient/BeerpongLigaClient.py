# importing the requests library
import requests

# api-endpoint
URL = "http://85.214.68.249:3000/bpl"


def getIDFromGame(partie, games):
    ce = partie.replace(" vs ", ";").replace(" am ", ";").split(";")
    datum = encodeDatum(ce[2])
    heim = ce[0]
    gast = ce[1]
    for i in games:
        if i['datum'] == datum and i['heim']['teamname'] == heim and i['gast']['teamname'] == gast:
            return i['_id'], heim, gast


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


def createGame():
    print('Liste aller Teams:')
    c = requests.get(url=(URL + '/getTeams')).json()
    for t in c['elements']:
        print(' -' + t['teamname'])
    print("\n" + "Geben sie den Teamnamen der ersten Mannschaft ein:")
    heim = input()
    print("Geben sie den Teamnamen der zeiten Mannschaft ein:")
    gast = input()
    print("Geben das Datum des Spiels ein:")
    datum = input()
    datum = encodeDatum(datum)
    PARAMS = {'heim': heim, 'gast': gast, 'datum': datum}
    r = requests.post(url=(URL + '/postGame'), json=PARAMS)
    data = r.json()
    if data['status']:
        print('Spiel wurde erfolgreich erstellt!')
    else:
        print(data['message'])


def setResult():
    games = []
    print('Liste aller Begegbnungen:')
    c = requests.get(url=(URL + '/getGames')).json()
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
    print("Geben sie die Anzahl der Treffer von " + heim + " ein:")
    score_heim = int(input())
    print("Geben sie die Anzahl der Treffer von " + gast + " ein:")
    score_gast = int(input())
    PARAMS = {'_id': id, 'score_heim': score_heim, 'score_gast': score_gast}
    r = requests.put(url=(URL + '/putResult'), json=PARAMS)
    data = r.json()
    if data['status']:
        calcPoints(heim, gast, score_heim, score_gast)
        print('Spiel wurde erfolgreich erstellt!')
    else:
        print(data['message'])


def setPoints(Team, Punkte):
    PARAMS = {'teamname': Team, 'punkte': Punkte}
    r = requests.put(url=(URL + '/putPoints'), json=PARAMS)
    data = r.json()
    return data['status']


def calcPoints(heim, gast, score_heim, score_gast):
    if (score_heim > score_gast):
        setPoints(heim, 3)
    else:
        setPoints(gast, 3)

def choose():
    print('Was möchten Sie tun?')
    print(' (1) neues Team hinzufügen')
    print(' (2) Partie hinzufügen')
    print(' (3) Ergebnis eintragen')
    print(' (4) Beenden')
    print('')
    option = input()

    if option == '1':
        createTeam()
        choose()
    if option == '2':
        createGame()
        choose()
    if option == '3':
        setResult()
        choose()
    if option == '4':
        return
    else:
        print('Keine gültige Eingabe! Bitte versuchen Sie es erneut \n\n')
        choose()


if __name__ == '__main__':
    choose()
