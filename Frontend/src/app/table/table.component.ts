import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {Team} from "../classes/team";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  public teams: Team[] = [];

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
    this.loadData();
  }
  sorter(): void {
    this.teams.sort((a,b) => (a.punkte < b.punkte) ? 1 : ((b.punkte > a.punkte) ? -1 : 0))
  }
  loadData() {
    this.dataService.getTeams().subscribe(
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

}
