import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {Game} from "../classes/game";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  public games: Game[] = [];

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
    this.loadData();
  }
  sorter(): void {
    this.games.sort((objA, objB) => objA.datum.localeCompare(objB.datum));
  }
  loadData() {
    this.dataService.getGames().subscribe(
      res => {
        this.games = res['elements'];
        this.sorter();
      },
      err => {
        console.log(err)
      }
    );
  }






}
