import React, { createContext, useEffect, useState } from "react";

type TimerContextProps = {
  timeLeft: number | undefined;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
};

export const timerContext = createContext<TimerContextProps>(
  {} as TimerContextProps
);

export const TimerProvider = ({
  children,
  initialTimeLeft = 10,
  setDeath,
}: {
  children: React.ReactNode;
  initialTimeLeft: number;
  setDeath: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTimeLeft * 60);

  useEffect(() => {
    // Exit early when we reach 0
    if (timeLeft === 0) {
      setDeath(true);
    }

    // Save intervalId to clear the interval when the component re-renders
    const intervalId = setInterval(() => {
      // Decrease time left by one second
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [timeLeft, setDeath]);

  return (
    <timerContext.Provider
      value={{
        timeLeft,
        setTimeLeft,
      }}
    >
      {children}
    </timerContext.Provider>
  );
};
