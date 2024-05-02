"use client";

import ColumnCardContainer from "@/components/ColumnCardContainer";
import { Button, Stack } from "@mui/material";
import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import Headers from "../../components/StyledHeader";
import SpendingCard from "./SpendingCard";
import { Member, SpendingColumn, Spendings } from "./types";
import { AddNewMemberSpendingSecondaryProps } from "./pagefunctions";

interface ContentRendererProps {
  members: Member[];
  spendingColumns: SpendingColumn;
  spendings: Spendings;
  addBlankMemberSpending: ({
    memberId,
  }: AddNewMemberSpendingSecondaryProps) => void;
}

const ContentRenderer: FC<ContentRendererProps> = ({
  members,
  spendingColumns,
  spendings,
  addBlankMemberSpending,
}) => {
  return (
    <Stack direction="row" gap={4} sx={{ maxWidth: 1200, overflow: "auto" }}>
      {members.map(({ memberName, memberId }, index) => {
        return (
          <ColumnCardContainer
            sx={{ paddingTop: 4, padding: 3 }}
            key={`${memberName}${index}`}
          >
            <Headers variant="h5" pb={4}>
              {memberName}
            </Headers>
            <Droppable droppableId={`${memberName}${index}`}>
              {(provided) => {
                return (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      maxHeight: "calc(100vh - 200px)",
                      overflowY: "scroll",
                    }}
                  >
                    {spendingColumns?.[memberId]?.spendingKeys?.map(
                      (spendingId, index) => {
                        const { expenseName } = spendings[spendingId];
                        return (
                          <SpendingCard
                            spending={spendings[spendingId]}
                            index={index}
                            key={`${spendingId}-${expenseName}`}
                          />
                        );
                      }
                    )}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
            <Button
              fullWidth
              variant="outlined"
              sx={{ alignSelf: "end", position: "sticky", marginTop: 2 }}
              onClick={() => addBlankMemberSpending({ memberId, memberName })}
            >
              Add Expense
            </Button>
          </ColumnCardContainer>
        );
      })}
    </Stack>
  );
};

export default ContentRenderer;
