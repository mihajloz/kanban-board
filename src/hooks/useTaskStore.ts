import { useLocalStorage } from "usehooks-ts";
import { v4 as uuid } from "uuid";
import { ListTitle } from "../enums/ListTitle.enum";
import { ITask } from "../interfaces/ITask";
import randomColor from "../utils/randomColor";

// Stores tasks in local storage
// Initializes data with a default task in each list

const useTaskStore = () => {
  return useLocalStorage<{
    [key in ListTitle]: ITask[];
  }>("list", {
    Todo: [
      {
        id: uuid(),
        list: ListTitle.TODO,
        content: "New Task",
        color: "#fa6e64",
      },
    ],
    Doing: [
      {
        id: uuid(),
        list: ListTitle.DOING,
        content: "New Task",
        color: "#fff467",
      },
    ],
    Done: [
      {
        id: uuid(),
        list: ListTitle.DONE,
        content: "New Task",
        color: "#ccff90",
      },
    ],
  });
};

export default useTaskStore;
