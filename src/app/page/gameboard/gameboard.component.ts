import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-gameboard",
  templateUrl: "./gameboard.component.html",
  styleUrls: ["./gameboard.component.css"],
})
export class GameboardComponent {
  constructor(private router: Router) {}

  showWritePage() {
    this.router.navigate(["/write"], {
      queryParamsHandling: "merge",
    });
  }
}
