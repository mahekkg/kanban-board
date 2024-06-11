// src/components/KanbanBoard.js
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Column from './Column';

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage' },
    'task-2': { id: 'task-2', content: 'Watch my favorite show' },
    'task-3': { id: 'task-3', content: 'Charge my phone' },
    'task-4': { id: 'task-4', content: 'Cook dinner' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

const KanbanBoard = () => {
  const [state, setState] = useState(initialData);

  const moveTask = (taskId, sourceColumnId, destinationColumnId) => {
    const sourceColumn = state.columns[sourceColumnId];
    const destinationColumn = state.columns[destinationColumnId];

    const newSourceTaskIds = sourceColumn.taskIds.filter((id) => id !== taskId);
    const newDestinationTaskIds = [...destinationColumn.taskIds, taskId];

    setState({
      ...state,
      columns: {
        ...state.columns,
        [sourceColumnId]: {
          ...sourceColumn,
          taskIds: newSourceTaskIds,
        },
        [destinationColumnId]: {
          ...destinationColumn,
          taskIds: newDestinationTaskIds,
        },
      },
    });
  };

  const moveTaskWithinColumn = (columnId, dragIndex, hoverIndex) => {
    const column = state.columns[columnId];
    const newTaskIds = Array.from(column.taskIds);
    const [movedTask] = newTaskIds.splice(dragIndex, 1);
    newTaskIds.splice(hoverIndex, 0, movedTask);

    setState({
      ...state,
      columns: {
        ...state.columns,
        [columnId]: {
          ...column,
          taskIds: newTaskIds,
        },
      },
    });
  };

  return (
    <Grid container spacing={2}>
      {state.columnOrder.map((columnId) => {
        const column = state.columns[columnId];
        const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

        return (
          <Grid item xs={4} key={column.id}>
            <Column
              column={column}
              tasks={tasks}
              moveTask={moveTask}
              moveTaskWithinColumn={moveTaskWithinColumn}
              columnId={column.id}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default KanbanBoard;
