import { AddIcon } from "@chakra-ui/icons";
import { Box, Heading, Button, Stack, IconButton } from "@chakra-ui/react";
import { ListTitle } from "../enums/ListTitle.enum";
import useTasks from "../hooks/useTasks";
import Task from "./Task";
import { useTaskDrop } from "../hooks/useTaskDrop";

const TaskList = (props: { list: ListTitle }) => {
  const { tasks, addTask, deleteTask, updateTask, dropTask } = useTasks(
    props.list
  );

  const { dropRef, isOver } = useTaskDrop(props.list, dropTask);

  const ColumnTasks = tasks.map((task, index) => (
    <Task
      key={task.id}
      task={task}
      index={index}
      onDelete={deleteTask}
      onUpdate={updateTask}
    />
  ));

  return (
    <Box
      border={"1px"}
      borderColor="white"
      rounded="xl"
      bgColor={"#2c2d32"}
      px={4}
      py={4}
    >
      <Heading fontSize="xl" color="white" pb={2}>
        {props.list}
      </Heading>
      <Stack
        ref={dropRef}
        direction={{ base: "row", md: "column" }}
        h={{ base: 300, md: 600 }}
        overflow="auto"
        bgColor={"#2c2d32"}
        mt={2}
        pt={2}
        spacing={4}
      >
        {ColumnTasks}
      </Stack>
      <Button
        rightIcon={<AddIcon />}
        p={6}
        w="full"
        onClick={addTask}
        color="white"
        fontWeight="regular"
        // bgColor="#383a3f"
        bgColor="transparent"
        _hover={{ backgroundColor: "#44464d" }}
      >
        Add a card
      </Button>
    </Box>
  );
};

export default TaskList;
