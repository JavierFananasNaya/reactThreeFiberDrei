import React, { createContext, useState } from "react";

type PickUpsContextProps = {
  collisioningPickUp: string | undefined;
  pickUps: Array<any> | undefined;
  pickUpZone: boolean | undefined;
  setCollisioningPickUp(setTo: any | undefined): void;
  setPickUps(): void;
  setPickUpZone(setTo: boolean): void;
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
  const [collisioningPickUp, setCollisioningPickUpState] = useState<any>();
  const [pickUps, setPickUpsState] = useState<Array<any>>(pickUpsData);
  const [pickUpZone, setPickUpZoneState] = useState<boolean>(false);

  const setCollisioningPickUp = (setTo: any | undefined) => {
    setCollisioningPickUpState(setTo);
  };
  const setPickUps = () => {
    // TODO pending extract pickUp logic
    setPickUpsState(pickUps?.pop());
  };
  const setPickUpZone = (setTo: boolean) => {
    // TODO pending extract pickUp logic
    setPickUpZoneState(setTo);
  };

  return (
    <pickUpsContext.Provider
      value={{
        collisioningPickUp,
        pickUps,
        pickUpZone,
        setCollisioningPickUp,
        setPickUps,
        setPickUpZone,
      }}
    >
      {children}
    </pickUpsContext.Provider>
  );
};
