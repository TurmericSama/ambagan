// import PlusIcon from "../icons/PlusIcon";
import React, { useMemo, useState } from "react";
import { Column, Id, Task } from "./types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import SpendingCard from "./TaskCard";
import { Button, Stack, styled } from "@mui/material";
import MemberRenderer from "@/app/dndkit/susComponents/MemberColumn";
import { Member, SpendingDataTemplate } from "@/app/dndkit/types";
import {
  updateMemberSpending,
  useUniqueIdBank,
  useUniqueSpendingIdBank,
} from "@/app/manage/pageFunctions/pageFunctions";
import { createMember } from "./pageFunctions/createMember";
import { onRemoveMember } from "./pageFunctions/removeMember";
import { onUpdateMember } from "./pageFunctions/updateMember";
import { createSpending } from "./pageFunctions/createSpending";
import { onUpdateSpendings } from "./pageFunctions/updateSpending";

const defaultMembers: Member[] = [];

/*
  

- dnd kit is an annoying way to work with drag and drop
- overlays are needed to be set in a state so that you have the data to render the overlay/ drag item
- this is because the overlay is rendered outside the dndkit context
- the overlay is rendered in a portal to the body
- the overlay is set in the onDragStart event
- the overlay is removed in the onDragEnd event
- the overlay is updated in the onDragOver event
- the overlay is rendered in the DragOverlay component
- 

*/

function KanbanBoard() {
  const { takeUniqueId } = useUniqueIdBank();
  const [members, setMembers] = useState<Member[]>(defaultMembers);
  //list of columns we can reference members

  const columnsId = useMemo(
    () => members.map((member) => member.memberId),
    [members]
  );
  //list of memoized column ids

  const [spendings, updateSpendings] = useState<SpendingDataTemplate[]>([]);
  //list of tasks, we can reference spendings for this

  const [activeMember, setActiveMember] = useState<Member | null>(null);

  const [activeSpending, setActiveSpending] =
    useState<SpendingDataTemplate | null>(null);
  const { takeSpendingId } = useUniqueSpendingIdBank();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleCreateMember = createMember({
    members,
    setMembers,
    takeUniqueId,
  });
  const handleUpdateMember = onUpdateMember({ members, setMembers });
  const handleRemoveMember = onRemoveMember({ members, setMembers });
  const handleCreateSpending = createSpending({
    spendings,
    updateSpendings,
    takeSpendingId,
  });

  const handleUpdateSpending = onUpdateSpendings({
    spendings,
    updateSpendings,
  });

  return (
    <Stack direction="row" gap={2}>
      <MemberRenderer
        members={members}
        onAdd={handleCreateMember}
        onMemberUpdate={handleUpdateMember}
        onRemove={handleRemoveMember}
      />
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        collisionDetection={closestCenter}
      >
        <DndOuterContainer direction="row">
          <Stack
            direction="row"
            sx={{
              flex: 1,
              gap: 4,
            }}
          >
            <SortableContext items={columnsId}>
              {members.map((member) => (
                <ColumnContainer
                  key={member.memberId}
                  member={member}
                  deleteColumn={handleRemoveMember}
                  updateColumn={handleUpdateMember}
                  createSpending={handleCreateSpending}
                  deleteTask={() => {}}
                  updateSpending={handleUpdateSpending}
                  spendings={spendings.filter(
                    (spending) => spending.memberId === member.memberId
                  )}
                />
              ))}
            </SortableContext>
          </Stack>
        </DndOuterContainer>

        {createPortal(
          <DragOverlay>
            {activeMember && (
              <ColumnContainer
                member={activeMember}
                deleteColumn={handleRemoveMember}
                updateColumn={handleUpdateMember}
                createSpending={handleCreateSpending}
                deleteTask={() => {}}
                updateSpending={handleUpdateSpending}
                spendings={spendings.filter(
                  (spending) => spending.memberId === activeMember.memberId
                )}
              />
            )}
            {activeSpending && (
              <SpendingCard
                spending={activeSpending}
                deleteTask={() => {}}
                updateSpending={handleUpdateSpending}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </Stack>
  );

  function onDragStart(event: DragStartEvent) {
    console.log({ event });
    if (event.active.data.current?.type === "Member") {
      setActiveMember(event.active.data.current.member);
      return;
    }

    if (event.active.data.current?.type === "Spending") {
      setActiveSpending(event.active.data.current.spending);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveMember(null);
    setActiveSpending(null);

    const { active, over } = event;
    if (!over) return;

    console.log({ active, over });

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Member";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setMembers((members) => {
      const activeColumnIndex = members.findIndex(
        (member) => member.memberId === activeId
      );

      const overColumnIndex = members.findIndex(
        (member) => member.memberId === overId
      );

      return arrayMove(members, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveSpending = active.data.current?.type === "Spending";
    const isOverSpending = over.data.current?.type === "Spending";

    if (!isActiveSpending) return;

    // Im dropping a Task over another Task
    if (isActiveSpending && isOverSpending) {
      updateSpendings((spendings) => {
        const activeIndex = spendings.findIndex(
          (t) => t.spendingId === activeId
        );
        const overIndex = spendings.findIndex((t) => t.spendingId === overId);

        if (spendings[activeIndex].memberId != spendings[overIndex].memberId) {
          // Fix introduced after video recording
          spendings[activeIndex].memberId = spendings[overIndex].memberId;
          return arrayMove(spendings, activeIndex, overIndex - 1);
        }

        return arrayMove(spendings, activeIndex, overIndex);
      });
    }

    console.log({ over });

    const isOverAColumn = over.data.current?.type === "Member";

    // Im dropping a Task over a column
    if (isActiveSpending && isOverAColumn) {
      updateSpendings((spendings) => {
        const activeIndex = spendings.findIndex(
          (t) => t.spendingId === activeId
        );

        spendings[activeIndex].memberId = overId as string;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(spendings, activeIndex, activeIndex);
      });
    }
  }
}

export default KanbanBoard;

const DndOuterContainer = styled(Stack)(({ theme }) => ({
  margin: "auto",
  gap: 4,
  maxWidth: "1200px",
  overflow: "auto",
}));
