import React, { useContext } from "react";
import { pickUpsContext } from "../Contexts/pick_ups_context.tsx";
import "./ui.scss";
import { timerContext } from "../Contexts/timer_context.tsx";

export const Ui = () => {
  const { pickUpCount, pickUps } = useContext(pickUpsContext);
  const { timeLeft } = useContext(timerContext);
  const minutes = Math.floor(timeLeft / 60).toString();
  const seconds =
    timeLeft % 60 >= 10 ? (timeLeft % 60).toString() : `0${timeLeft % 60}`;
  return (
    <>
      <div className="ui">{`Books of awakening: ${pickUpCount}/${pickUps.length}`}</div>
      <div className="ui-time">{`${minutes}:${seconds}`}</div>
    </>
  );
};

