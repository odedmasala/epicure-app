import React, { useEffect, useState } from "react";
import { Logo, Search, User, Bag, ActiveBag } from "../../../assets/icons";
import { Link, useLocation, useParams } from "react-router-dom";
import "./DesktopNavbar.scss";
import {
  closeAllNavbar,
  selectBagDishes,
  selectBagTotalQuantity,
  selectCloseNow,
  selectIsOrderPlaced,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { BagShop, UserAuth } from "../../../components";

const DesktopNavbar: React.FC = () => {
  const location = useLocation();
  const closeNow = useAppSelector(selectCloseNow);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const BagDishes = useAppSelector(selectBagDishes);
  const IsOrderPlaced = useAppSelector(selectIsOrderPlaced);
  const TotalQuantity = useAppSelector(selectBagTotalQuantity);
  const dispatch = useAppDispatch();
  const toggleBag = (): void => {
    setIsBagOpen(!closeNow);
    setIsUserOpen(false);
    dispatch(closeAllNavbar(!closeNow));
  };
  const toggleUser = (): void => {
    setIsUserOpen(!closeNow);
    setIsBagOpen(false);
    dispatch(closeAllNavbar(!closeNow));
  }
  useEffect(() => {
    return (): void => {
      setIsBagOpen(false);
      setIsUserOpen(false);
      dispatch(closeAllNavbar(false));
    };
  },[]);

  return (
    <>
      <nav>
        <div className="desktop-navbar-container">
          <div className="left-navbar">
            <div>
              <Link to="/" className="navbar-logo">
                <Logo className="logo" />
                <h2>EPICURE</h2>
              </Link>
            </div>
            <div
              className={
                location.pathname.startsWith("/restaurants") ? "selected" : ""
              }
            >
              <Link to="/restaurants">
                <p>Restaurants</p>
              </Link>
            </div>
            <div
              className={
                location.pathname.startsWith("/chef") ? "selected" : ""
              }
            >
              <Link to="/chef">
                <p>Chefs</p>
              </Link>
            </div>
          </div>
          <div className="right-navbar">
            <div className="Search-container">
              <Search className="logo" />
            </div>
            <div className="User-container" onClick={toggleUser}>
              <User className="logo" />
            </div>
            <div className="Bag-container" onClick={toggleBag}>
              {BagDishes.length && !IsOrderPlaced  ? (
                <ActiveBag className="logo-bag" quantity={TotalQuantity} />
              ) : (
                <Bag className="logo" />
              )}
            </div>
            {isBagOpen && closeNow && <BagShop />}
            {isUserOpen && closeNow && <UserAuth />}
          </div>
        </div>
      </nav>
    </>
  );
};

export default DesktopNavbar;
