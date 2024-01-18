import { Component } from '@angular/core';
import { Player } from 'src/game.model';
import { Router } from '@angular/router';
import { GameService } from 'src/app/service/game.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router, private gameService: GameService) {}

  playerForm = new FormGroup({
    text: new FormControl('', Validators.required),
    score: new FormControl(0, Validators.required),
  });

  player: Player = { id: 0, text: '', score: 0 };

  onSubmit(): void {
    if (this.playerForm.valid) {
      const newPlayer: Player = {
        id: Date.now(),
        text: this.playerForm.value.text ?? '',
        score: this.playerForm.value.score ?? 0,
      };

      this.gameService.addPlayer(newPlayer).subscribe({
        next: () => {
          this.router.navigate(['/game']);
        },
        error: (error) => {
          console.error('Error adding player:', error);
        },
      });
    }
  }
}
