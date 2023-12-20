import { ICategory } from "../../constants/type";

export const categoriesSelector = (state: any) =>
  state.categories.data as ICategory[];
