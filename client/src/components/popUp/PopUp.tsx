import React, { useState, useEffect, useRef } from "react";
import "./PopUp.scss";
import { X_dark, X_white } from "../../assets/icons";

interface PopupProps {
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ children }) => {
  return <div className="popup-container">{children}</div>;
};

export default Popup;
