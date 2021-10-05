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
  bg: string = "bg-white";


  constructor() {}

  ngOnInit(): void {
    if (this.pos == 1){
      this.bg = "bg-gold";
    }
    if (this.pos == 2){
      this.bg = "bg-silber";
    }
    if (this.pos == 3){
      this.bg = "bg-bronze";
    }

  }

}
