import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Team} from "../classes/team";
import {Game} from "../classes/game";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverUrl = "http://85.214.68.249:3000";

  constructor(
    private http: HttpClient
  ) {
  }

  /**
   * Die Methoden zum erstellen der Anfragen an den Application-Server
   */

  public getTeams() {
    return this.http.get<Team[]>(this.serverUrl + '/bpl/getTeams');
  }
  public getGames() {
    return this.http.get<Game[]>(this.serverUrl + '/bpl/getGames');
  }


}
