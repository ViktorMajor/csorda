import { Component } from '@angular/core';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css'],
})
export class GameboardComponent {
  constructor(private gameService: GameService) {}

  deletePlayers(): void {
    this.gameService.deleteAllPlayers().subscribe({
      next: () => {},
    });
  }
}
