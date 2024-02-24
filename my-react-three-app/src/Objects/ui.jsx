import React, { useContext } from "react";
import { pickUpsContext } from "../Contexts/pick_ups_context.tsx";
import "./ui.scss";
const Ui = ({ timeLeft }) => {
  const { pickUpCount, pickUps } = useContext(pickUpsContext);
  return (
    <>
      <div className="ui">{`Books of awakening: ${pickUpCount}/${pickUps.length}`}</div>
      <div className="ui-time">{`${Math.floor(timeLeft / 60)}:${
        timeLeft % 60
      }`}</div>
    </>
  );
};

export default Ui;
