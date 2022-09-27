// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import OpenAI, { Choice } from "openai-api";
import type { NextApiRequest, NextApiResponse } from "next";

const openai = new OpenAI(process.env.OPENAI_API_KEY as string);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Choice[]>
) {
  const gptResponse = await openai.complete({
    engine: "davinci",
    prompt: req.body.prompt,
    maxTokens: req.body.maxTokens,
    temperature: req.body.temperature,
    topP: 1,
    presencePenalty: 0.3,
    frequencyPenalty: 0.5,
    bestOf: req.body.n,
    n: req.body.n,
    stop: ["Human:", "Ikumi:"],
  });
  res.status(200).json(gptResponse.data.choices);
}
