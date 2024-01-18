import api from "../configs/axios.config";

const getAgencies = async (filter = {}) => {
  try {
    const res = await api.get(`/agencies`, { params: filter });
    if (res.status == 200) {
      const result = res.data;
      return result;
    }
  } catch (error) {
    throw error;
  }
};

export default getAgencies;
