import { axios } from "./index";

const baseUrl = `/api/chat`;

export const sendChatMessage = async (message: string): Promise<string> => {
  try {
    const response: object = await axios({
      method: "POST",
      url: baseUrl,
      data: {
        userMessage: message,
      },
    });

    const answer: string = response.data;
    console.log(answer);
    return answer;
  } catch (error) {
    throw error;
  }
};
