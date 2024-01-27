import { Component, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { mergeMap } from "rxjs";
import { QuestionService } from "src/app/service/question.service";
import { AnswerService } from "src/app/service/answer.service";

@Component({
  selector: "app-write",
  templateUrl: "./write.component.html",
  styleUrls: ["./write.component.css"],
})
export class WriteComponent {
  question: { id: number; text: string } | null = null;
  @ViewChild("answerInput") answerInput!: ElementRef;

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private activatedRoute: ActivatedRoute
  ) {}

  // Fetch the question based on the question ID from the URL query parameters
  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(mergeMap((params) => this.questionService.getQuestionById(params["questionId"])))
      .subscribe((question) => (this.question = question));
  }

  onSubmit(): void {
    // Retrieve the current player's data from local storage
    const storedPlayerData = localStorage.getItem("currentPlayer");
    if (!storedPlayerData) {
      console.error("player is not found");
      return;
    }
    const player = JSON.parse(storedPlayerData);
    const playerName = player.name;
    // Get the answer text from the input element
    const answerText = this.answerInput.nativeElement.value;
    if (!answerText) {
      console.error("input is not found");
      return;
    }
    // Fetch existing answers and update the current player's answer
    this.answerService.getAnswers().subscribe((players) => {
      const existingPlayer = players.find((p) => p.name === playerName);
      if (existingPlayer) {
        existingPlayer.answer = answerText;
        this.answerService.updateAnswer(existingPlayer).subscribe({
          next: () => {
            this.router.navigate(["/game"], {
              queryParamsHandling: "merge",
            });
          },
        });
      }
    });
  }
}
