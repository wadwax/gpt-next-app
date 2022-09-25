import Tabs from "components/tabs";
import { PromptProvider } from "contexts/prompt";
import type { NextPage } from "next";
import Head from "next/head";
import Question from "components/question";
import Context from "components/context";

const tabs = [
  {
    label: "質問",
    content: <Question />,
  },
  {
    label: "文脈",
    content: <Context />,
  },
];

const HomePage: NextPage = () => {
  return (
    <div className="w-screen h-screen p-10 flex justify-center items-center">
      <Head>
        <title>GPT</title>
        <meta name="description" content="GPT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-3xl h-full">
        <div className="text-4xl">Ikumi Bot</div>
        <PromptProvider>
          <Tabs tabs={tabs} />
        </PromptProvider>
      </main>
    </div>
  );
};

export default HomePage;
