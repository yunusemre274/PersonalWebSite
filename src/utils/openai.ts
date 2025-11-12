// Placeholder for OpenAI integration
// We'll implement this in Stage 4. Keep a simple typed wrapper here.

export type OpenAIResponse = {
  id?: string;
  text?: string;
};

export const sendToOpenAI = async (prompt: string): Promise<OpenAIResponse> => {
  // will use fetch or openai SDK later
  return { text: `Echo: ${prompt}` };
};
