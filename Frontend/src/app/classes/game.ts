import {Team} from "./team";

export interface Game {
  datum: string;
  heim: Team;
  gast: Team;
  score_heim: number;
  score_gast: number;
}
