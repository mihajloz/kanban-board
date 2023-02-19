import "./App.css";
import { Container, SimpleGrid } from "@chakra-ui/react";
import List from "./components/TaskList";
import { ListTitle } from "./enums/ListTitle.enum";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <>
      <Container maxW="container.xl" px={5} py={10}>
        <DndProvider backend={HTML5Backend}>
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={{ base: 16, md: 4 }}
          >
            <List list={ListTitle.TODO} />
            <List list={ListTitle.DOING} />
            <List list={ListTitle.DONE} />
          </SimpleGrid>
        </DndProvider>
      </Container>
    </>
  );
}

export default App;
