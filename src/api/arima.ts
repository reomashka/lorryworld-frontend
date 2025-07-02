const API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta";
const API_KEY = "AIzaSyD7Ma_WH1WtdywdmE3MoYmHexXKqNUmdcs";
const MODEL = "gemini-2.5-flash-preview-04-17";

interface Message {
  role: "user" | "model";
  content: string;
}

interface StreamChatCompletionProps {
  messages: Message[];
  onChunk: (chunk: string) => void;
  onError: (error: unknown) => void;
  onComplete: () => void;
}

const transformMessagesToGeminiFormat = (messages: Message[]) =>
  messages.map((message) => ({
    role: message.role,
    parts: [{ text: message.content }],
  }));

const generationConfig = {
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 2048,
};

export const streamChatCompletion = async ({
  messages,
  onChunk,
  onError,
  onComplete,
}: StreamChatCompletionProps) => {
  if (!API_KEY) throw new Error("API key is missing");

  try {
    const response = await fetch(
      `${API_BASE_URL}/models/${MODEL}:streamGenerateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: transformMessagesToGeminiFormat(messages),
          generationConfig,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error?.message || "Failed to get response");
    }

    if (!response.body) {
      throw new Error("No response body");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let done = false;
    let accumulatedResponse = "";
    let buffer = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;

      if (done) {
        onComplete();
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;

      try {
        let startPos = 0;
        let endPos = 0;

        while ((startPos = buffer.indexOf("{", endPos)) !== -1) {
          let openBraces = 1;
          let pos = startPos + 1;

          while (pos < buffer.length && openBraces > 0) {
            if (buffer[pos] === "{") openBraces++;
            else if (buffer[pos] === "}") openBraces--;
            pos++;
          }

          if (openBraces === 0) {
            endPos = pos;
            const jsonStr = buffer.substring(startPos, endPos);

            try {
              const parsedChunk = JSON.parse(jsonStr);
              const content =
                parsedChunk.candidates?.[0]?.content?.parts?.[0]?.text || "";

              if (content) {
                accumulatedResponse += content;
                onChunk(content);
              }
            } catch (e) {
              console.error("Error parsing JSON object:", e);
            }
          } else {
            break;
          }
        }
        if (endPos > 0) {
          buffer = buffer.substring(endPos);
        }
      } catch (e) {
        console.error("Error processing buffer:", e);
      }
    }

    return accumulatedResponse;
  } catch (error) {
    if (error instanceof Error) {
      onError(error);
    } else {
      onError(new Error("Unknown error occurred"));
    }
    return "";
  }
};

export const getChatCompletion = async (messages: Message[]) => {
  if (!API_KEY) throw new Error("API key is missing");

  try {
    const response = await fetch(
      `${API_BASE_URL}/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: transformMessagesToGeminiFormat(messages),
          generationConfig,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error?.message || "Failed to get response");
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  } catch (error) {
    console.error("Error in getChatCompletion:", error);
    throw error;
  }
};
