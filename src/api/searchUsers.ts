import api from "../configs/axios.config";

const searchUsersByEmail = async (email: string) => {
  try {
    const res = await api.get(`/users/email`, { params: { email } });
    if (res.status == 200) {
      const result = res.data;
      return result;
    }
  } catch (error) {
    throw error;
  }
};

export default searchUsersByEmail;
