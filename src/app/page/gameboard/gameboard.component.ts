import { Component } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-gameboard",
  templateUrl: "./gameboard.component.html",
  styleUrls: ["./gameboard.component.css"],
})
export class GameboardComponent {
  constructor(private gameService: GameService, private router: Router) { }
  

  deletePlayers(): void {
    this.gameService.deleteAllPlayers().subscribe({
      next: () => {},
    });
  }
  showWritePage() {
    this.router.navigate(["/write"]);
  }
}
