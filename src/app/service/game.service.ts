import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Player, Question, Answer } from 'src/game.model';
import { map, tap, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    private playerUrl = 'http://localhost:3000/players';
    private questionsUrl = 'http://localhost:3000/questions';
    private answersUrl = ' http://localhost:3000/answers';

    private currentQuestionSubject = new BehaviorSubject<Question | null>(null);

    constructor(private http: HttpClient) {}

    loadPlayers(): Observable<Player[]> {
        return this.http
            .get<Player[]>(this.playerUrl)
            .pipe(map((players) => players.sort((a, b) => b.score - a.score)));
    }

    //TODO
    getPlayerById(name: string): Observable<Player> {
        return this.http.get<Player>(`${this.playerUrl}/${name}`);
    }

    isPlayerPresent(name: string): Observable<boolean> {
        return of(true);
    }

    saveCurrentUser(player: Player): void {
        // save into local storage
    }

    getCurrentUser(): Player | null {
        return null;
    }

    saveAnswer(answer: Answer, payer: Player): Observable<void> {
       return of();
    } 

    // get random ID from questions
    public getRandomQuestionId(): Observable<number> {
        return this.http.get<Question[]>(this.questionsUrl).pipe(
            map(
                (questions) =>
                    questions[Math.floor(Math.random() * questions.length)]
            ),
            map((question) => question.id)
        );
    }

    public getQuestionById(id: number): Observable<Question> {
        return this.http.get<Question>(`${this.questionsUrl}/${id}`);
    }
    private loadRandomQuestion(): void {
        this.http
            .get<Question[]>(this.questionsUrl)
            .pipe(
                map(
                    (questions) =>
                        questions[Math.floor(Math.random() * questions.length)]
                )
            )
            .subscribe((question) => {
                this.currentQuestionSubject.next(question);
            });
    }

    refreshQuestion(): void {
        this.loadRandomQuestion();
    }

    increaseScore(playerId: number): Observable<Player> {
        return this.http.get<Player>(`${this.playerUrl}/${playerId}`).pipe(
            switchMap((player) => {
                const newScore = player.score + 1;
                console.log('newScore', newScore);
                const players: Player = {
                    ...player,
                    score: newScore,
                };
                return this.updatePayer(players);
            })
        );
    }

    updatePayer(player: Player): Observable<Player> {
        return this.http.put<Player>(`${this.playerUrl}/${player.id}`, player);
    }

    decreaseScore(playerId: number): Observable<Player> {
        return this.http.get<Player>(`${this.playerUrl}/${playerId}`).pipe(
            switchMap((player) => {
                const newScore = player.score - 1;
                const players: Player = {
                    ...player,
                    score: newScore,
                };
                return this.updatePayer(players);
            })
        );
    }

    private updatePlayersSubject(updatedPlayer: Player): void {
        // this.playersSubject.next(
        //     this.playersSubject.value.map((p) =>
        //         p.id === updatedPlayer.id ? updatedPlayer : p
        //     )
        // );
    }

    deleteAllPlayers(): Observable<void[]> {
        return this.http.get<Player[]>(this.playerUrl).pipe(
            switchMap((players) => {
                const deleteRequests = players.map((player) =>
                    this.http.delete<void>(`${this.playerUrl}/${player.id}`)
                );
                return forkJoin(deleteRequests);
            }),
            tap(() => {
                // this.playersSubject.next([]);
            })
        );
    }

    addPlayer(newPlayer: Player): Observable<Player> {
        return this.http.post<Player>(this.playerUrl, newPlayer).pipe(
            tap((player: Player) => {
                this.updatePlayersAfterAddition(player);
            })
        );
    }

    private updatePlayersAfterAddition(newPlayer: Player): void {
        // this.playersSubject.next([...this.playersSubject.value, newPlayer]);
    }

    getAnswers(): Observable<Answer[]> {
        return this.http.get<Answer[]>(this.answersUrl);
    }
}
