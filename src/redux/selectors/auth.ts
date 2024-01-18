import { IRequest, IUser } from "../../constants/type";

export const currentUserSelector = (state: any) =>
  state.auth.currentUser as IUser;
export const myRequestsSelector = (state: any) =>
  state.auth.myRequests as IRequest[];
export const isLoggedInSelector = (state: any) => state.auth.isLoggedIn;
