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
    private annswerService: AnswerService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(mergeMap((params) => this.questionService.getQuestionById(params["questionId"])))
      .subscribe((question) => (this.question = question));
  }

  onSubmit(): void {
    const storedPlayerData = localStorage.getItem("currentPlayer");
    if (!storedPlayerData) {
      console.error("player is not found");
      return;
    }
    const player = JSON.parse(storedPlayerData);
    const playerName = player.name;

    const answerText = this.answerInput.nativeElement.value;
    if (!answerText) {
      console.error("input is not found");
      return;
    }

    this.annswerService.getAnswers().subscribe((players) => {
      const existingPlayer = players.find((p) => p.name === playerName);
      if (existingPlayer) {
        existingPlayer.answer = answerText;
        this.annswerService.updateAnswer(existingPlayer).subscribe({
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
