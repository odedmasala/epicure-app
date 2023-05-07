import React, { useState } from "react";
import "./Dropdown.scss";

interface DropdownButtonProps {
  dropdownLook: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onClick?: () => void;
}

const Dropdown: React.FC<DropdownButtonProps> = ({
  dropdownLook,
  children,
  isOpen,
  onClick
}) => {
  return (<>
    <div className="dropdown">
      <div onClick={onClick}>{dropdownLook}</div>
      {isOpen && <div className="dropdown-content">{children}</div>}

    </div>
  </>
  );
};

export default Dropdown;
