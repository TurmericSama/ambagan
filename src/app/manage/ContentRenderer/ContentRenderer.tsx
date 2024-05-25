"use client";

import ColumnCardContainer from "@/components/ColumnCardContainer";
import { Box, Button, Stack } from "@mui/material";
import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import Headers from "../../../components/StyledHeader";
import SpendingCard from "../SpendingCard/SpendingCard";
import { ContentRendererProps } from "./types";

const ContentRenderer: FC<ContentRendererProps> = ({
  members,
  spendingColumns,
  spendings,
  addBlankMemberSpending,
  updateMemberSpending,
}) => {
  return (
    <>
      {members.map(({ memberName, memberId }, index) => {
        const spendingColumn = spendingColumns[memberId];
        const spendingKeys = spendingColumn?.spendingKeys ?? [];
        return (
          <ColumnCardContainer
            sx={{ paddingTop: 4, padding: 3 }}
            key={`${memberName}${index}`}
          >
            <Headers variant="h4" pb={4} textTransform="capitalize">
              {spendingColumn.memberName}
            </Headers>
            <Droppable
              droppableId={memberId}
              type="virtual"
              getContainerForClone={() => {
                const scrollParent = document.getElementById("scroll-parent")!;
                console.log({ scrollParent });
                return scrollParent;
              }}
            >
              {(provided) => {
                return (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      maxHeight: "calc(800px)",
                      minHeight: 200,
                      overflowY: "scroll",
                    }}
                  >
                    {spendingKeys?.map((spendingId, index) => {
                      const { expenseName } = spendings[spendingId];
                      return (
                        <SpendingCard
                          updateMemberSpending={updateMemberSpending}
                          spending={spendings[spendingId]}
                          index={index}
                          key={`${spendingId}-${expenseName}`}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </Box>
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
    </>
  );
};

export default ContentRenderer;
