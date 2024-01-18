import api from "../configs/axios.config";

const getMyNotification = async () => {
  try {
    const res = await api.get(`/notifications`);
    if (res.status == 200) {
      const result = res.data;
      return result;
    }
  } catch (error) {
    throw error;
  }
};

export default getMyNotification;
