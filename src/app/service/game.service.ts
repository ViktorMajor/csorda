import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Player, Question, Answer } from 'src/game.model';
import { map, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class GameService {
  private playerUrl = "http://localhost:3000/players";
  private questionsUrl = "http://localhost:3000/questions";
  private answersUrl = " http://localhost:3000/answers";

  private playersSubject = new BehaviorSubject<Player[]>([]);
  private currentQuestionSubject = new BehaviorSubject<Question | null>(null);

  constructor(private http: HttpClient) {
    this.loadRandomQuestion();
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.http.get<Player[]>(this.playerUrl).subscribe((players) => {
      this.playersSubject.next(players);
    });
  }

  get players$(): Observable<Player[]> {
    return this.playersSubject.asObservable().pipe(map((players) => players.sort((a, b) => b.score - a.score)));
  }

  private loadRandomQuestion(): void {
    this.http
      .get<Question[]>(this.questionsUrl)
      .pipe(map((questions) => questions[Math.floor(Math.random() * questions.length)]))
      .subscribe((question) => {
        this.currentQuestionSubject.next(question);
      });
  }

  get currentQuestion$(): Observable<Question | null> {
    return this.currentQuestionSubject.asObservable();
  }

  refreshQuestion(): void {
    this.loadRandomQuestion();
  }

  increaseScore(playerId: number): Observable<Player> {
    return this.http.get<Player>(`${this.playerUrl}/${playerId}`).pipe(
      switchMap((player) => {
        player.score++;
        return this.http.put<Player>(`${this.playerUrl}/${playerId}`, player);
      }),
      tap((updatedPlayer) => {
        this.updatePlayersSubject(updatedPlayer);
      })
    );
  }

  decreaseScore(playerId: number): Observable<Player> {
    return this.http.get<Player>(`${this.playerUrl}/${playerId}`).pipe(
      switchMap((player) => {
        player.score--;
        return this.http.put<Player>(`${this.playerUrl}/${playerId}`, player);
      }),
      tap((updatedPlayer) => {
        this.updatePlayersSubject(updatedPlayer);
      })
    );
  }

  private updatePlayersSubject(updatedPlayer: Player): void {
    this.playersSubject.next(this.playersSubject.value.map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p)));
  }

  deleteAllPlayers(): Observable<void[]> {
    return this.http.get<Player[]>(this.playerUrl).pipe(
      switchMap((players) => {
        const deleteRequests = players.map((player) => this.http.delete<void>(`${this.playerUrl}/${player.id}`));
        return forkJoin(deleteRequests);
      }),
      tap(() => {
        this.playersSubject.next([]);
      })
    );
  }

  addPlayer(newPlayer: Player): Observable<Player> {
    return this.http.post<Player>(this.playerUrl, newPlayer).pipe(
      tap((player: Player) => {
        this.updatePlayersAfterAddition(player);
      })
    );
  }

  private updatePlayersAfterAddition(newPlayer: Player): void {
    this.playersSubject.next([...this.playersSubject.value, newPlayer]);
  }

  getAnswers(): Observable<Answer[]> {
    return this.http.get<Answer[]>(this.answersUrl);
  }
}
