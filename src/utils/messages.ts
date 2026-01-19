// Fun messages for the decision maker

export const YES_RESPONSES = [
  { emoji: "✅", title: "YES!", subtitle: "The universe approves. Go for it!" },
  { emoji: "👍", title: "ABSOLUTELY!", subtitle: "No question about it." },
  { emoji: "🚀", title: "DO IT!", subtitle: "You won't regret this." },
  { emoji: "💯", title: "100% YES!", subtitle: "Trust the process." },
  { emoji: "🎯", title: "YES!", subtitle: "The stars have aligned." },
  { emoji: "✨", title: "DEFINITELY!", subtitle: "This is your sign." },
  { emoji: "🔥", title: "HECK YES!", subtitle: "Fortune favors the bold." },
  { emoji: "💪", title: "YES!", subtitle: "You've got this!" },
];

export const NO_RESPONSES = [
  { emoji: "❌", title: "NOPE", subtitle: "Not today, friend." },
  { emoji: "🙅", title: "NO", subtitle: "The spirits say no." },
  { emoji: "⏰", title: "NOT NOW", subtitle: "Maybe another time." },
  { emoji: "🛑", title: "HARD PASS", subtitle: "Save your energy." },
  { emoji: "😴", title: "NAH", subtitle: "Let this one go." },
  { emoji: "🌙", title: "NO", subtitle: "Sleep on it instead." },
  { emoji: "🤔", title: "PROBABLY NOT", subtitle: "Trust your gut." },
  { emoji: "⛔", title: "NO WAY", subtitle: "The universe has spoken." },
];

export const THINKING_MESSAGES = [
  "🤔 Hmm, let me think...",
  "✨ Consulting the universe...",
  "🔮 The answer is forming...",
  "🌟 Gathering cosmic energy...",
  "🎱 Shaking the magic 8-ball...",
  "🌀 Processing your destiny...",
];

export const WHEEL_CELEBRATION = [
  "🎉 The wheel has spoken!",
  "🎯 Destiny has chosen!",
  "✨ The universe picked!",
  "🎊 And the winner is...",
  "🏆 The chosen one!",
  "🌟 Fate has decided!",
];

export const SPINNING_MESSAGES = [
  "🎰 Spinning...",
  "🌀 Round and round...",
  "🎡 Here we go...",
];

export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
