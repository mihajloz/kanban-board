import { CloseIcon } from "@chakra-ui/icons";
import { Box, IconButton, Textarea } from "@chakra-ui/react";
import { ITask } from "../interfaces/ITask";
import TextareaAutosize from "react-textarea-autosize";
import { useTaskDrag } from "../hooks/useTaskDrag";

type Props = {
  index: number;
  task: ITask;
  onUpdate: (id: ITask["id"], updateTask: ITask) => void;
  onDelete: (id: ITask["id"]) => void;
};

const Task = ({
  index,
  task,
  onUpdate: handleUpdate,
  onDelete: handleDelete,
}: Props) => {
  const { ref, isDragging } = useTaskDrag<HTMLDivElement>({ task, index });

  const onTaskChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTaskContent = e.target.value;
    handleUpdate(task.id, { ...task, content: newTaskContent });
  };

  const onTaskDelete = () => {
    handleDelete(task.id);
  };

  return (
    <Box
      ref={ref}
      role="group"
      position="relative"
      rounded="lg"
      minW={150}
      w="full"
      p={4}
      cursor="grab"
      bgColor={task.color}
      opacity={isDragging ? 0 : 1}
    >
      <IconButton
        aria-label="delete-task"
        icon={<CloseIcon />}
        position="absolute"
        zIndex={10}
        top={0}
        right={0}
        size="md"
        color="#black"
        opacity={0}
        bgColor="transparent"
        _hover={{ backgroundColor: "#00000030" }}
        _groupHover={{ opacity: 1 }}
        onClick={onTaskDelete}
      />
      <TextareaAutosize
        value={task.content}
        onChange={onTaskChange}
        minRows={1}
        maxRows={10}
        style={{
          backgroundColor: "transparent",
          border: "none",
          width: "90%",
          color: "black",
          cursor: "inherit",
        }}
      />
    </Box>
  );
};

export default Task;
