// src/components/Column.js
import React from 'react';
import { useDrop } from 'react-dnd';
import { Box, Typography } from '@mui/material';
import Task from './Task';

const Column = ({ column, tasks, moveTask, moveTaskWithinColumn }) => {
  const [, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item) => {
      if (item.columnId !== column.id) {
        moveTask(item.id, item.columnId, column.id);
        item.columnId = column.id;
      }
    },
  }));

  return (
    <Box ref={drop} sx={{ padding: 2, backgroundColor: 'lightgrey', borderRadius: 2, minHeight: 300 }}>
      <Typography variant="h6">{column.title}</Typography>
      {tasks.map((task, index) => (
        <Task key={task.id} task={task} index={index} moveTaskWithinColumn={(dragIndex, hoverIndex) => moveTaskWithinColumn(column.id, dragIndex, hoverIndex)} />
      ))}
    </Box>
  );
};

export default Column;
