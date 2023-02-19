import { ListTitle } from "../enums/ListTitle.enum";

export interface ITask {
  id: string;
  list: ListTitle;
  content: string;
  color: string;
}
