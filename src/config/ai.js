import config from './index.js';
import { OpenAI } from 'openai';

const aiClient = new OpenAI(config.apiKey);

const ai = async (aiPrompt ) => {
  const model = config.ai.apiKey;
  try {
    const response = await aiClient.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error(error);
    throw new Error(`AI request failed: ${error.message}`);
  }
};

export default ai;
