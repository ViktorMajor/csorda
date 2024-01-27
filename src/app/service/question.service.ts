import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Question } from "src/game.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class QuestionService {
  private questionsUrl = " http://localhost:3000/questions"; // URL of the backend API for players
  // private questionsUrl = " http://192.168.1.179:3000/questions"; // Alternative URL for the backend API

  constructor(private http: HttpClient) {}
  private currentId = 0;

  // Retrieves the next question ID based on the current ID
  public getNextQuestionId(): Observable<number> {
    return this.http.get<Question[]>(this.questionsUrl).pipe(
      map((questions) => {
        // Calculate the ID of the next question using a prime number to avoid repetition
        this.currentId = (this.currentId + 103) % questions.length;
        return this.currentId;
      })
    );
  }
  // Retrieves a specific question by its ID from the server
  public getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.questionsUrl}/${id}`);
  }
}
