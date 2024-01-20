import { GameService } from 'src/app/service/game.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Player } from 'src/game.model';

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.css'],
})
export class PlayersComponent implements OnDestroy, OnInit {
    private subscriptions = new Subscription();

    public players$: Observable<Player[]> = this.gameService.loadPlayers();
    constructor(public gameService: GameService) {}

    ngOnInit(): void {
        this.gameService.loadPlayers();
    }
    onIncreaseScore(playerId: number): void {
        console.log('onIncreaseScore', playerId);
        const sub = this.gameService.increaseScore(playerId).subscribe(() => {
            this.players$ = this.gameService.loadPlayers();
        });
        this.subscriptions.add(sub);
    }

    onDecreaseScore(playerId: number): void {
        const sub = this.gameService.decreaseScore(playerId).subscribe(() => {
            this.players$ = this.gameService.loadPlayers();
        });
        this.subscriptions.add(sub);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
