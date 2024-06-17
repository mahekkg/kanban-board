import { Box, Container, CssBaseline, Typography } from "@mui/material";
import KanbanBoard from "./components/KanbanBoard";

const App = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" sx={{ marginY: 3 }}>
        KanBan Board
      </Typography>
      <KanbanBoard />
    </Box>
  );
};

export default App;
