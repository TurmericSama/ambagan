"use client";

import ColumnCardContainer from "@/components/ColumnCardContainer";
import { Button, Stack } from "@mui/material";
import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";

import Headers from "../../components/StyledHeader";
import SpendingCard from "./SpendingCard";

interface ContentRendererProps {
  members: NewColumnDataTemplate;
  memberNames: string[];
  addBlankMemberSpending: (memberName: string) => void;
}

const ContentRenderer: FC<ContentRendererProps> = ({
  members,
  memberNames,
  addBlankMemberSpending,
}) => {
  return (
    <Stack direction="row" gap={4} sx={{ maxWidth: 1200, overflow: "auto" }}>
      {memberNames.map((memberName, index) => {
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
                  <ColumnCardContainer
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      maxHeight: "calc(100vh - 200px)",
                      overflowY: "auto",
                    }}
                  >
                    {members[memberName]?.spendings.map((spending, index) => {
                      return (
                        <SpendingCard
                          spending={spending}
                          index={index}
                          key={`${spending.expenseName}${index}`}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </ColumnCardContainer>
                );
              }}
            </Droppable>
            <Button
              fullWidth
              variant="outlined"
              sx={{ alignSelf: "end", position: "sticky", marginTop: 2 }}
              onClick={() => addBlankMemberSpending(memberName)}
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
