import React, { useState, memo } from "react";
import "./NavBar.scss";
import { auth } from "../../../Firebase/Config";
import { Modal, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import {useUserContext} from '../../../Context/userContext';
function NavBar() {
  const { user } = useUserContext();
  const navigateSignout = useNavigate();
  const [isModalOpenSignOuts, setIsModalOpenSignOut] = useState(false);
  const [togleMenuPhone, setTogMenuPhone] = useState(false);
  //item
  // const items = [
    // {
    //   label: <Link to="/">Home</Link>,
    //   key: "1",
    // },
    // {
    //   label: <Link to="/posts">Posts</Link>,
    //   key: "2",
    // },
  // ];
  // isModalOpenSignOut
  const isModalOpenSignOut = () => {
    setIsModalOpenSignOut(true);
  };
  const handleOkSignOut = () => {
    localStorage.removeItem("billData");
    auth.signOut();
    navigateSignout("/login");
  };
  const handleCancelSignOut = () => {
    setIsModalOpenSignOut(false);
  };

  return (
    <div className="warpper">
      <div className="warpper_MenuOutlined">
        <div className="togleMenuPhone">
          <div>
            <MenuOutlined
              className="warpper_MenuOutlined_icon"
              onClick={(e) => setTogMenuPhone(!togleMenuPhone)}
            />
          </div>
          <div className="logOut_phone" onClick={isModalOpenSignOut}>
            <p className="btn btn-logOut">Sign out</p>
          </div>
        </div>
        {/* {togleMenuPhone && (
          <Menu className="togleMenuPhone_Menu" mode="inline" items={items} />
        )} */}
      </div>
      <div id="top">
        <div className="logo">
          <h4>Xin chào: {user.displayName}
          </h4>
        </div>
        <div className="nav">
          <Link to="/">Home</Link>
        </div>
        <div className="logOut" onClick={isModalOpenSignOut}>
          <p className="btn btn-logOut">Sign out</p>
        </div>
        <Modal
          title="Sign out"
          open={isModalOpenSignOuts}
          onCancel={handleCancelSignOut}
          onOk={handleOkSignOut}
          closable={false}
        >
          <p>Are you sure you want to sign out?</p>
        </Modal>
      </div>
    </div>
  );
}

export default memo(NavBar);
