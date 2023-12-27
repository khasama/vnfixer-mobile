import api from "../configs/axios.config";
import { RequestStatus } from "../constants/type";

const changeRequestStatus = async (
  requestId: number,
  status: RequestStatus
) => {
  try {
    const res = await api.patch(
      `/requests/change-status/${requestId}`,
      undefined,
      {
        params: { status },
      }
    );
    if (res.status == 200) {
      const result = res.data;
      return result;
    }
  } catch (error) {
    throw error;
  }
};

export default changeRequestStatus;
