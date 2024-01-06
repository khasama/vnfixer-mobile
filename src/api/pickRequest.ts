import api from "../configs/axios.config";

const pickRequest = async (requestId: number) => {
  try {
    const res = await api.put(`/requests/pick/${requestId}`);
    if (res.status == 200) {
      const result = res.data;
      return result;
    }
  } catch (error) {
    throw error;
  }
};

export default pickRequest;
