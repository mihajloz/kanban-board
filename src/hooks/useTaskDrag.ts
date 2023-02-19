import { ITask } from "../interfaces/ITask";
import { useDrag } from "react-dnd";
import { ITaskDrag } from "../interfaces/ITaskDrag";
import { TaskDnd } from "../enums/TaskDnd.enum";
import { useRef } from "react";

export function useTaskDrag<T extends HTMLElement>({
  task,
  index,
}: {
  task: ITask;
  index: number;
}) {
  const ref = useRef<T>(null);
  const [{ isDragging }, drag] = useDrag<
    ITaskDrag,
    void,
    { isDragging: boolean }
  >({
    type: TaskDnd.TASK,
    item: { from: task.list, id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(ref);

  return {
    ref,
    isDragging,
  };
}
