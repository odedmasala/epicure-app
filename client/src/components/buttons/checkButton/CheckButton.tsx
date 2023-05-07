import React, { useEffect, useState } from "react";
import {
  CheckCircleOn,
  CheckCircleOff,
  CheckOff,
  CheckOn,
} from "../../../assets/icons";
import "./checkButton.scss";

interface CheckButtonPropsType {
  checked: boolean;
  Circle?: boolean;
  onCheck?: () => void;
}
const CheckButton: React.FC<CheckButtonPropsType> = ({ checked, Circle, onCheck, }) => {
  return (
      <div>
        {!Circle && ( <div className="check-btn" onClick={onCheck}> {checked ? <CheckOn /> : <CheckOff />} </div> )}
        {Circle && ( <div className="check-btn" onClick={onCheck}> {checked ? <CheckCircleOn /> : <CheckCircleOff />} </div> )}
      </div>
  );
};

export default CheckButton;
