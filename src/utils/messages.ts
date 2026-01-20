// Fun messages for the decision maker

export interface Response {
  title: string;
  subtitle: string;
}

export interface Message {
  text: string;
}

export const YES_RESPONSES: Response[] = [
  { title: "OH YEAH!", subtitle: "The universe is doing a happy dance for you." },
  { title: "FULL SEND!", subtitle: "No brakes on this decision train." },
  { title: "GO GO GO!", subtitle: "Even your cat thinks it's a good idea." },
  { title: "YASSS!", subtitle: "Serving cosmic approval on a silver platter." },
  { title: "ABSOLUTELY!", subtitle: "The stars have aligned and they say: YES." },
  { title: "DO IT!", subtitle: "Your future self is already high-fiving you." },
  { title: "100% YES!", subtitle: "Trust the process. Victory is near." },
  { title: "BEYOND YES!", subtitle: "Fortune favors the bold. That's you." },
];

export const NO_RESPONSES: Response[] = [
  { title: "BIG NOPE.", subtitle: "Even the magic 8-ball is rolling its eyes." },
  { title: "HARD PASS.", subtitle: "My sensors indicate a 0% chance of fun." },
  { title: "COMPUTER SAYS NO.", subtitle: "Internal screaming intensifying. Avoid!" },
  { title: "CANCELLED.", subtitle: "This idea has been voted off the island." },
  { title: "NAH.", subtitle: "The spirits are currently out of office on this one." },
  { title: "NOT TODAY.", subtitle: "A glitch in the matrix says: Don't do it." },
  { title: "SLEEP ON IT.", subtitle: "Your gut says no. Listen to it." },
  { title: "ERROR 404.", subtitle: "Approval not found. Try again later." },
];

export const THINKING_MESSAGES: Message[] = [
  { text: "Consulting the oracle (and my lunch)..." },
  { text: "Recalibrating your destiny..." },
  { text: "Asking a random pigeon for advice..." },
  { text: "Charging suspension levels to 100%..." },
  { text: "Reading the tea leaves... wait, that's just dust." },
  { text: "Flipping a virtual coin through a digital wormhole..." },
];

export const WHEEL_CELEBRATION: Message[] = [
  { text: "THE WHEEL HAS CHOSEN!" },
  { text: "DRUMROLL PLEASE..." },
  { text: "TA-DA! Behold the winner!" },
  { text: "FATE HAS SEALED THE DEAL!" },
  { text: "LOOK WHO'S THE FAVORITE TODAY!" },
];

export const SPINNING_MESSAGES: Message[] = [
  { text: "Round and round we go!" },
  { text: "Defying the laws of physics..." },
  { text: "Hold your breath..." },
  { text: "Maximum suspense achieved!" },
];

export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
