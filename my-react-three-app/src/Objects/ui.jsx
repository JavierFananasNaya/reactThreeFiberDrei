import React, { useContext } from "react";
import { pickUpsContext } from "../Contexts/pick_ups_context.tsx";
import "./ui.scss";
const Ui = () => {
  const { pickUpCount, pickUps } = useContext(pickUpsContext);
  return (
    <>
      {<div className="ui">{`${pickUpCount} of ${pickUps.length} Books`}</div>}
    </>
  );
};

export default Ui;
