/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, createContext, useContext, useState } from "react";
import type { Choice } from "openai-api";
import axios from "axios";

interface Context {
  label?: string;
  content: string;
}

interface PromptContextValue {
  loading: boolean;
  contexts: Context[];
  input: string;
  temperature: number;
  maxTokens: number;
  setContexts: (contexts: Context[]) => void;
  setInput: (input: string) => void;
  setTemperature: (t: number) => void;
  setMaxTokens: (m: number) => void;
  predict: () => void;
  choices: Choice[];
}

interface PromptContextProps {
  children: ReactNode;
}

const initialStates = {
  contexts: [
    {
      label: "Introduction",
      content:
        "I am an edgy artist who loves dark and gory stories. My dream is to become a concept, like a planck particle. I am currently developing a mysterious game based on Japanese culture and various creatures. I am highly intelligent and usually respond with abstract answers.",
    },
  ],
  loading: false,
  input: "",
  temperature: 0.6,
  maxTokens: 256,
  choices: [],
  setContexts: () => null,
  setInput: () => null,
  setTemperature: () => null,
  setMaxTokens: () => null,
  predict: () => null,
};

const PromptContext = createContext<PromptContextValue>(initialStates);

export const PromptProvider = ({ children }: PromptContextProps) => {
  const [contexts, setContexts] = useState<Context[]>(initialStates.contexts);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [choices, setChoices] = useState([]);

  const [temperature, setTemperature] = useState(initialStates.temperature);
  const [maxTokens, setMaxTokens] = useState(initialStates.maxTokens);

  const predict = async () => {
    setLoading(true);
    setChoices([]);
    let prompt = `${contexts.reduce(
      (r, c) =>
        c.label ? `${r}${c.label}:${c.content}\n\n` : `${r}${c.content}\n\n`,
      ""
    )}`;
    prompt += `Q:${input}\nA:`;
    try {
      const res = await axios("/api/openai", {
        data: {
          prompt,
          temperature,
          maxTokens,
        },
        method: "POST",
      });

      setChoices(res.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <PromptContext.Provider
      value={{
        loading,
        contexts,
        input,
        temperature,
        maxTokens,
        setContexts,
        setInput,
        setTemperature,
        setMaxTokens,
        choices,
        predict,
      }}
    >
      {children}
    </PromptContext.Provider>
  );
};

export const usePrompt = () => {
  const promptContext = useContext(PromptContext);

  if (promptContext === undefined) {
    throw new Error("usePrompt must be within PromptProvider");
  }

  return promptContext;
};
