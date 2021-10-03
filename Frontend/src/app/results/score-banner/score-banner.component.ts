import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../../classes/game";


@Component({
  selector: 'app-score-banner',
  templateUrl: './score-banner.component.html',
  styleUrls: ['./score-banner.component.css']
})
export class ScoreBannerComponent implements OnInit {
  @Input()
  game!: Game;
  datum: string = "";

  constructor() {
  }


  ngOnInit(): void {
    this.transformdate();
  }
  transformdate(): void {
    const tmp = this.game.datum.split('.');
    this.datum = tmp[2]+"."+tmp[1]+"."+tmp[0];
  }

}
