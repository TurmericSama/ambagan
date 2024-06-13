/*

this component will renderer all columns
*/

import React from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import DroppableContainer from "./DroppableContainer";
import { ManageViewState } from "@/app/dndkit/types";
import { Stack } from "@mui/material";

interface DroppableRendererProps {
  manageState: ManageViewState;
}

const DroppableRenderer: React.FC<DroppableRendererProps> = ({
  manageState,
}) => {
  const spendingMap = manageState.spendingColumn;

  return (
    <Stack direction="row" sx={{ overflow: "auto", width: "100%" }}>
      <SortableContext items={manageState.members.map((m) => m.memberId)}>
        {manageState.members.map(({ memberId, memberName }) => {
          const currentMemberSpendingIds = spendingMap[memberId].spendingIds;
          return (
            <DroppableContainer
              key={memberId}
              columnName={memberName}
              id={memberId}
              spendings={manageState.spendings}
              spendingIds={currentMemberSpendingIds}
            />
          );
        })}
      </SortableContext>
    </Stack>
  );
};

export default DroppableRenderer;
