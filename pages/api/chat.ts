import { AxiosResponse } from "axios";
import { axios } from "./index";

const baseUrl = `/api/chat`;

export const sendChatMessage = async (message: string): Promise<string> => {
  try {
    const response: AxiosResponse = await axios({
      method: "POST",
      url: baseUrl,
      data: {
        userMessage: message,
      },
    });

    const answer: string = response.data;
    return answer;
  } catch (error) {
    throw error;
  }
};
