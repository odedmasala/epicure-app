import React, { useEffect, useState } from "react";
import "./navbar.scss";
import useWindowSize, { desktop } from "../../hooks/useWindowSize";
import MobileNavbar from "./Mobile/MobileNavbar";
import DesktopNavbar from "./desktop/DesktopNavbar";

const Navbar: React.FC = () => {
  const { width } = useWindowSize();
  return (
    <>
      {width && width >= desktop && <DesktopNavbar />}
      {width && width < desktop - 1 && <MobileNavbar />}
    </>
  );
};

export default Navbar;
