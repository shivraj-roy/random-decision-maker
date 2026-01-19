// Fun messages for the decision maker
import { Icon } from "@raycast/api";

export const YES_RESPONSES = [
  { icon: Icon.CheckCircle, title: "YES!", subtitle: "The universe approves. Go for it!" },
  { icon: Icon.ThumbsUp, title: "ABSOLUTELY!", subtitle: "No question about it." },
  { icon: Icon.Rocket, title: "DO IT!", subtitle: "You won't regret this." },
  { icon: Icon.CheckRosette, title: "100% YES!", subtitle: "Trust the process." },
  { icon: Icon.BullsEye, title: "YES!", subtitle: "The stars have aligned." },
  { icon: Icon.Stars, title: "DEFINITELY!", subtitle: "This is your sign." },
  { icon: Icon.Bolt, title: "HECK YES!", subtitle: "Fortune favors the bold." },
  { icon: Icon.Star, title: "YES!", subtitle: "You've got this!" },
];

export const NO_RESPONSES = [
  { icon: Icon.XMarkCircle, title: "NOPE", subtitle: "Not today, friend." },
  { icon: Icon.Xmark, title: "NO", subtitle: "The spirits say no." },
  { icon: Icon.Clock, title: "NOT NOW", subtitle: "Maybe another time." },
  { icon: Icon.Stop, title: "HARD PASS", subtitle: "Save your energy." },
  { icon: Icon.Moon, title: "NAH", subtitle: "Let this one go." },
  { icon: Icon.MoonDown, title: "NO", subtitle: "Sleep on it instead." },
  { icon: Icon.QuestionMarkCircle, title: "PROBABLY NOT", subtitle: "Trust your gut." },
  { icon: Icon.MinusCircle, title: "NO WAY", subtitle: "The universe has spoken." },
];

export const THINKING_MESSAGES = [
  { icon: Icon.QuestionMarkCircle, text: "Hmm, let me think..." },
  { icon: Icon.Stars, text: "Consulting the universe..." },
  { icon: Icon.Wand, text: "The answer is forming..." },
  { icon: Icon.Star, text: "Gathering cosmic energy..." },
  { icon: Icon.CircleProgress, text: "Shaking the magic 8-ball..." },
  { icon: Icon.RotateClockwise, text: "Processing your destiny..." },
];

export const WHEEL_CELEBRATION = [
  { icon: Icon.Stars, text: "The wheel has spoken!" },
  { icon: Icon.BullsEye, text: "Destiny has chosen!" },
  { icon: Icon.Wand, text: "The universe picked!" },
  { icon: Icon.Gift, text: "And the winner is..." },
  { icon: Icon.Trophy, text: "The chosen one!" },
  { icon: Icon.Crown, text: "Fate has decided!" },
];

export const SPINNING_MESSAGES = [
  { icon: Icon.Star, text: "Spinning..." },
  { icon: Icon.RotateClockwise, text: "Round and round..." },
  { icon: Icon.CircleProgress, text: "Here we go..." },
];

export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
