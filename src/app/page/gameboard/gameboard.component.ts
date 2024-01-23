import { Component, OnInit } from "@angular/core";
import { PlayerService } from "src/app/service/player.service";
import { Router } from "@angular/router";


@Component({
  selector: "app-gameboard",
  templateUrl: "./gameboard.component.html",
  styleUrls: ["./gameboard.component.css"],
})
export class GameboardComponent {
  constructor(private playerService: PlayerService, private router: Router) {}

  deletePlayers(): void {
    this.playerService.deleteAllPlayers().subscribe({
      next: () => {},
    });
  }
  showWritePage() {
    this.router.navigate(["/write"], {
      queryParamsHandling: "merge",
    });
  }
    backToLogin() { 
        this.router.navigate([""])
    }
}
