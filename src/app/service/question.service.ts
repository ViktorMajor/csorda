import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Question } from "src/game.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class QuestionService {
  private questionsUrl = "http://localhost:3000/questions";

  constructor(private http: HttpClient) {}
  private currentId = 0;
  
  public getRandomQuestionId(): Observable<number> {
    return this.http.get<Question[]>(this.questionsUrl).pipe(
      map((questions) => {
        this.currentId = (this.currentId + 101) % questions.length;
        return this.currentId;
      })
    );
  }

 

  public getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.questionsUrl}/${id}`);
  }
}