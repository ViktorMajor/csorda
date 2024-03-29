import { PlayerService } from "src/app/service/player.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription, combineLatest, of } from "rxjs";
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
    // setInterval(() => this.loadPlayers(), 2000); // TODO! attempt to constantly update the data
  }

  // Load the current player's data from local storage
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
  // Function to modify a player's score
  onModifyScore(playerId: number, modifyNumber: number): void {
    const updatedPlayer$ = this.playerService.modifyScore(playerId, modifyNumber);
    combineLatest([this.players$, updatedPlayer$]).subscribe(([players, player]) => {
      const index = players.findIndex((p) => p.id === player.id);
      players[index] = player;
      this.players$ = of(players);
    });
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
  // Toggle the visibility of the players
  showPlayers() {
    this.isShown = !this.isShown;
  }
}
