import { Component } from "@angular/core";
import { Player } from "src/game.model";
import { Router, Params } from "@angular/router";
import { PlayerService } from "src/app/service/player.service";
import { QuestionService } from "src/app/service/question.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private playerService: PlayerService,
    private questionService: QuestionService
  ) {}

  playerForm = new FormGroup({
    name: new FormControl("", Validators.required),
    score: new FormControl(0, Validators.required),
  });

  player: Player = { id: 0, name: "", score: 0, answer: "" };

  onSubmit(): void {
    if (this.playerForm.valid) {
      const newPlayer: Player = {
        id: Date.now(),
        name: this.playerForm.value.name ?? "",
        score: this.playerForm.value.score ?? 0,
        answer: "",
      };

      this.playerService.addPlayer(newPlayer).subscribe({
        next: (player) => {
          this.questionService.getNextQuestionId().subscribe((id) => {
            const queryParams: Params = { questionId: id };
            this.router.navigate(["/game"], { queryParams });
          });
          this.playerService.saveCurrentPlayer(player);
        },
      });
    }
  }
}
