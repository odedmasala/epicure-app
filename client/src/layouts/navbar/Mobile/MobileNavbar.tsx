import React, { useEffect, useState } from "react";
import {
  Logo,
  Hamburger,
  Search,
  User,
  Bag,
  X_dark,
  ActiveBag,
} from "../../../assets/icons";
import "./MobileNavbar.scss";
import { Link, useLocation } from "react-router-dom";
import { BagShop, OrderSuccess, UserAuth } from "../../../components/";
import { InputSearch } from "../../../components";
import {
  selectCloseNow,
  useAppSelector,
  selectBagDishes,
  selectBagTotalQuantity,
  useAppDispatch,
  closeAllNavbar,
  selectIsOrderPlaced,
} from "../../../store";
const MobileNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const location = useLocation();
  const closeNow = useAppSelector(selectCloseNow);
  const IsOrderPlaced = useAppSelector(selectIsOrderPlaced);
  const BagDishes = useAppSelector(selectBagDishes);
  const TotalQuantity = useAppSelector(selectBagTotalQuantity);
  const dispatch = useAppDispatch();

  const toggleMenu = (): void => {
    setIsMenuOpen(!closeNow);
    setIsSearchOpen(false);
    setIsBagOpen(false);
    setIsUserOpen(false);
    dispatch(closeAllNavbar(!closeNow));
  };
  const toggleSearch = (): void => {
    setIsSearchOpen(!closeNow);
    setIsBagOpen(false);
    setIsUserOpen(false);
    dispatch(closeAllNavbar(!closeNow));
  };
  const toggleBag = (): void => {
    setIsBagOpen(!closeNow);
    setIsSearchOpen(false);
    setIsMenuOpen(false);
    setIsUserOpen(false);
    dispatch(closeAllNavbar(!closeNow));
  };
  const toggleUser = (): void => {
    setIsUserOpen(!closeNow);
    setIsSearchOpen(false);
    setIsBagOpen(false);
    setIsMenuOpen(false);
    dispatch(closeAllNavbar(!closeNow));
  };
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setIsBagOpen(false);
    setIsUserOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    return (): void => {
      setIsMenuOpen(false);
      setIsSearchOpen(false);
      setIsBagOpen(false);
      setIsUserOpen(false);
      dispatch(closeAllNavbar(false));
    };
  }, []);
  return (
    <>
      <div
        className={
          isSearchOpen ? "mobile-nav-bar search-nav-clicked" : "mobile-nav-bar"
        }
      >
        <div className="right-navbar">
          {(isMenuOpen && closeNow) ||
          (isSearchOpen && closeNow) ||
          (isUserOpen && closeNow) ? (
            <div onClick={isMenuOpen ? toggleMenu : toggleSearch}>
              <X_dark className="hamburger-icon" />
            </div>
          ) : (
            <div onClick={toggleMenu}>
              <Hamburger className="hamburger-icon" />
            </div>
          )}
        </div>
        {(!isMenuOpen && !isSearchOpen && !isUserOpen) || !closeNow ? (
          <div className={"left-navbar"}>
            <div>
              <Link to={"/"}>
                <Logo className="navbar-logo" />
              </Link>
            </div>
            <div className="icons-container">
              <div onClick={toggleSearch}>
                <Search className="icon" />
              </div>
              <div onClick={toggleUser}>
                <User className="icon" />
              </div>
              <div onClick={toggleBag}>
                {BagDishes.length && !IsOrderPlaced ? (
                  <ActiveBag className="icon-bag" quantity={TotalQuantity} />
                ) : (
                  <Bag className="icon" />
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            {isSearchOpen && closeNow && (
              <div className="search-title">
                <p>search</p>
              </div>
            )}
          </>
        )}
        {isMenuOpen && closeNow && <MenuNav setMenu={toggleMenu} />}
        {isBagOpen && closeNow && <BagShop />}
        {isSearchOpen && closeNow && <MobileSearchNav />}
        {isUserOpen && closeNow && <UserAuth />}
        {IsOrderPlaced && (
          <div className="nav-bag-container">
            <OrderSuccess />
          </div>
        )}
      </div>
    </>
  );
};

const MenuNav: React.FC<{ setMenu: () => void }> = ({ setMenu }) => {
  return (
    <div className="menu-nav">
      <div className="top-menu">
        <Link to="/restaurants">
          <p onClick={setMenu}>Restaurants</p>
        </Link>
        <Link to="/chef">
          <p onClick={setMenu}>Chef</p>
        </Link>
      </div>
      <div className="bottom-menu">
        <Link to="/contact">
          <p onClick={setMenu}>Contact Us</p>
        </Link>
        <Link to="/term">
          <p onClick={setMenu}>Term of use</p>
        </Link>
        <Link to="/policy">
          <p onClick={setMenu}> Privacy Policy</p>
        </Link>
      </div>
    </div>
  );
};

const MobileSearchNav: React.FC = () => {
  return (
    <div className="search-nav">
      <div className="search-container">
        <InputSearch mobileNav={true} />
      </div>
    </div>
  );
};
export default MobileNavbar;
