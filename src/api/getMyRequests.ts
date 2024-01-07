import api from "../configs/axios.config";

const getMyRequests = async () => {
  try {
    const res = await api.get(`/requests/me`);
    if (res.status == 200) {
      const result = res.data;
      return result;
    }
  } catch (error) {
    throw error;
  }
};

export default getMyRequests;
