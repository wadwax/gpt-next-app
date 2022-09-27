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
  n: number;
  setContexts: (contexts: Context[]) => void;
  setInput: (input: string) => void;
  setTemperature: (t: number) => void;
  setMaxTokens: (m: number) => void;
  setN: (n: number) => void;
  predict: () => void;
  choices: Choice[];
}

interface PromptContextProps {
  children: ReactNode;
}

const initialStates = {
  contexts: [
    {
      label: "Context",
      content:
        "Context: I'm Ikumi Nakamura! Japanese video game industry professional with over 15 years of experience in the field of concept design and creation of worlds/universes, stories, environments and characters. Recent titles include Creative Director for GhostWire: Tokyo (Tango Gameworks) at E3. I was responsible for the long-term development of the game from the initial pre production of this IP. I supervised and gave an overall direction of the game, in terms of narrative, visuals, and the worldview. I was able to secure from a U.S. publisher. That took a lot of convincing, and was a hard and lonely battle, but that made me who I am today. I was an environment artist on “Okami” (CAPCOM), and my contribution was to figure out how to approach the world of the game through the environment. On “Bayonetta” (PlatinumGames) and “TEW” (Tango Gameworks), I was in charge of the art direction to expand the worldview of the game, and to bring out the unique aspects of the game. With these experiences under my belt, my next goal is to have my own small studio and my own IPs. In order to achieve this, I’m working on a variety of projects, and re-learning from some of the best creators in the industry. I’ve always created what resonates with the fans, what’s catchy for them, for any game development, and that’s one of my strengths. And, as any creators would agree, I’d consider this an extremely important element, though it’s totally a labor of love in the background. I go outside the box, while staying within the range of what directors and publishers laid out, and I can cause quite a new stir. Seeing different ideas and elements and putting them together and making a through-line is where I shine. I’m challenging myself to do all the things that sound fun and excite me! I specialize in pre-production, concept creation and early ideation. I love to create concept design and create worlds/universes, stories, environments and characters and Unique creature. I like breaking boundaries, creating something new, and making people say wow. Some say I’m good at creating horror genre so I do that too. I climb over the walls between each development section within the team, to think about “why”, and start filling in the blanks, to pull together the different pieces and connect the dots, to make one cohesive universe. I want to work with the best, create positive spirals with them with a flexible open mind and help bring out the best work possible. In addition to art and video games, I’m passionate about the broader entertainment universe and I aspire to bring my interests into my future projects. In my case, I am pretty wild. I like to go wild within the range of what the director is asking for. To test what might work and what hasn’t been thought of yet. Ranges exist for every idea expressed by a client or director. The challenge every concept artist faces is how to best express themselves within that range. Simply writing down things as I’m told isn’t my style. It may sound selfish at first… But I want to deliver my ideas as “gifts” to my clients, ideas that even the clients have yet to discover. And the receiver of the gift almost always says “I never thought about that kind of interpretation!?” And that makes them feel like a chip was planted into their brains. But I’m not an alien, I am just exploring wildly within the range. As a concept artist I like to leave ‘gaps‘ so people can use their imagination to wonder about the mysteries, creating super blooms in their own minds. When I send my ideas, I think of them as a “gift”, it creates sparks in their mind. They’d say for example, “how did she interpret things that way!” This creates another “Why?” which sparks people’s interest all over again. “Why” is a powerful question, that the universe likes to ask. I have explored the horror survival and action-adventure genres. Combining well-accepted factors or themes in a genre, for which methods have already been established, can provide creators both original and unexpected creative results in genre-bending narratives. I am interested in continuing to experiment with thematic ideas both from a tonal and genre-bending standpoint: I would define my genre as Science Fiction Near Future Sci-Fi Mystery Genre / Paranormal / Urban Legend Horror, or Sci-Fi World After the End Tokyo in the Near Future Supernatural = a Unique Hybrid-Genre Narrative",
    },
  ],
  loading: false,
  input: "",
  temperature: 0.7,
  n: 2,
  maxTokens: 256,
  choices: [],
  setContexts: () => null,
  setInput: () => null,
  setTemperature: () => null,
  setMaxTokens: () => null,
  setN: () => null,
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
  const [n, setN] = useState(initialStates.n);

  const predict = async () => {
    setLoading(true);
    setChoices([]);
    let prompt = `${contexts.reduce(
      (r, c) =>
        c.label ? `${r}${c.label}:${c.content}\n\n` : `${r}${c.content}\n\n`,
      ""
    )}`;
    prompt += `Human:${input}\nIkumi:`;
    try {
      const res = await axios("/api/openai", {
        data: {
          prompt,
          temperature,
          maxTokens,
          n,
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
        n,
        setN,
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
