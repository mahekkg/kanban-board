// src/App.js
import React from "react";
import KanbanBoard from "./components/KanbanBoard";
import DndContext from "./components/DnDContext";
import { Container, CssBaseline, Typography } from "@mui/material";

const App = () => {
  return (
    <Container>
      <CssBaseline />
      <Typography variant="h3" gutterBottom>
        Kanban Board
      </Typography>
      <DndContext>
        <KanbanBoard />
      </DndContext>
    </Container>
  );
};

export default App;
