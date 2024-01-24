import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Player} from "src/game.model";
import { Observable, forkJoin, of } from "rxjs";
import { map, tap, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PlayerService {
  private playerUrl = "http://192.168.1.179:3000/players";

  constructor(private http: HttpClient) {}

  loadPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playerUrl).pipe(map((players) => players.sort((a, b) => b.score - a.score)));
  }
  getPlayerById(name: string): Observable<Player> {
    return this.http.get<Player>(`${this.playerUrl}/${name}`);
  }

  modifyScore(playerId: number, modifyNumber: number): Observable<Player> {
    return this.http.get<Player>(`${this.playerUrl}/${playerId}`).pipe(
      switchMap((player) => {
        const newScore = player.score + modifyNumber;
        const updatedPlayer: Player = {
          ...player,
          score: newScore,
        };
        return this.updatePayer(updatedPlayer);
      })
    );
  }

  updatePayer(player: Player): Observable<Player> {
    return this.http.put<Player>(`${this.playerUrl}/${player.id}`, player);
  }

  deleteAllPlayers(): Observable<void[]> {
    return this.http.get<Player[]>(this.playerUrl).pipe(
      switchMap((players) => {
        const deleteRequests = players.map((player) => this.http.delete<void>(`${this.playerUrl}/${player.id}`));
        return forkJoin(deleteRequests);
      })
    );
  }

  saveCurrentPlayer(player: Player): void {
    localStorage.clear();
    localStorage.setItem("currentPlayer", JSON.stringify(player));
  }

  addPlayer(newPlayer: Player): Observable<Player> {
    return this.http.post<Player>(this.playerUrl, newPlayer).pipe(
      tap((player: Player) => {
        this.saveCurrentPlayer(player);
        const storedPlayerData = localStorage.getItem("currentPlayer");
        if (storedPlayerData) {
          const storedPlayer = JSON.parse(storedPlayerData);
          console.log(`ID: ${storedPlayer.id}, Name: ${storedPlayer.name}`);
        }
      })
    );
  }
}
