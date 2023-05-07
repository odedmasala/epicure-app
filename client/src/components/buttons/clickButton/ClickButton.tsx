import React from "react";
import "./clickButton.scss";
import { Lock, Search } from "../../../assets/icons";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean
  width?: string;
  height?: string;
  primaryBlack?: boolean;
  primaryGray?: boolean;
  secondary?: boolean;
  secondaryBlack?: boolean;
  icon?: boolean;
  backGroundColor?: string;
  borderRadius?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const ClickButton: React.FC<ButtonProps> = ({
  children,
  height,
  icon,
  primaryBlack,
  primaryGray,
  secondary,
  secondaryBlack,
  width,
  type,
  backGroundColor,
  borderRadius,
  disabled=false,
  onClick,
}) => {
  const primaryBlackClass = primaryBlack ? "primary-black" : "";
  const primaryGrayClass = primaryGray ? "primary-gray" : "";
  const secondaryClass = secondary ? "secondary" : "";
  const secondaryBlackClass = secondaryBlack ? "secondary-black" : "";
  const iconClass = icon ? "icon-btn" : "";
  const disabledBtn = disabled ? "disabled" : "";
  return (
    <button type={type} disabled={disabled} className={`click-btn ${disabledBtn} ${primaryBlackClass} ${primaryGrayClass} ${secondaryClass} ${secondaryBlackClass} ${iconClass}`} style={{ borderRadius:borderRadius,backgroundColor:backGroundColor,width: width, height: height }} onClick={onClick} >
      <div className="icon-container">
        <Lock />
      </div>
      {children}
    </button>
  );
};

export default ClickButton;
