import api from "../configs/axios.config";

const getCategories = async () => {
  try {
    const res = await api.get(`/categories`);
    if (res.status == 200) {
      const result = res.data;
      return result;
    }
  } catch (error) {
    throw error;
  }
};

export default getCategories;
