import { Component, OnInit } from "@angular/core";
import { AnswerService } from "src/app/service/answer.service";
import { Router, NavigationEnd } from "@angular/router";
import { Player } from "src/game.model";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-answers",
  templateUrl: "./answers.component.html",
  styleUrls: ["./answers.component.css"],
})
export class AnswersComponent implements OnInit {
  players: Player[] = [];
  currentIndex: number = 0;
  displayedAnswers: Player[] = [];
  public currentPlayerName: string | null = null;

  constructor(private answerService: AnswerService, private router: Router) {}

  ngOnInit() {
    // setInterval(() => this.answerService.getAnswers().subscribe((data) => {
    //   this.players = data;
    // }), 2000);

    this.answerService.getAnswers().subscribe((data) => {
      this.players = data;
    });
    
    
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.displayedAnswers = [];
      this.currentIndex = 0;
    });
    this.loadCurrentPlayer();
  }

  showNextAnswer() {
    if (this.currentIndex < this.players.length) {
      this.displayedAnswers.push(this.players[this.currentIndex]);
      this.currentIndex++;
    }
    console.log("Displayed Answers:", this.displayedAnswers);
  }

  loadCurrentPlayer(): void {
    const storedPlayerData = localStorage.getItem("currentPlayer");
    if (storedPlayerData) {
      const storedPlayer = JSON.parse(storedPlayerData);
      this.currentPlayerName = storedPlayer.name;
      console.log("Current Player Name:", this.currentPlayerName);
    }
  }
}
