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
}: {
  children: React.ReactNode;
  pickUpsData: Array<any>;
}): JSX.Element => {
  const [pickUpCount, setPickUpCountState] = useState<number>(0);
  const [pickUps, setPickUps] = useState<Array<any>>(pickUpsData);

  const setPickUpCount = () => {
    setPickUpCountState((count) => count + 1);
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
