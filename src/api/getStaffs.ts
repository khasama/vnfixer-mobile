import api from "../configs/axios.config";

const getStaffs = async () => {
  try {
    const res = await api.get(`/branches/staffs`);
    if (res.status == 200) {
      const result = res.data;
      return result;
    }
  } catch (error) {
    throw error;
  }
};

export default getStaffs;
