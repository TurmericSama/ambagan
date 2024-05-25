import React, { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Button } from "@mui/material";

interface DraggableProps {
  children?: ReactNode;
}

const Draggable: React.FC<DraggableProps> = ({ children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Button ref={setNodeRef} sx={style} {...listeners} {...attributes}>
      {children}
    </Button>
  );
};

export default Draggable;
