// json-server --watch db.json --host 0.0.0.0

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Player } from "src/game.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AnswerService {
  // private playerUrl = "http://localhost:3000/players";
  private playerUrl = "http://192.168.1.179:3000/players";

  constructor(private http: HttpClient) {}

  getAnswers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playerUrl);
  }

  updateAnswer(updatedAnswer: Player): Observable<Player> {
    return this.http.put<Player>(`${this.playerUrl}/${updatedAnswer.id}`, updatedAnswer);
  }
}
// Ha az egyik eszköz korábban tölt be, akkor a késöbb beadott válaszok nem érkeznek be erre a készülékre.
// Se a player komponensnél, se az answernél.
