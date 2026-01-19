import { useState, useEffect } from "react";
import { List, ActionPanel, Action, Icon, Alert, confirmAlert, Color } from "@raycast/api";
import { getHistory, clearHistory, Decision } from "./utils/storage";

export default function ViewHistory() {
  const [history, setHistory] = useState<Decision[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setIsLoading(true);
    const data = await getHistory();
    setHistory(data);
    setIsLoading(false);
  };

  const handleClearHistory = async () => {
    if (
      await confirmAlert({
        title: "Clear All History?",
        message: "This will delete all your past decisions. This cannot be undone.",
        primaryAction: { title: "Clear", style: Alert.ActionStyle.Destructive },
      })
    ) {
      await clearHistory();
      setHistory([]);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    } else if (diffDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getIcon = (decision: Decision) => {
    if (decision.type === "yes-no") {
      return {
        source: decision.result === "YES" ? Icon.CheckCircle : Icon.XMarkCircle,
        tintColor: decision.result === "YES" ? Color.Green : Color.Red,
      };
    }
    return { source: Icon.Star, tintColor: Color.Yellow };
  };

  return (
    <List isLoading={isLoading}>
      {history.length === 0 ? (
        <List.EmptyView
          title="No decisions yet"
          description="Start making decisions and they'll appear here!"
          icon={Icon.Clock}
        />
      ) : (
        <>
          <List.Section title={`Decision History (${history.length})`}>
            {history.map((decision) => (
              <List.Item
                key={decision.id}
                title={decision.type === "yes-no" ? decision.question : `Wheel: ${decision.result}`}
                subtitle={formatDate(decision.timestamp)}
                icon={getIcon(decision)}
                accessories={[
                  {
                    text: decision.result,
                    icon: decision.type === "wheel" ? Icon.Star : undefined,
                  },
                ]}
                actions={
                  <ActionPanel>
                    <Action.CopyToClipboard title="Copy Result" content={`${decision.question}: ${decision.result}`} />
                    <Action
                      title="Clear All History"
                      icon={Icon.Trash}
                      style={Action.Style.Destructive}
                      onAction={handleClearHistory}
                    />
                  </ActionPanel>
                }
              />
            ))}
          </List.Section>
        </>
      )}
    </List>
  );
}
