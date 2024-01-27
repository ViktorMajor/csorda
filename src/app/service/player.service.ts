import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Player } from "src/game.model";
import { Observable } from "rxjs";
import { map, tap, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PlayerService {
  private playerUrl = "http://localhost:3000/players"; // URL of the backend API for players
  // private playerUrl = "http://192.168.1.179:3000/players"; // Alternative URL for the backend API

  constructor(private http: HttpClient) {}

  // Function to load players by score
  loadPlayers(): Observable<Player[]> {
    return this.http
      .get<Player[]>(this.playerUrl)
      .pipe(map((players) => players.sort((a, b) => b.score - a.score)));
  }

  // Function to retrieve a player by their ID from the server
  getPlayerById(name: string): Observable<Player> {
    return this.http.get<Player>(`${this.playerUrl}/${name}`);
  }

  // Function to modify the score of a player and update it on the server
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

  // Function to update player data on the server
  updatePayer(player: Player): Observable<Player> {
    return this.http.put<Player>(`${this.playerUrl}/${player.id}`, player);
  }

  // Function to save the current player's data in local storage
  saveCurrentPlayer(player: Player): void {
    localStorage.clear();
    localStorage.setItem("currentPlayer", JSON.stringify(player));
  }
  // Function to add a new player to the server and save it as the current player in local storage
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
