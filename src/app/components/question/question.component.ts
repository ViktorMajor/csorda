import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { QuestionService } from "src/app/service/question.service";
import { Question } from "src/game.model";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"],
})
export class QuestionComponent implements OnInit {
  question: Question | null = null;

  constructor(
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  // Subscribe to query parameters
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params["questionId"]) {
        this.questionService
          .getQuestionById(params["questionId"])
          .subscribe((question) => (this.question = question));
      }
    });
  }

  // Function to navigate to the next question
  nextRound() {
    this.questionService.getNextQuestionId().subscribe((id) => {
      const queryParams: Params = { questionId: id };
      this.router.navigate([], { queryParams });
    });
  }
}
