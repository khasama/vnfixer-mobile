import api from "../configs/axios.config";

const getAgency = async (id: string) => {
  try {
    const res = await api.get(`/agencies/${id}`);
    if (res.status == 200) {
      const result = res.data;
      return result;
    }
  } catch (error) {
    throw error;
  }
};

export default getAgency;
