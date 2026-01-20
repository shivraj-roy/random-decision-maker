// Fun messages for the decision maker

export interface Response {
  title: string;
  subtitle: string;
}

export interface Message {
  text: string;
}

export const YES_RESPONSES: Response[] = [
  { title: "YES! 🎉", subtitle: "The universe is doing backflips! GO FOR IT!" },
  { title: "ABSOLUTELY! ✨", subtitle: "The cosmos just threw a party in your honor!" },
  { title: "DO IT! 🚀", subtitle: "Your future self will high-five you for this!" },
  { title: "100% YES! 💯", subtitle: "The universe just sent you a cosmic thumbs up!" },
  { title: "YES! 🌟", subtitle: "The stars are literally doing the cha-cha slide!" },
  { title: "DEFINITELY! 🎯", subtitle: "This is your sign! The universe is pointing at you!" },
  { title: "HECK YES! 🔥", subtitle: "Fortune is doing cartwheels for you right now!" },
  { title: "YES! 💪", subtitle: "You've got this! The universe believes in you!" },
  { title: "YASSS! 🎊", subtitle: "The cosmic cheerleaders are going wild!" },
  { title: "YOU BET! 🌈", subtitle: "The universe just painted a rainbow for you!" },
];

export const NO_RESPONSES: Response[] = [
  { title: "NOPE 🙅‍♂️", subtitle: "The universe is shaking its head. Try again later!" },
  { title: "NO 🚫", subtitle: "The cosmic forces are blocking this path!" },
  { title: "NOT NOW ⏰", subtitle: "The universe needs more coffee. Check back later!" },
  { title: "HARD PASS 🙅‍♀️", subtitle: "Your guardian angel just facepalmed. Save your energy!" },
  { title: "NAH 🤷", subtitle: "The universe is shrugging. Let this one go!" },
  { title: "NO 😴", subtitle: "The cosmos is taking a nap. Sleep on it instead!" },
  { title: "PROBABLY NOT 🤔", subtitle: "Your gut feeling just called. It's not feeling it!" },
  { title: "NO WAY 🌪️", subtitle: "The universe just slammed the door on this one!" },
  { title: "NOT TODAY 🌧️", subtitle: "The cosmic weather report says: stay inside!" },
];

export const THINKING_MESSAGES: Message[] = [
  { text: "🤔 Hmm, let me consult the cosmic oracle..." },
  { text: "🔮 The universe is thinking... this could take a moment..." },
  { text: "🌌 Gathering answers from across the multiverse..." },
  { text: "⚡ Charging up the cosmic energy cells..." },
  { text: "🎱 Shaking the magic 8-ball of destiny..." },
  { text: "🧠 Processing your fate through the cosmic computer..." },
  { text: "🌟 The stars are aligning... almost there..." },
  { text: "🔍 Scanning the universe for your answer..." },
];

export const WHEEL_CELEBRATION: Message[] = [
  { text: "🎡 The wheel has spoken! Bow to its wisdom!" },
  { text: "🎊 Destiny has chosen! The universe celebrates!" },
  { text: "🌟 The universe picked! Cosmic confetti time!" },
  { text: "🏆 And the winner is... *drumroll please*..." },
  { text: "✨ The chosen one! The cosmos approves!" },
  { text: "🎯 Fate has decided! The cosmic dart hit its mark!" },
  { text: "🎉 The wheel gods have spoken! All hail!" },
];

export const SPINNING_MESSAGES: Message[] = [
  { text: "🌀 Spinning the cosmic wheel..." },
  { text: "🎪 Round and round it goes..." },
  { text: "🚀 Here we go... to infinity and beyond!" },
  { text: "🌪️ Spinning faster than a black hole..." },
  { text: "🎡 The wheel is doing its thing..." },
];

export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
