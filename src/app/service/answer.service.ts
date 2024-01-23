import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Player } from "src/game.model";
import { Observable, forkJoin, Subject } from "rxjs";
import { switchMap } from "rxjs/operators";
import { tap } from "rxjs/operators";


@Injectable({
  providedIn: "root",
})
export class AnswerService {
  private playerUrl = "http://localhost:3000/players";

  private answersDeletedSource = new Subject<void>();
  answersDeleted$ = this.answersDeletedSource.asObservable();

  constructor(private http: HttpClient) {}

  getAnswers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playerUrl);
  }

  updateAnswer(updatedAnswer: Player): Observable<Player> {
    return this.http.put<Player>(`${this.playerUrl}/${updatedAnswer.id}`, updatedAnswer);
  }

  deleteAllAnswers(): Observable<void[]> {
    return this.http.get<Player[]>(this.playerUrl).pipe(
      switchMap((answers) => {
        const deleteRequests = answers.map((answer) => this.http.delete<void>(`${this.playerUrl}/${answer.id}`));
        return forkJoin(deleteRequests);
      }),
      tap(() => this.answersDeletedSource.next())
    );
  }
}
