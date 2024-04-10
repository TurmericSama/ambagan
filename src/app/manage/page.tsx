"use client";
import ContainerRow from "@/components/ContainerRow";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import MemberRow from "./MemberRow";
import HorizontalDivider from "@/components/HorizontalDivider";
import AddMemberRow from "./AddMemberRow";

interface ManageProps {
  // Add any props you need for the Manage component
}

const Manage: React.FC<ManageProps> = () => {
  // Add your component logic here

  const [members, setMembers] = useState<string[]>([
    "Noween",
    "Paulo",
    "John",
    "Doe",
  ]);

  const [tempMember, setTempMember] = useState<string>("");

  const handleRemoveMember = (memberIndex: number) => {
    const membersCopy = [...members];
    setMembers(membersCopy.filter((_, index) => index !== memberIndex));
  };

  const updateMember = (memberIndex: number, newValue: string) => {
    const membersTemp = [...members];
    const returnable = membersTemp.map((m, index) =>
      index === memberIndex ? newValue : m
    );
    console.log({ returnable });
    setMembers(returnable);
  };

  const addMember = (newMember: string) => {
    setMembers([...members, newMember]);
    setTempMember("");
  };

  return (
    <ContainerRow sx={{ backgroundColor: "red" }}>
      <Card
        sx={{
          p: 0,
          border: "solid 1px #ACB4FF",
          backgroundColor: "#FFFBE9",
          width: 300,
          height: "70vh",
        }}
        elevation={2}
        variant="elevation"
      >
        <CardContent
          sx={{
            "&.MuiCardContent-root:last-child": {
              padding: "unset",
              p: 2,
            },
            p: 2,
            height: "100%",
          }}
        >
          <Typography
            variant="h5"
            color="#5F6FFF"
            fontWeight="bold"
            sx={{ marginBottom: 4 }}
          >
            Members
          </Typography>
          <Box sx={{ maxHeight: "40%", overflowY: "auto" }}>
            {members.map((member, index) => {
              return (
                <MemberRow
                  key={`${member}-${index}`}
                  memberName={member}
                  onRemove={handleRemoveMember}
                  onBlur={updateMember}
                  memberIndex={index}
                />
              );
            })}
          </Box>
          <HorizontalDivider />
          <AddMemberRow
            onAddMember={addMember}
            onChange={setTempMember}
            tempMember={tempMember}
          />
        </CardContent>
      </Card>
    </ContainerRow>
  );
};

export default Manage;
