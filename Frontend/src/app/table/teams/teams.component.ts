import {Component, Input, OnInit} from '@angular/core';
import {Team} from "../../classes/team";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  @Input()
  team!: Team;
  @Input()
  pos!: number;

  constructor() { }

  ngOnInit(): void {
    console.log(this.team)
  }

}
