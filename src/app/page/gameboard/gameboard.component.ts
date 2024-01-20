import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-gameboard',
    templateUrl: './gameboard.component.html',
    styleUrls: ['./gameboard.component.css'],
})
export class GameboardComponent implements OnInit {
    constructor(private gameService: GameService, private router: Router) {}

    ngOnInit(): void {
        this.gameService.getRandomQuestionId().subscribe((id) => {
            const queryParams: Params = { questionId: id };
            this.router.navigate([], {
                queryParams,
            });
        });
    }

    deletePlayers(): void {
        this.gameService.deleteAllPlayers().subscribe({
            next: () => {},
        });
    }
    showWritePage() {
        this.router.navigate(['/write'], {
            queryParamsHandling: 'merge',
        });
    }
}
