// json-server --watch db.json --host 0.0.0.0

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Player } from "src/game.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AnswerService {
  private playerUrl = "http://localhost:3000/players"; // URL of the backend API for players
  // private playerUrl = "http://192.168.1.179:3000/players"; // Alternative URL for the backend API

  constructor(private http: HttpClient) {}

  // get all answers from the server
  getAnswers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playerUrl);
  }

  //update a player's answer on the server
  updateAnswer(updatedAnswer: Player): Observable<Player> {
    return this.http.put<Player>(`${this.playerUrl}/${updatedAnswer.id}`, updatedAnswer);
  }
}

// todo! Ha az egyik eszköz korábban tölt be, akkor a késöbb beadott válaszok nem érkeznek be erre a készülékre.
