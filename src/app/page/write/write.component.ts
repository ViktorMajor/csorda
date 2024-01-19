import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { GameService } from "src/app/service/game.service";

@Component({
  selector: "app-write",
  templateUrl: "./write.component.html",
  styleUrls: ["./write.component.css"],
})
export class WriteComponent {
  question: { id: number; text: string } | null = null;
  constructor(private router: Router, private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.currentQuestion$.subscribe((question) => {
      this.question = question;
    });
  }

  send() {
    this.router.navigate(["/game"]);
  }
}
