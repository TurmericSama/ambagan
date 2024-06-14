"use client";

import { useState } from "react";
import TrashIcon from "@mui/icons-material/Delete";
import { Id, Task } from "./types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, Button, TextField, TextareaAutosize } from "@mui/material";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(true);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <Box
        ref={setNodeRef}
        style={style}
        //   className="
        //   opacity-30
        //   bg-mainBackgroundColor
        //   p-2.5
        //   h-[100px]
        //   min-h-[100px]
        //   items-center
        //   flex
        //   text-left
        //   rounded-xl
        //   border-2
        //   border-rose-500
        //    cursor-grab relative
        // "
        sx={{
          height: "100px",
          minHeight: "100px",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          border: "2px solid red",
          padding: "2.5em",
        }}
      />
    );
  }

  if (editMode) {
    return (
      <Box
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative"
      >
        <TextField
          //   className="
          // h-[90%]
          // w-full
          // resize-none
          // border-none
          //  rounded
          //   bg-transparent
          //    text-white
          //     focus:outline-none
          // "
          type="text"
          sx={{
            height: "90%",
            width: "100%",
            border: "none",
            backgroundColor: "none",
            "& :focus": {
              outline: "none",
            },
          }}
          value={task.content}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        />
      </Box>
    );
  }

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.content}
      </p>

      {mouseIsOver && (
        <Button
          onClick={() => {
            deleteTask(task.id);
          }}
          className="stroke-white 
          absolute 
          right-4 
          top-1/2 
          -translate-y-1/2 
          bg-columnBackgroundColor 
          p-2 
          rounded
           opacity-60 
           hover:opacity-100"
          sx={{
            position: "absolute",
            right: "4em",
            top: "0.5em",
            ":hover": {
              opacity: "100%",
            },
            backgroundColor: "pink",
          }}
        >
          <TrashIcon />
        </Button>
      )}
    </Box>
  );
}

export default TaskCard;
