import { useState } from "react";
import { Form, ActionPanel, Action, Detail, Icon } from "@raycast/api";
import {
  YES_RESPONSES,
  NO_RESPONSES,
  THINKING_MESSAGES,
  getRandomItem,
} from "./utils/messages";
import { addToHistory } from "./utils/storage";

type Phase = "input" | "thinking" | "result";

export default function DecideYesNo() {
  const [phase, setPhase] = useState<Phase>("input");
  const [question, setQuestion] = useState("");
  const [thinkingMessage, setThinkingMessage] = useState("");
  const [result, setResult] = useState<{ emoji: string; title: string; subtitle: string } | null>(null);
  const [isYes, setIsYes] = useState(false);

  const handleSubmit = async (values: { question: string }) => {
    if (!values.question.trim()) return;
    
    setQuestion(values.question);
    setPhase("thinking");
    
    // Dramatic thinking sequence
    let messageIndex = 0;
    setThinkingMessage(THINKING_MESSAGES[0]);
    
    const thinkingInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % THINKING_MESSAGES.length;
      setThinkingMessage(THINKING_MESSAGES[messageIndex]);
    }, 400);

    // After 2 seconds, reveal the answer
    setTimeout(async () => {
      clearInterval(thinkingInterval);
      
      const yes = Math.random() > 0.5;
      setIsYes(yes);
      const response = yes ? getRandomItem(YES_RESPONSES) : getRandomItem(NO_RESPONSES);
      setResult(response);
      setPhase("result");

      // Save to history
      await addToHistory({
        type: "yes-no",
        question: values.question,
        result: yes ? "YES" : "NO",
      });
    }, 2000);
  };

  const reset = () => {
    setPhase("input");
    setQuestion("");
    setResult(null);
  };

  // Input phase - ask the question
  if (phase === "input") {
    return (
      <Form
        actions={
          <ActionPanel>
            <Action.SubmitForm title="Ask the Universe" icon={Icon.Stars} onSubmit={handleSubmit} />
          </ActionPanel>
        }
      >
        <Form.TextField
          id="question"
          title="Your Question"
          placeholder="Should I..."
          info="Ask any yes/no question and let the universe decide!"
        />
      </Form>
    );
  }

  // Thinking phase - dramatic suspense
  if (phase === "thinking") {
    return (
      <Detail
        markdown={`
# ${thinkingMessage}

---

*"${question}"*

        `}
      />
    );
  }

  // Result phase - the answer!
  if (phase === "result" && result) {
    const color = isYes ? "🟢" : "🔴";
    return (
      <Detail
        markdown={`
# ${result.emoji} ${result.title}

## ${result.subtitle}

---

${color} **Your question:** *"${question}"*

        `}
        actions={
          <ActionPanel>
            <Action title="Ask Another Question" icon={Icon.RotateClockwise} onAction={reset} />
          </ActionPanel>
        }
      />
    );
  }

  return null;
}
