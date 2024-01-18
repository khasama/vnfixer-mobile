import { IRequest } from "../../constants/type";

export const requestsCanTakeSelector = (state: any) =>
  state.request.requests as IRequest[];

export const requestTakedSelector = (state: any) =>
  state.request.requestTaked as IRequest;
