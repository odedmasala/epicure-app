import React, { useEffect } from "react";
import {
  AboutSection,
  ChefOfTehWeekSection,
  DishSection,
  RestSection,
  SignatureSection,
} from "../../components";
import { Hero, OrderSuccess, PopUp } from "../../components";
import {
  closeAllNavbar,
  selectIsOrderPlaced,
  toggleOrderPlaced,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import useWindowSize, { desktop } from "../../hooks/useWindowSize";
const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const IsOrderPlaced = useAppSelector(selectIsOrderPlaced);
  const sendCloseNavbar = ():void => {
    dispatch(closeAllNavbar(false));
  };

  return (
    <>
      {IsOrderPlaced && width > desktop - 1 && (
         <PopUp>
          <OrderSuccess isPopUp={true}/>
        </PopUp>
      )}
      <div onClick={sendCloseNavbar}>
        <Hero />
        <RestSection />
        <DishSection />
        <SignatureSection />
        <ChefOfTehWeekSection />
        <AboutSection />
      </div>
    </>
  );
};

export default HomePage;
