import api from "../configs/axios.config";

const getRequests = async (filter: object) => {
  try {
    const res = await api.get(`/requests`, { params: filter });
    if (res.status == 200) {
      const result = res.data;
      return result;
    }
  } catch (error) {
    throw error;
  }
};

export default getRequests;
