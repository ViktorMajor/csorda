import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameboardComponent } from './page/gameboard/gameboard.component';
import { LoginComponent } from './page/login/login.component';
import { WriteComponent } from './page/write/write.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "game", component: GameboardComponent },
  { path: "write", component: WriteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
