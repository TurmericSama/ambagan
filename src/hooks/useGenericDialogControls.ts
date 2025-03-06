import { useState } from "react";

const useGenericDialogControls = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const toggleDialog = () => {
    setIsOpen((prev) => !prev);
  };

  return {
    isOpen,
    openDialog,
    closeDialog,
    toggleDialog,
  };
};

export default useGenericDialogControls;
