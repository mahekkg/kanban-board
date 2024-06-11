// src/components/Task.js
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Card, CardContent, Typography } from '@mui/material';

const Task = ({ task, index, moveTaskWithinColumn }) => {
  const [, ref] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id, index },
  }));

  const [, drop] = useDrop(() => ({
    accept: 'TASK',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTaskWithinColumn(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  }));

  return (
    <Card
      ref={(node) => ref(drop(node))}
      sx={{
        marginBottom: 2,
        cursor: 'move',
      }}
    >
      <CardContent>
        <Typography>{task.content}</Typography>
      </CardContent>
    </Card>
  );
};

export default Task;
