import { useState } from "react";
import { Form, ActionPanel, Action, Detail, Icon, Color } from "@raycast/api";
import { YES_RESPONSES, NO_RESPONSES, THINKING_MESSAGES, getRandomItem, Response, Message } from "./utils/messages";
import { addToHistory } from "./utils/storage";

type Phase = "input" | "thinking" | "result";

export default function DecideYesNo() {
  const [phase, setPhase] = useState<Phase>("input");
  const [question, setQuestion] = useState("");
  const [thinkingMessage, setThinkingMessage] = useState<Message | null>(null);
  const [result, setResult] = useState<Response | null>(null);
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

    // After 3 seconds, reveal the answer
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
    }, 3000);
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
  if (phase === "thinking" && thinkingMessage) {
    return (
      <Detail
        isLoading={true}
        navigationTitle="Thinking..."
        markdown={`# ${thinkingMessage.text}\n\n---\n\n*"${question}"*`}
        metadata={
          <Detail.Metadata>
            <Detail.Metadata.Label title="Status" text="Processing" icon={Icon.CircleProgress} />
          </Detail.Metadata>
        }
      />
    );
  }

  // Result phase - the answer!
  if (phase === "result" && result) {
    return (
      <Detail
        navigationTitle={result.title}
        markdown={`# ${result.title}\n\n## ${result.subtitle}`}
        metadata={
          <Detail.Metadata>
            <Detail.Metadata.Label
              title="Answer"
              text={isYes ? "YES" : "NO"}
              icon={{
                source: isYes ? Icon.CheckCircle : Icon.XMarkCircle,
                tintColor: isYes ? Color.Green : Color.Red,
              }}
            />
            <Detail.Metadata.Separator />
            <Detail.Metadata.Label title="Question" text={question} />
          </Detail.Metadata>
        }
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
