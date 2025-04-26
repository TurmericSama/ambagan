import { useDroppable } from "@dnd-kit/core";
import { Box, Paper, PaperProps, Typography, styled } from "@mui/material";
import { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";

interface MaterialCardContainerProps extends PaperProps {
  columnName: string;
}

const MaterialCardContainer: FC<MaterialCardContainerProps> = ({
  id,
  columnName,
  sx,
  children,
  ...props
}) => {
  // const member =
  // const {
  //   setNodeRef,
  //   attributes,
  //   listeners,
  //   transform,
  //   transition,
  //   isDragging,
  // } = useSortable({
  //   id: column.id,
  //   data: {
  //     type: "member",
  //     member,
  //   },
  //   disabled: editMode,
  // });

  return (
    <StyledPaperComponent elevation={2} sx={sx} {...props}>
      <Typography variant="h5" color="white">
        {columnName}
      </Typography>
      {children}
    </StyledPaperComponent>
  );
};

export default MaterialCardContainer;

const StyledPaperComponent = styled(Paper)(({ theme }) => ({
  borderRadius: "15px",
  border: "solid 1px #35e6ec",
  height: "100%",
  minWidth: 300,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  scrollbarColor: "transparent transparent",
  "&::-webkit-scrollbar": {
    scrollbarWidth: "none",
    backgroundColor: "transparent",
  },
}));

export const StyledColumnSilhouette = styled(Paper)(({ theme }) => ({
  borderRadius: "15px",
  border: "solid 1px #35e6ec",
  height: "100%",
  minWidth: 300,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  scrollbarColor: "transparent transparent",
  "&::-webkit-scrollbar": {
    scrollbarWidth: "none",
    backgroundColor: "transparent",
  },
  backgroundColor: "#240a44",
}));
