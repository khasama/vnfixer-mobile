import api from "../configs/axios.config";

const getRequestTaked = async () => {
  try {
    const res = await api.get(`/requests/request-taked`);
    if (res.status == 200) {
      const result = res.data;
      return result;
    }
  } catch (error) {
    throw error;
  }
};

export default getRequestTaked;
