import { ListTitle } from "../enums/ListTitle.enum";
import { ITask } from "./ITask";

export interface ITaskDrag {
  index: number;
  id: ITask["id"];
  from: ListTitle;
}
