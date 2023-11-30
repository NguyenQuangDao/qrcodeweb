import React from "react";
import "./NavAdmin.scss";
import { UilEstate, UilSignout, UilMoon } from "@iconscout/react-unicons";
import { SearchOutlined,ShoppingOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { Link } from "react-router-dom";

function NavAdmin(props) {
  const {
    admin_isModalOpenSignOut,
    admin_handleOkSignOut,
    admin_handleCancelSignOut,
    isModalOpenSignOuts_admin,
    addClass,
  } = props;
  return (
    <nav className={addClass == "open" ? "open" : "close"}>
      <div className="logo-name">
        <div className="logo-image">
        </div>
        <span className="logo_name textCenter">Page Admin</span>
      </div>

      <div className="menu-items">
        <ul className="nav-links">
          <li>
            <span>
              <Link to="/admin" style={{ display: 'flex' }}>
                <UilEstate className="i" />
                <p className="link-name">Dahsboard</p>
              </Link>
            </span>
          </li>
          <li>
            <span>
              <Link to="/addvoucher" style={{ display: 'flex' }}>
                <ShoppingOutlined className="i" />
                <p className="link-name">Tạo Voucher</p>
              </Link>
            </span>
          </li>
          <li>
            <span>
              <Link to="/searchbill" style={{ display: 'flex' }}>
                <SearchOutlined className="i" />
                <p className="link-name">Search Hóa Đơn</p>
              </Link>
            </span>
          </li>
        </ul>

        <ul className="logout-mode">
          <li onClick={admin_isModalOpenSignOut}>
            <span>
              <UilSignout className="i" />
              <span className="link-name">Logout</span>
            </span>
          </li>
          <Modal
            title="Sign out"
            open={isModalOpenSignOuts_admin}
            onCancel={admin_handleCancelSignOut}
            onOk={admin_handleOkSignOut}
            closable={false}
          >
            <p>Are you sure you want to sign out?</p>
          </Modal>

          <li className="mode">
            <span>
              <UilMoon className="i sidebar-toggle" />
              <span className="link-name">Dark Mode</span>
            </span>
            <div>
              <span className="switch"></span>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavAdmin;
