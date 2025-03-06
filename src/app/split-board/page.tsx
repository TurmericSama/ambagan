"use client";
import { useEffect, useMemo, useState } from "react";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import SpendingCard from "./SpendingCard";
import { Box, Stack } from "@mui/material";
import { closestCorners } from "@dnd-kit/core";
import { Member, SpendingDataTemplate } from "./types";
import { onRemoveMember } from "./pageFunctions/removeMember";
import RenderMemberColumn from "./MemberColumn";
import { createMember } from "./pageFunctions/createMember";
import useUniqueIdBank from "./pageFunctions/useUniqueIdBank";
import useUniqueSpendingIdBank from "./pageFunctions/useUniqueSpendingIdBank";
import { onUpdateMember } from "./pageFunctions/updateMember";
import { createSpending } from "./pageFunctions/createSpending";
import { onUpdateSpendings } from "./pageFunctions/updateSpending";

const KanbanBoard = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const [members, setMembers] = useState<Member[]>([]);
  //list of columns we can reference members

  const memberIds = useMemo(
    () => members.map((member) => member.memberId),
    [members]
  );
  //list of memoized column ids

  const [spendings, updateSpendings] = useState<SpendingDataTemplate[]>([]);
  //list of tasks, we can reference spendings for this

  const [activeMember, setActiveMember] = useState<Member | null>(null);

  const [activeSpending, setActiveSpending] =
    useState<SpendingDataTemplate | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const { takeUniqueId } = useUniqueIdBank();
  const { takeSpendingId } = useUniqueSpendingIdBank();

  const handleRemoveMember = onRemoveMember({ members, setMembers });
  const handleAddMember = createMember({ members, setMembers, takeUniqueId });
  const handleUpdateMember = onUpdateMember({ members, setMembers });
  const handleAddSpending = createSpending({
    spendings,
    updateSpendings,
    takeSpendingId,
    members,
  });

  const handleUpdateSpending = onUpdateSpendings({
    spendings,
    updateSpendings,
  });

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Member") {
      setActiveMember(event.active.data.current.member);
      return;
    }

    if (event.active.data.current?.type === "SpendingDataTemplate") {
      setActiveSpending(event.active.data.current.spending);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveMember(null);
    setActiveSpending(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Member";
    if (!isActiveAColumn) return;

    setMembers((members) => {
      const activeColumnIndex = members.findIndex(
        (member) => member.memberId === activeId
      );

      const overColumnIndex = members.findIndex(
        (member) => member.memberId === overId
      );

      return arrayMove(members, activeColumnIndex, overColumnIndex);
    });
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "SpendingDataTemplate";
    const isOverATask = over.data.current?.type === "SpendingDataTemplate";

    if (!isActiveATask) return;

    // Im dropping a SpendingDataTemplate over another SpendingDataTemplate
    if (isActiveATask && isOverATask) {
      updateSpendings((spendings) => {
        const activeIndex = spendings.findIndex(
          (spending) => spending.spendingId === activeId
        );
        const overIndex = spendings.findIndex(
          (spending) => spending.spendingId === overId
        );

        if (spendings[activeIndex].memberId != spendings[overIndex].memberId) {
          // Fix introduced after video recording
          spendings[activeIndex].memberId = spendings[overIndex].memberId;
          return arrayMove(spendings, activeIndex, overIndex - 1);
        }

        return arrayMove(spendings, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Member";

    // Im dropping a SpendingDataTemplate over a column
    if (isActiveATask && isOverAColumn) {
      updateSpendings((spendings) => {
        const activeIndex = spendings.findIndex(
          (spending) => spending.spendingId === activeId
        );

        spendings[activeIndex].memberId = overId as string;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(spendings, activeIndex, activeIndex);
      });
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100%", gap: 5 }}>
      <Box
        sx={{
          display: "flex",
          flex: 0.3,
          height: "100%",
          alignItems: "center",
        }}
      >
        <RenderMemberColumn
          members={members}
          onAdd={handleAddMember}
          onRemove={handleRemoveMember}
          onMemberUpdate={handleUpdateMember}
        />
      </Box>
      <Box
        sx={{ display: "flex", flex: 0.7, overflowX: "scroll", paddingX: 5 }}
      >
        <Stack
          sx={{
            margin: "auto",
            width: "100%",
            alignItems: "center",
            flex: 1,
          }}
        >
          <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            collisionDetection={closestCorners}
          >
            <Box sx={{ display: "flex", margin: "auto", gap: 4, flex: 1 }}>
              <Box sx={{ display: "flex", gap: 4 }}>
                <SortableContext items={memberIds}>
                  {members.map((member) => (
                    <ColumnContainer
                      key={member.memberId}
                      member={member}
                      // deleteColumn={deleteColumn}
                      createSpending={handleAddSpending}
                      updateSpending={handleUpdateSpending}
                      spendings={spendings.filter(
                        (spending) => spending.memberId === member.memberId
                      )}
                    />
                  ))}
                </SortableContext>
              </Box>
            </Box>

            {isMounted &&
              createPortal(
                <DragOverlay>
                  {activeMember && (
                    <ColumnContainer
                      member={activeMember}
                      // deleteColumn={deleteColumn}
                      createSpending={() => {}}
                      spendings={spendings.filter(
                        (spending) =>
                          spending.memberId === activeMember.memberId
                      )}
                      updateSpending={handleUpdateSpending}
                    />
                  )}
                  {activeSpending && (
                    <SpendingCard
                      spending={activeSpending}
                      updateSpending={() => {}}
                    />
                  )}
                </DragOverlay>,
                document.body
              )}
          </DndContext>
        </Stack>
      </Box>
    </Box>
  );
};

export default KanbanBoard;
