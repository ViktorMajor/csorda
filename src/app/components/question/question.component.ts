import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';
import { GameService } from 'src/app/service/game.service';
import { Question } from 'src/game.model';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
    question: Question | null = null;

    constructor(
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

    nextRound() {
        this.gameService.refreshQuestion();
    }
}
