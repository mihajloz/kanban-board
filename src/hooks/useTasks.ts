import { useCallback } from "react";
import { ListTitle } from "../enums/ListTitle.enum";
import { ITask } from "../interfaces/ITask";
import useTaskStore from "./useTaskStore";
import { v4 as uuid } from "uuid";
import randomColor from "../utils/randomColor";

const useTasks = (list: ListTitle) => {
  // Gets current state of tasks from local storage
  const [tasks, setTasks] = useTaskStore();

  // Adds new task and returns an updated object that merges the previous
  // tasks with the new task added to the beginning of the array for the given list
  const addTask = useCallback(() => {
    setTasks((prevTasks) => {
      const newTask: ITask = {
        id: uuid(),
        list,
        content: "New Task",
        color: randomColor(),
      };

      return {
        ...prevTasks,
        [list]: [newTask, ...prevTasks[list]],
      };
    });
  }, [list, setTasks]);

  // Deletes task by filtering out the task with a given id
  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prevTasks) => {
        return {
          ...prevTasks,
          [list]: prevTasks[list].filter((task) => task.id !== id),
        };
      });
    },
    [list, setTasks]
  );

  const updateTask = useCallback(
    (id: ITask["id"], updateTask: ITask) => {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks[list].map((task) => {
          if (task.id === id) {
            return updateTask;
          }
          return task;
        });

        return {
          ...prevTasks,
          [list]: updatedTasks,
        };
      });
    },
    [list, setTasks]
  );

  const dropTask = useCallback(
    (from: ListTitle, id: ITask["id"]) => {
      setTasks((prevTasks) => {
        const fromList = prevTasks[from];
        const toList = prevTasks[list];
        const dragging = fromList.find((task) => task.id === id);

        if (!dragging) {
          return prevTasks;
        }

        return {
          ...prevTasks,
          [from]: fromList.filter((task) => task.id !== id),
          [list]: [{ ...dragging, list }, ...toList],
        };
      });
    },
    [list, setTasks]
  );

  return {
    tasks: tasks[list],
    addTask,
    deleteTask,
    updateTask,
    dropTask,
  };
};

export default useTasks;
