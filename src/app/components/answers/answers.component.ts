import { Component, OnInit } from "@angular/core";
import { GameService } from "src/app/service/game.service";
import { Answer } from "src/game.model";

@Component({
  selector: "app-answers",
  templateUrl: "./answers.component.html",
  styleUrls: ["./answers.component.css"],
})
export class AnswersComponent implements OnInit {
  answers: Answer[] = [];
  currentIndex: number = 0;
  displayedAnswers: Answer[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.getAnswers().subscribe((data) => {
      this.answers = data;
    });
  }

  showNextAnswer() {
    if (this.currentIndex < this.answers.length) {
      this.displayedAnswers.push(this.answers[this.currentIndex]);
      this.currentIndex++;
    }
  }
}
