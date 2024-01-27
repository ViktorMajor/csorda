import { Component } from "@angular/core";
import { Player } from "src/game.model";
import { Router, Params } from "@angular/router";
import { PlayerService } from "src/app/service/player.service";
import { QuestionService } from "src/app/service/question.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { switchMap } from "rxjs/operators";

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
  ) { }
  
  player: Player = { id: 0, name: "", score: 0, answer: "" };

  // FormGroup for handling player form data
  playerForm = new FormGroup({
    name: new FormControl("", Validators.required),
    score: new FormControl(0, Validators.required),
  });

  // Function to handle form submission
  onSubmit(): void {
    if (this.playerForm.valid) {
      const newPlayer: Player = {
        id: Date.now(),
        name: this.playerForm.value.name ?? "",
        score: this.playerForm.value.score ?? 0,
        answer: "",
      };

      this.playerService
        .addPlayer(newPlayer)
        .pipe(
          switchMap((player) => {
            this.playerService.saveCurrentPlayer(player);
            return this.questionService.getNextQuestionId();
          })
        )
        .subscribe((id) => {
          const queryParams: Params = { questionId: id };
          this.router.navigate(["/game"], { queryParams });
        });
    }
  }
}
