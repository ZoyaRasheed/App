import config from './index.js';
import { OpenAI } from 'openai';

const aiClient = new OpenAI({ apiKey: config.ai.apiKey, baseURL: config.ai.baseURL });

const ai = async (systemPrompt, userPrompt) => {
  const model = config.ai.model;
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
    throw new Error(`AI request failed: ${error.message}`);
  }
};

export default ai;
