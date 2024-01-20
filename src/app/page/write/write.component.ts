import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { GameService } from 'src/app/service/game.service';

@Component({
    selector: 'app-write',
    templateUrl: './write.component.html',
    styleUrls: ['./write.component.css'],
})
export class WriteComponent {
    question: { id: number; text: string } | null = null;
    constructor(
        private router: Router,
        private gameService: GameService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.activatedRoute.queryParams
            .pipe(
                mergeMap((params) =>
                    this.gameService.getQuestionById(params['questionId'])
                )
            )
            .subscribe((question) => (this.question = question));
    }

    send() {
        this.router.navigate(['/game']);
    }
}
