import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Team} from "../classes/team";
import {Game} from "../classes/game";
import {Season} from "../classes/season";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverUrl = "http://192.168.178.76:3000";

  constructor(
    private http: HttpClient
  ) {
  }

  /**
   * Die Methoden zum erstellen der Anfragen an den Application-Server
   */

  public getTeamsBySeason(season: number) {
    return this.http.get<Team[]>(this.serverUrl + '/bpl/getTeamsBySeason?season='+season);
  }
  public getGames(season: number) {
    return this.http.get<Game[]>(this.serverUrl + '/bpl/getGames&season='+season);
  }
  public getSeasons() {
    return this.http.get<Season[]>(this.serverUrl + '/bpl/getSeasons');
  }




}
