import { useState, useEffect } from "react";

const useUniqueIdBank = (): {
  takenNumbers: number[];
  availableNumbers: number[];
  takeUniqueId: () => string;
  releaseNumber: (number: number) => void;
} => {
  const [takenNumbers, setTakenNumbers] = useState<number[]>([]);
  const [availableNumbers, setAvailableNumbers] = useState<number[]>([]);

  useEffect(() => {
    const bank: number[] = [];
    for (let i = 1000; i < 1100; i++) {
      bank.push(i);
    }
    setAvailableNumbers(bank);
  }, []);

  const takeUniqueId = (): string => {
    if (availableNumbers.length > 0) {
      const [number, ...rest] = availableNumbers;
      setTakenNumbers([...takenNumbers, number]);
      setAvailableNumbers(rest);
      return String(number);
    }

    return "No numbers available";
  };

  const releaseNumber = (number: number): void => {
    const updatedTakenNumbers = takenNumbers.filter((n) => n !== number);
    setTakenNumbers(updatedTakenNumbers);
    setAvailableNumbers([number, ...availableNumbers]);
  };

  return {
    takenNumbers,
    availableNumbers,
    takeUniqueId,
    releaseNumber,
  };
};

export default useUniqueIdBank;
