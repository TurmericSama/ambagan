import { useState, useEffect } from "react";

const useUniqueSpendingIdBank = (): {
  takenSpendingIds: string[];
  availableSpendingIds: string[];
  takeSpendingId: () => string;
  releaseSpendingId: (spendingId: string) => void;
} => {
  const [takenNumbers, setTakenUniqueSpendingIds] = useState<string[]>([]);
  const [availableSpendingIds, setAvailableSpendingIds] = useState<string[]>(
    []
  );

  useEffect(() => {
    const bank: string[] = [];
    for (let i = 1000; i < 2000; i++) {
      bank.push(`spending-${i}`);
    }
    setAvailableSpendingIds(bank);
  }, []);

  const takeNumber = (): string => {
    if (availableSpendingIds.length > 0) {
      const [number, ...rest] = availableSpendingIds;
      setTakenUniqueSpendingIds([...takenNumbers, number]);
      setAvailableSpendingIds(rest);
      return String(number);
    }

    return "No numbers available";
  };

  const releaseSpendingId = (spendingId: string): void => {
    const updatedTakenNumbers = takenNumbers.filter((n) => n !== spendingId);
    setTakenUniqueSpendingIds(updatedTakenNumbers);
    setAvailableSpendingIds([spendingId, ...availableSpendingIds]);
  };

  return {
    takenSpendingIds: takenNumbers,
    availableSpendingIds: availableSpendingIds,
    takeSpendingId: takeNumber,
    releaseSpendingId: releaseSpendingId,
  };
};

export default useUniqueSpendingIdBank;
