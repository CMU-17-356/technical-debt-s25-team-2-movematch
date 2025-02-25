import axios from 'axios';

export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "Dominick and Sid and Eyob and Itamar";
  }

  // if (query.includes("largest")) {
  //   const numbers = query.match("/(\d+(\.\d+)?)/g");
  //   return toString(Math.max(..numbers));
  // }


  const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Ensure your API key is set in your environment variables
  const API_URL = 'https://api.openai.com/v1/chat/completions';

  interface ChatGPTResponse {
    id: string;
    object: string;
    created: number;
    choices: Array<{
      index: number;
      message: {
        role: string;
        content: string;
      };
      finish_reason: string;
    }>;
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  }

  async function sendQueryToChatGPT(query: string): Promise<string> {
    try {
      const response = await axios.post<ChatGPTResponse>(
        API_URL,
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: query },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      // Extract and return the response content
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error sending query to ChatGPT:', error);
      throw error;
    }
  }

  // Example usage:
  (async () => {
    const query = 'What is the capital of France?';
    const answer = await sendQueryToChatGPT(query);
    console.log('ChatGPT answer:', answer);
  })();

  return "";

}
