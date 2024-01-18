import api from "../configs/axios.config";

const updateNotiToken = async (token: string) => {
  try {
    const res = await api.patch(`/users/notification-token`, { token });
    if (res.status == 200) {
      const result = res.data;
      return result;
    } else {
      return res.data;
    }
  } catch (error: any) {
    throw error;
  }
};

export default updateNotiToken;
