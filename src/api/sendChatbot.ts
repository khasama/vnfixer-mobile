import api from "../configs/axios.config";

const sendChatbot = async (question: string) => {
  try {
    const res = await api.post(`/chatbot/ask`, { question });
    if (res.status == 200) {
      const result = res.data;
      return result;
    }
  } catch (error) {
    throw error;
  }
};

export default sendChatbot;
