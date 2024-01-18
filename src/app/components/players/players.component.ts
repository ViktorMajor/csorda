import { GameService } from 'src/app/service/game.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
})
export class PlayersComponent implements OnDestroy {
  private subscriptions = new Subscription();

  constructor(public gameService: GameService) {}

  onIncreaseScore(playerId: number): void {
    const sub = this.gameService.increaseScore(playerId).subscribe();
    this.subscriptions.add(sub);
  }

  onDecreaseScore(playerId: number): void {
    const sub = this.gameService.decreaseScore(playerId).subscribe();
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
