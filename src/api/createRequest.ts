import api from "../configs/axios.config";
import { IRequest } from "../constants/type";

const createRequest = async (data: IRequest) => {
  try {
    const res = await api.post(`/requests`, data);
    if (res.status == 200) {
      const result = res.data;
      return result;
    } else {
      return res.data;
    }
  } catch (error) {
    throw error;
  }
};

export default createRequest;
