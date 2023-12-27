import api from "../configs/axios.config";

const getRequestsCanTake = async () => {
  try {
    const res = await api.get(`/requests/requests-take`);
    if (res.status == 200) {
      const result = res.data;
      return result;
    }
  } catch (error) {
    throw error;
  }
};

export default getRequestsCanTake;
