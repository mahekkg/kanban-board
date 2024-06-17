import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  IconButton,
  TextField,
  Button,
  AvatarGroup,
  Avatar,
  Stack,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import { RiPencilLine, RiDeleteBinLine } from "react-icons/ri";

const ItemTypes = {
  CARD: "card",
};

const KanbanCard = ({ id, text, status, index, moveCard }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover: (draggedItem, monitor) => {
      if (!ref.current) {
        return;
      }
      const draggedIndex = draggedItem.index;
      const hoveredIndex = index;

      if (draggedIndex === hoveredIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (draggedIndex < hoveredIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (draggedIndex > hoveredIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(draggedItem.id, status, draggedIndex, hoveredIndex);
      draggedItem.index = hoveredIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { id, status, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <Card
      ref={ref}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        margin: 1,
        cursor: "pointer",
        backgroundColor: "#212121",
        color: "#ffffff",
      }}
    >
      <CardContent className="task-card-container">
        <Box>
          <Typography
            style={{
              fontSize: "20px",
              color: "#ffffff",
              fontWeight: 600,
            }}
          >
            {text}
          </Typography>
        </Box>
        <Stack direction="row" alignItems="center">
          <Typography variant="body2">Customer: </Typography>
          <Typography sx={{ marginX: 1 }}>Khalid</Typography>
        </Stack>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction="row" alignItems="center">
            <Typography variant="body2">Status: </Typography>
            <Typography sx={{ marginX: 1 }}>On Track</Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

const KanbanColumn = ({ status, cards, moveCard, removeColumn }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (draggedItem) => {
      if (draggedItem.status !== status) {
        moveCard(draggedItem.id, status, draggedItem.index, cards.length);
        draggedItem.status = status;
      }
    },
  });

  return (
    <Paper ref={drop} className="board-column">
      <Box className="board-column-head">
        <Typography variant="h6" sx={{ marginBottom: 0, color: "#ffffff" }}>
          {status}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Button
            className="task-action-btn task-edit-btn"
            // startIcon={<RiPencilLine />}
            disableRipple
            onClick={() => console.log("click")}
            sx={{ minWidth: "10px" }}
          ></Button>
          <Button
            className="task-action-btn task-dlt-btn"
            // startIcon={<RiDeleteBinLine />}
            disableRipple
            onClick={() => removeColumn(status)}
            sx={{ minWidth: "10px" }}
          ></Button>
        </Box>
      </Box>
      {cards.map((card, index) => (
        <KanbanCard key={card.id} index={index} {...card} moveCard={moveCard} />
      ))}
    </Paper>
  );
};

const KanbanBoard = () => {
  const [cards, setCards] = React.useState([
    { id: 1, text: "Add UI ", status: "Todo" },
    { id: 2, text: "Another Task", status: "Q/A" },
  ]);

  const [columns, setColumns] = React.useState([
    "Todo",
    "Q/A",
    "In Progress",
    "Done",
  ]);
  const [newColumn, setNewColumn] = React.useState("");

  const moveCard = (id, newStatus, newIndex, hoverIndex) => {
    setCards((prevCards) => {
      const cardIndex = prevCards.findIndex((card) => card.id === id);
      const card = prevCards[cardIndex];
      const updatedCards = prevCards.filter((card) => card.id !== id);
      if (newStatus !== card.status) {
        updatedCards.splice(newIndex, 0, { ...card, status: newStatus });
      } else {
        updatedCards.splice(hoverIndex, 0, { ...card, status: newStatus });
      }
      return updatedCards;
    });
  };

  const addColumn = () => {
    if (newColumn && !columns.includes(newColumn)) {
      setColumns([...columns, newColumn]);
      setNewColumn("");
    }
  };

  const removeColumn = (status) => {
    setColumns(columns.filter((column) => column !== status));
    setCards(cards.filter((card) => card.status !== status));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box>
        <Grid
          container
          style={{
            overflowX: "auto",
            flexWrap: "nowrap",
            padding: "6px 0px 10px 0px",
          }}
        >
          {columns.map((column) => (
            <KanbanColumn
              key={column}
              status={column}
              cards={cards.filter((card) => card.status === column)}
              moveCard={moveCard}
              removeColumn={removeColumn}
            />
          ))}
          <Box>
            <TextField
              value={newColumn}
              onChange={(e) => setNewColumn(e.target.value)}
              placeholder="New Column"
              size="small"
              sx={{
                minWidth: 260,
                backgroundColor: "#212121",
                input: { color: "#ffffff" },
              }}
            />
            <IconButton onClick={addColumn}>
              <Add sx={{ color: "#212121" }} />
            </IconButton>
          </Box>
        </Grid>
      </Box>
    </DndProvider>
  );
};

export default KanbanBoard;
