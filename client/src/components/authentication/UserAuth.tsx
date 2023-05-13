import React, { useEffect, useState } from "react";
import "./userAuth.scss";
import { AuthForm } from "../form";
import ClickButton from "../buttons/clickButton/ClickButton";
import {
  useAppSelector,
  selectUser,
  useAppDispatch,
  logout,
  closeAllNavbar,
  clearBag,
} from "../../store";
import { logoutUser } from "../../services";
import useWindowSize, { desktop, tablet } from "../../hooks/useWindowSize";
import { PopUp } from "..";
import { X_white } from "../../assets/icons";
import userImage from "../../assets/images/user.png";
const UserAuth: React.FC = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const user = useAppSelector(selectUser);
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();
  const onLogOut = () => {
    logoutUser().then((res) => {
      if (res === 200) {
        dispatch(logout());
        dispatch(clearBag());
        dispatch(closeAllNavbar(false));
      }
    });
  };
  const onCloseUserAuth = () => {
    dispatch(closeAllNavbar(false));
  };
  return (
    <>
      <div className="user-nav-container">
        {!user.userName && width < desktop - 1 && <LoginAndRegisterComponent />}
        {!user.userName && width > desktop - 1 && (
          <PopUp>
            <div className="popup-auth-container">
              <div className="popup-auth-close-container">
                <div className="close-icon" onClick={onCloseUserAuth}>
                  <X_white />
                </div>
              </div>
              <LoginAndRegisterComponent />
            </div>
          </PopUp>
        )}
        {user.userName && (
          <div className="user-logged-container">
            <div className="image-container">
              <img src={userImage} alt="" />
            </div>
            <div className="title-logged-container">
              <p>Hi {user.userName},enjoy Epicure</p>
              
            </div>
            <div className="logOut-btn">
            <ClickButton
                onClick={onLogOut}
                borderRadius="10px"
                backGroundColor="#d52a2adb"
                width="100px"
              >
                logout
              </ClickButton>
            </div>
       
          </div>
        )}
      </div>
    </>
  );
};

const LoginAndRegisterComponent: React.FC = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  return (
    <div className="user-auth-container">
      <h2 className="title-auth-container">sing in</h2>
      <p className="sub-title-auth-container">
        To continue the order, please sign in
      </p>
      <div className="auth-container">
        <AuthForm register={isRegister} />
      </div>
      <div className="switch-form-bar">
        <div className="line"></div>
        <div>
          <p>or</p>
        </div>
        <div className="line"></div>
      </div>
      <div className="switch-form-btn">
        <ClickButton secondary={true}>sing up</ClickButton>
      </div>
    </div>
  );
};
export default UserAuth;
