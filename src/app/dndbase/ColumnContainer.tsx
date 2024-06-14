"use client";

import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TrashIcon from "@mui/icons-material/Delete";
import { Column, Id, Task } from "./types";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import PlusIcon from "@mui/icons-material/Add";
import TaskCard from "./TaskCard";
import { Box, Button, TextField } from "@mui/material";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;

  createTask: (columnId: Id) => void;
  updateTask: (id: Id, content: string) => void;
  deleteTask: (id: Id) => void;
  tasks: Task[];
}

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}: Props) {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <Box
        ref={setNodeRef}
        sx={{
          ...style,
          backgroundColor: "lightblue",
          opacity: "0.4",
          border: "2px solid red",
          width: "350px",
          height: "500px",
          maxHeight: "500px",
          display: "flex",
          flexDirection: "column",
        }}
        //   className="
        // bg-columnBackgroundColor
        // opacity-40
        // border-2
        // border-pink-500
        // w-[350px]
        // h-[500px]
        // max-h-[500px]
        // rounded-md
        // flex
        // flex-col
        // "
      ></Box>
    );
  }

  return (
    <Box
      ref={setNodeRef}
      //     className="
      // bg-columnBackgroundColor
      // w-[350px]
      // h-[500px]
      // max-h-[500px]
      // rounded-md
      // flex
      // flex-col
      // "
      sx={{
        ...style,
        backgroundColor: "seagreen",
        width: "350px",
        height: "500px",
        maxHeight: "500px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Column title */}
      <Box
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        // className="
        // bg-mainBackgroundColor
        // text-md
        // h-[60px]
        // cursor-grab
        // rounded-md
        // rounded-b-none
        // p-3
        // font-bold
        // border-columnBackgroundColor
        // border-4
        // flex
        // items-center
        // justify-between
        // "
        sx={{
          backgroundColor: "azure",
          height: "60px",
          cursor: "grab",
          padding: 3,
          fontWeight: "bold",
          border: "4px solid green",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          // className="flex gap-2"
          sx={{ display: "flex", gap: 2 }}
        >
          <Box
            //     className="
            // flex
            // justify-center
            // items-center
            // bg-columnBackgroundColor
            // px-2
            // py-1
            // text-sm
            // rounded-full
            // "
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItem: "center",
              paddingX: 2,
              paddingY: 1,
              width: "100%",
            }}
          >
            0
          </Box>
          {!editMode && column.title}
          {editMode && (
            <TextField
              // className="
              // bg-black
              // focus:border-rose-500
              // border
              // rounded
              // outline-none
              // px-2"
              sx={{
                backgroundColor: "black",
                ":focus": {
                  borderColor: "pink",
                },
                borderWidth: "1px",
                outline: "none",
                paddingX: 2,
              }}
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </Box>
        <Button
          onClick={() => {
            deleteColumn(column.id);
          }}
          //   className="
          // stroke-gray-500
          // hover:stroke-white
          // hover:bg-columnBackgroundColor
          // rounded
          // px-1
          // py-2
          // "
          sx={{
            border: "2px solid gray",
            ":hover": {
              borderColor: "gainsboro",
              backgroundColor: "green",
            },
          }}
        >
          <TrashIcon />
        </Button>
      </Box>

      {/* Column task container */}
      <Box
        //  className="
        // flex
        // flex-grow
        // flex-col
        // gap-4
        // p-2
        // overflow-x-hidden
        // overflow-y-auto"
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          gap: 4,
          padding: 2,
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </Box>
      {/* Column footer */}
      <Button
        className="
        flex 
        gap-2 
        items-center 
        border-columnBackgroundColor 
        border-2 
        rounded-md 
        p-4 
        border-x-columnBackgroundColor 
        hover:bg-mainBackgroundColor 
        hover:text-rose-500 
        active:bg-black"
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          borderColor: "red",
          borderWidth: "2px",
          padding: 4,
          borderLeftColor: "green",
          borderRightColor: "green",
          ":hover": {
            backgroundColor: "green",
            color: "red",
          },
          ":active": {
            backgroundColor: "black",
          },
        }}
        onClick={() => {
          createTask(column.id);
        }}
      >
        <PlusIcon />
        Add task
      </Button>
    </Box>
  );
}

export default ColumnContainer;
