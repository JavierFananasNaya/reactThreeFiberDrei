import React, { createContext, useState } from "react";

type PickUpsContextProps = {
  pickUps: Array<any> | undefined;
  pickUpCount: number;
  setPickUpCount(): void;
  setPickUps: React.Dispatch<React.SetStateAction<any[]>>;
};

export const pickUpsContext = createContext<PickUpsContextProps>(
  {} as PickUpsContextProps
);

export const PickUpsProvider = ({
  children,
  pickUpsData = [],
  setVictory,
}: {
  children: React.ReactNode;
  pickUpsData: Array<any>;
  setVictory: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const [pickUpCount, setPickUpCountState] = useState<number>(0);
  const [pickUps, setPickUps] = useState<Array<any>>(pickUpsData);

  const setPickUpCount = () => {
    setPickUpCountState((count) => {
      if (count + 1 < pickUps.length) {
        return count + 1;
      } else {
        setVictory(true);
        return pickUps.length;
      }
    });
  };

  return (
    <pickUpsContext.Provider
      value={{
        pickUps,
        setPickUps,
        pickUpCount,
        setPickUpCount,
      }}
    >
      {children}
    </pickUpsContext.Provider>
  );
};
