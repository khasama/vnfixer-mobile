import { IUser } from "../../constants/type";

export const currentUserSelector = (state: any) =>
  state.auth.currentUser as IUser;
export const isLoggedInSelector = (state: any) => state.auth.isLoggedIn;
