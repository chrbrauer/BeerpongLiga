import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {Game} from "../classes/game";
import {Season} from "../classes/season";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  public games: Game[] = [];
  public seasons: Season[] = [];

  constructor(private dataService: DataService) {

  }
  ngOnInit(): void {
    this.loadSeasons();
  }
  sorter(): void {
    this.games.sort((objA, objB) => objA.datum.localeCompare(objB.datum));
  }
  sortSeasons(): void {
    this.seasons.sort((a, b) => (a._id > b._id ? -1 : 1));

  }
  loadSeasons(){
    this.dataService.getSeasons().subscribe(
      res => {
        this.seasons = res['elements'];
        this.sortSeasons();
        this.loadData(this.seasons[0]._id);

      },
      err => {
        console.log(err)
      }
    );
  }

  loadData(season: number) {
    this.games = [];
    this.dataService.getGames(season).subscribe(
      res => {
        this.games = res['elements'];
        this.sorter();
      },
      err => {
        console.log(err)
      }
    );
  }

  changeseason(){
    let select = (<HTMLSelectElement>document.getElementById("seasons"));
    const val = parseInt(select.value)
    this.loadData(val);
  }






}
