import { useDrop } from "react-dnd";
import { ListTitle } from "../enums/ListTitle.enum";
import { TaskDnd } from "../enums/TaskDnd.enum";
import { ITask } from "../interfaces/ITask";
import { ITaskDrag } from "../interfaces/ITaskDrag";

export function useTaskDrop(
  list: ListTitle,
  handleDrop: (fromList: ListTitle, taskId: ITask["id"]) => void
) {
  const [{ isOver }, dropRef] = useDrop<ITaskDrag, void, { isOver: boolean }>({
    accept: TaskDnd.TASK,
    drop: (dragItem) => {
      if (!dragItem || dragItem.from === list) {
        return;
      }
      handleDrop(dragItem.from, dragItem.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return {
    isOver,
    dropRef,
  };
}
