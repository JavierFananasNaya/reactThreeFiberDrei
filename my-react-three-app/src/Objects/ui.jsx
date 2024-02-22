import React, { useContext } from "react";
import { pickUpsContext } from "../Contexts/pick_ups_context.tsx";
import "./ui.scss";
const Ui = () => {
  const { pickUpCount, pickUps } = useContext(pickUpsContext);
  return (
    <>
      {
        <div className="ui">{`Books of awakening: ${pickUpCount}/${pickUps.length}`}</div>
      }
    </>
  );
};

export default Ui;
