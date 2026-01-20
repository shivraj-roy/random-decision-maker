// Fun messages for the decision maker

export interface Response {
  title: string;
  subtitle: string;
}

export interface Message {
  text: string;
}

export const YES_RESPONSES: Response[] = [
  { title: "YES!", subtitle: "The universe approves. Go for it!" },
  { title: "ABSOLUTELY!", subtitle: "No question about it." },
  { title: "DO IT!", subtitle: "You won't regret this." },
  { title: "100% YES!", subtitle: "Trust the process." },
  { title: "YES!", subtitle: "The stars have aligned." },
  { title: "DEFINITELY!", subtitle: "This is your sign." },
  { title: "HECK YES!", subtitle: "Fortune favors the bold." },
  { title: "YES!", subtitle: "You've got this!" },
];

export const NO_RESPONSES: Response[] = [
  { title: "NOPE", subtitle: "Not today, friend." },
  { title: "NO", subtitle: "The spirits say no." },
  { title: "NOT NOW", subtitle: "Maybe another time." },
  { title: "HARD PASS", subtitle: "Save your energy." },
  { title: "NAH", subtitle: "Let this one go." },
  { title: "NO", subtitle: "Sleep on it instead." },
  { title: "PROBABLY NOT", subtitle: "Trust your gut." },
  { title: "NO WAY", subtitle: "The universe has spoken." },
];

export const THINKING_MESSAGES: Message[] = [
  { text: "Hmm, let me think..." },
  { text: "Consulting the universe..." },
  { text: "The answer is forming..." },
  { text: "Gathering cosmic energy..." },
  { text: "Shaking the magic 8-ball..." },
  { text: "Processing your destiny..." },
];

export const WHEEL_CELEBRATION: Message[] = [
  { text: "The wheel has spoken!" },
  { text: "Destiny has chosen!" },
  { text: "The universe picked!" },
  { text: "And the winner is..." },
  { text: "The chosen one!" },
  { text: "Fate has decided!" },
];

export const SPINNING_MESSAGES: Message[] = [
  { text: "Spinning..." },
  { text: "Round and round..." },
  { text: "Here we go..." },
];

export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
