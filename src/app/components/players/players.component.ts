import { PlayerService } from "src/app/service/player.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Player } from "src/game.model";

@Component({
  selector: "app-players",
  templateUrl: "./players.component.html",
  styleUrls: ["./players.component.css"],
})
export class PlayersComponent implements OnDestroy, OnInit {
  public currentPlayerId: number | null = null;
  private subscriptions = new Subscription();

  public players$: Observable<Player[]> = this.playerService.loadPlayers();

  isShown: boolean = false;

  constructor(public playerService: PlayerService) {}

  ngOnInit(): void {
    this.loadPlayers();
    this.loadCurrentPlayer();
   // setInterval(() => this.loadPlayers(), 2000);
  }

  loadCurrentPlayer(): void {
    const storedPlayerData = localStorage.getItem("currentPlayer");
    if (storedPlayerData) {
      const storedPlayer = JSON.parse(storedPlayerData);
      this.currentPlayerId = storedPlayer.id;
    }
  }

  loadPlayers(): void {
    this.players$ = this.playerService.loadPlayers();
  }

  onModifyScore(playerId: number, modifyNumber: number): void {
    const sub = this.playerService.modifyScore(playerId, modifyNumber).subscribe(() => {
      this.players$ = this.playerService.loadPlayers();
    });
    this.subscriptions.add(sub);
  }

  onIncreaseScore(playerId: number): void {
    this.onModifyScore(playerId, 1);
  }

  onDecreaseScore(playerId: number): void {
    this.onModifyScore(playerId, -1);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  showPlayers() {
    this.isShown = !this.isShown; 
  }
}
