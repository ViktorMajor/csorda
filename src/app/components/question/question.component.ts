import { Component, OnInit } from "@angular/core";
import { GameService } from "src/app/service/game.service";
import { Question } from "src/game.model"; 

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"],
})
export class QuestionComponent implements OnInit {
  question: Question | null = null;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.currentQuestion$.subscribe((question: Question | null) => {
      this.question = question;
    });
  }

  nextRound() {
    this.gameService.refreshQuestion();
  }
}
