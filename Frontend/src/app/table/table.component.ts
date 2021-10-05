import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {Team} from "../classes/team";
import {Season} from "../classes/season";
import {SelectControlValueAccessor} from "@angular/forms";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  public teams: Team[] = [];
  public seasons: Season[] = [];


  constructor(private dataService: DataService) {
    this.loadSeasons();
  }

  ngOnInit(): void {

  }
  sorter(): void {
    this.teams.sort((a, b) => (a.punkte > b.punkte ? -1 : 1))
  }

  sortSeasons(): void {
    this.seasons.sort((a, b) => (a._id > b._id ? -1 : 1))
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
    this.teams = [];
    this.dataService.getTeamsBySeason(season).subscribe(
      res => {
        this.teams = res['elements'];
        this.sorter();
      },
      err => {
        console.log(err)
      }
    );
  }

  getPosition(t: Team): number{
    return this.teams.indexOf(t) + 1;
  }

  changeseason(){
    let select = (<HTMLSelectElement>document.getElementById("dropdown"));
    const val = parseInt(select.value)
    this.loadData(val);
  }

}
