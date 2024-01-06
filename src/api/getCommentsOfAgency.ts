import api from "../configs/axios.config";

const getComments = async (agencyId: number) => {
  try {
    const res = await api.get(`/comments/agency/${agencyId}`);
    if (res.status == 200) {
      const result = res.data;
      return result;
    }
  } catch (error) {
    throw error;
  }
};

export default getComments;
