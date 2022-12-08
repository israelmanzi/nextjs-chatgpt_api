// const OpenAI = require('openai-api');
// const openai = new OpenAI(process.env.OPENAI_API_KEY);

// export default async (req, res) => {
//   const beforePrompt = ``;
//   const afterPrompt = ``;

//   const breakPoint = `\n\n'''\n\n`;

//   const prompt1 = `Write a detailed blog for ${req.body.topic}`;
//   const prompt = `${beforePrompt} ${breakPoint} ${req.body.topic} ${breakPoint} ${afterPrompt}`;

//   console.log(`Prompt: ${prompt}`);

//   const gptResponse = await openai.complete({
//     engine: 'text-davinci-003',
//     prompt: prompt1,
//     maxTokens: 1500,
//     temperature: 0.7,
//     topP: 1,
//     presencePenalty: 0,
//     frequencyPenalty: 0.5,
//     bestOf: 1,
//     n: 1,
//   });

//   console.log('Best vaiable response:', gptResponse.data);

//   res.status(200).json({
//     text: `${gptResponse.data.choices[0].text}`,
//     topic: `${prompt}`,
//     model: gptResponse.data.choices[0].engine,
//   });
// };

const OpenAI = require('openai-api');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async (req, res) => {
  let prompt = `Artist: ${req.search}\n\nLyrics:\n`;
  const gptResponse = await openai.complete({
    engine: 'davinci',
    prompt: prompt,
    maxTokens: 50,
    temperature: 0.7,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0.5,
    bestOf: 1,
    n: 1,
  });

  res.status(200).json({ text: `${gptResponse.data.choices[0].text}` });
};
