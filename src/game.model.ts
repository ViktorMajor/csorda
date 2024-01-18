export interface Player {
  id: number;
  text: string;
  score: number;
}
export interface Question {
  id: number;
  text: string;
}
export interface Answer {
  player: string;
  answer: string;
}
