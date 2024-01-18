import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Player, Question } from 'src/game.model';
import { map, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private playerUrl = 'http://localhost:3000/players';
  private questionsUrl = 'http://localhost:3000/questions';

  private playersSubject = new BehaviorSubject<Player[]>([]);

  constructor(private http: HttpClient) {
    this.http.get<Player[]>(this.playerUrl).subscribe((players) => {
      this.playersSubject.next(players);
    });
  }

  get players$(): Observable<Player[]> {
    return this.playersSubject
      .asObservable()
      .pipe(map((players) => players.sort((a, b) => b.score - a.score)));
  }

  getRandomQuestion(): Observable<Question> {
    return this.http
      .get<Question[]>(this.questionsUrl)
      .pipe(
        map(
          (questions) => questions[Math.floor(Math.random() * questions.length)]
        )
      );
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
    this.playersSubject.next(
      this.playersSubject.value.map((p) =>
        p.id === updatedPlayer.id ? updatedPlayer : p
      )
    );
  }

  deleteAllPlayers(): Observable<any> {
    return this.http.get<Player[]>(this.playerUrl).pipe(
      switchMap((players) => {
        const deleteRequests = players.map((player) =>
          this.http.delete(`${this.playerUrl}/${player.id}`)
        );
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
}
