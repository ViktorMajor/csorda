import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  question: { id: number; text: string } | null = null;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.getRandomQuestion().subscribe((question) => {
      this.question = question;
    });
  }
  nextRound() {
    this.gameService.getRandomQuestion().subscribe((question) => {
      this.question = question;
    });
  }
}