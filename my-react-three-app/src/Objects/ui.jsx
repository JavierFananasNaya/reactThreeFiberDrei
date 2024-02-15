import React, { useContext } from "react";
import { pickUpsContext } from "../Contexts/pick_ups_context.tsx";

const Ui = () => {
  const {pickUpCount, pickUps} = useContext(pickUpsContext)
  return (
    <>
    {
      <div
      style={{
          color: "white", // Set text color
          padding: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: add background color
          borderRadius: "8px", // Optional: add border radius
          position: "absolute",
          top: "10vh",
          left: "10vw",
        }}
        >
        {`${pickUpCount} of ${pickUps.length} Books`}
        </div>
}
    </>
  );
};

export default Ui;
