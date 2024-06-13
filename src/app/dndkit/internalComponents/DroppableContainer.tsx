import { SpendingDataTemplate } from "@/app/dndkit/types";
import MaterialCardContainer, {
  StyledColumnSilhouette,
} from "@/components/MaterialCardContainer";
import { useDroppable } from "@dnd-kit/core";
import { PaperProps } from "@mui/material";
import { FC, useMemo, useState } from "react";
import SpendingCard from "./SpendingCard";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface DroppableProps extends PaperProps {
  id: string;
  spendings: Record<string, SpendingDataTemplate>;
  spendingIds: string[];
  columnName: string;
}

const DroppableContainer: FC<DroppableProps> = ({
  id,
  spendings,
  spendingIds,
  columnName,
}) => {
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled: editMode,
    data: {
      id,
      spendings,
      spendingIds,
      columnName,
      type: "member",
    },
  });

  const mandatoryStylingFromDndKit = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <StyledColumnSilhouette
        ref={setNodeRef}
        style={mandatoryStylingFromDndKit}
      />
    );
  }

  const handleChangeEditMode = () => {
    setEditMode(true);
    alert("edit mode activated");
  };

  return (
    <MaterialCardContainer
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={handleChangeEditMode}
      id={id}
      columnName={columnName}
      sx={{
        backgroundColor: "#240a44",
        border: "transparent",
        padding: 1.5,
        borderRadius: "8px",
        marginRight: 2,
        ...mandatoryStylingFromDndKit,
      }}
    >
      {/* {spendingIds?.map((spendingId) => {
        return (
          <SpendingCard id={spendingId} spending={spendings[spendingId]} />
        );
      })} */}
    </MaterialCardContainer>
  );
};

export default DroppableContainer;
