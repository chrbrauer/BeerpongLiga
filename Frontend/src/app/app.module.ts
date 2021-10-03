import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RulesComponent } from './rules/rules.component';
import {RouterModule} from "@angular/router";
import {appRoutes} from "./routes";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from './table/table.component';
import { ResultsComponent } from './results/results.component';
import { ScoreBannerComponent } from './results/score-banner/score-banner.component';
import {HttpClientModule} from "@angular/common/http";
import { TeamsComponent } from './table/teams/teams.component';


@NgModule({
  declarations: [
    AppComponent,
    RulesComponent,
    TableComponent,
    ResultsComponent,
    ScoreBannerComponent,
    TeamsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
