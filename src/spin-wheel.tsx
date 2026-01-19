import { useState, useEffect, useRef } from "react";
import {
  ActionPanel,
  Action,
  Icon,
  Form,
  Detail,
} from "@raycast/api";
import {
  WHEEL_CELEBRATION,
  SPINNING_MESSAGES,
  getRandomItem,
} from "./utils/messages";
import { addToHistory, getPresets, savePreset, WheelPreset } from "./utils/storage";

// Simple robust ID generator to avoid any crypto issues
const generateId = () => Math.random().toString(36).substring(2, 15) + Date.now().toString(36);

type Phase = "setup" | "spinning" | "result";

interface OptionField {
  id: string;
  value: string;
}

export default function SpinWheel() {
  const [fields, setFields] = useState<OptionField[]>([
    { id: generateId(), value: "" },
    { id: generateId(), value: "" },
  ]);
  
  // Use Ref to track values WITHOUT triggering re-renders on every keystroke
  const valuesRef = useRef<Record<string, string>>({});
  const [newFieldId, setNewFieldId] = useState<string | null>(null);
  
  const [phase, setPhase] = useState<Phase>("setup");
  const [currentDisplay, setCurrentDisplay] = useState("");
  const [winner, setWinner] = useState("");
  const [celebration, setCelebration] = useState("");
  const [presets, setPresets] = useState<WheelPreset[]>([]);

  useEffect(() => {
    loadPresets();
  }, []);

  const loadPresets = async () => {
    const loaded = await getPresets();
    setPresets(loaded);
  };

  const syncRefToState = () => {
    return fields.map(f => ({
      ...f,
      value: valuesRef.current[f.id] || ""
    }));
  };

  const handleAddField = () => {
    const synced = syncRefToState();
    const id = generateId();
    setFields([...synced, { id, value: "" }]);
    setNewFieldId(id);
  };

  const handleClearAll = () => {
    valuesRef.current = {};
    setFields([
      { id: generateId(), value: "" },
      { id: generateId(), value: "" },
    ]);
    setNewFieldId(null);
  };

  const handleBackToSetup = () => {
    // Current values from ref
    const synced = syncRefToState();
    const cleaned = synced.filter((f) => f.value.trim() !== "");
    
    while (cleaned.length < 2) {
      cleaned.push({ id: generateId(), value: "" });
    }
    
    setFields(cleaned);
    setPhase("setup");
    setNewFieldId(null);
  };

  const handleSubmit = async (values: Record<string, string>) => {
    const validOptions = Object.values(values)
      .map((v) => v.trim())
      .filter((v) => v !== "");

    if (validOptions.length < 2) return;

    setPhase("spinning");
    setCurrentDisplay(getRandomItem(SPINNING_MESSAGES));

    let spinCount = 0;
    const totalSpins = 20 + Math.floor(Math.random() * 10);
    
    const spinInterval = setInterval(() => {
      const randomOption = validOptions[Math.floor(Math.random() * validOptions.length)];
      setCurrentDisplay(`🎰 ${randomOption}`);
      spinCount++;

      if (spinCount >= totalSpins) {
        clearInterval(spinInterval);
        
        const winningOption = validOptions[Math.floor(Math.random() * validOptions.length)];
        setWinner(winningOption);
        setCelebration(getRandomItem(WHEEL_CELEBRATION));
        setPhase("result");

        addToHistory({
          type: "wheel",
          question: "Spin the Wheel",
          options: validOptions,
          result: winningOption,
        });
      }
    }, 100);
  };

  const handleSavePreset = (values: Record<string, string>) => {
    const validOptions = Object.values(values)
      .map((v) => v.trim())
      .filter((v) => v !== "");

    if (validOptions.length < 2) return;
    savePreset(`Wheel ${new Date().toLocaleDateString()}`, validOptions).then(() => loadPresets());
  };

  if (phase === "spinning") {
    return (
      <Detail
        markdown={`# 🎡 SPINNING THE WHEEL!\n\n---\n\n## ${currentDisplay}\n\n---\n\n*Hold tight...*`}
      />
    );
  }

  if (phase === "result") {
    return (
      <Detail
        markdown={`# ${celebration}\n\n---\n\n## 🏆 ${winner}\n\n---\n\n*The wheel has spoken!*`}
        actions={
          <ActionPanel>
            <Action title="Back to Setup" icon={Icon.RotateClockwise} onAction={handleBackToSetup} />
          </ActionPanel>
        }
      />
    );
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="🎰 Spin the Wheel!" icon={Icon.Star} onSubmit={handleSubmit} />
          <Action title="Add More Options" icon={Icon.Plus} onAction={handleAddField} shortcut={{ modifiers: ["cmd"], key: "n" }} />
          <Action.SubmitForm title="Save as Preset" icon={Icon.SaveDocument} onSubmit={handleSavePreset} />
          <Action title="Clear All" icon={Icon.Trash} style={Action.Style.Destructive} onAction={handleClearAll} shortcut={{ modifiers: ["cmd", "shift"], key: "delete" }} />
          
          <ActionPanel.Section title="Presets">
            {presets.map((preset) => (
              <Action
                key={preset.id}
                title={`Load: ${preset.name}`}
                icon={Icon.Download}
                onAction={() => {
                  const newFields = preset.options.map(opt => ({ id: generateId(), value: opt }));
                  setFields(newFields);
                  // Populate ref
                  valuesRef.current = {};
                  newFields.forEach(f => valuesRef.current[f.id] = f.value);
                  setNewFieldId(null);
                }}
              />
            ))}
          </ActionPanel.Section>
        </ActionPanel>
      }
    >
      <Form.Description text="Enter your options below. Use Cmd+N to add more fields!" />
      {fields.map((field, index) => (
        <Form.TextField
          key={field.id}
          id={field.id}
          title={`Option ${index + 1}`}
          placeholder="What's an option?"
          defaultValue={field.value}
          autoFocus={newFieldId ? field.id === newFieldId : index === 0}
          onChange={(val) => {
            valuesRef.current[field.id] = val;
          }}
        />
      ))}
    </Form>
  );
}
