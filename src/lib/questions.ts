export interface Option {
  label: string;
  type: 'snake' | 'loyal' | 'slight_snake' | 'neutral';
  points: number;
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Your friend sends you their assignment before deadline…",
    options: [
      { label: "Submit exactly same 😏", type: 'snake', points: 2 },
      { label: "Change it + say thanks", type: 'loyal', points: 2 },
      { label: "Ignore and panic 😅", type: 'neutral', points: 0 },
    ],
  },
  {
    id: 2,
    question: "In a group project…",
    options: [
      { label: "Do nothing but take credit 😎", type: 'snake', points: 2 },
      { label: "Do your part honestly", type: 'loyal', points: 2 },
      { label: "Do all work but complain later 😅", type: 'neutral', points: 0 },
    ],
  },
  {
    id: 3,
    question: "Friend shares a secret…",
    options: [
      { label: "Tell others for fun 😂", type: 'snake', points: 2 },
      { label: "Keep it safe", type: 'loyal', points: 2 },
      { label: "Hint indirectly 👀", type: 'snake', points: 2 },
    ],
  },
  {
    id: 4,
    question: "You prepared well for the exam…",
    options: [
      { label: "Help others revise", type: 'loyal', points: 2 },
      { label: "Misguide competitors 😈", type: 'snake', points: 2 },
      { label: "Stay silent 😅", type: 'neutral', points: 0 },
    ],
  },
  {
    id: 5,
    question: "You have complete class notes…",
    options: [
      { label: "Share with everyone", type: 'loyal', points: 2 },
      { label: "Sell notes 💰", type: 'snake', points: 2 },
      { label: "Share partially 😏", type: 'slight_snake', points: 1 },
    ],
  },
];
