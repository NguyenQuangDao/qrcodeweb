import React from "react";
import "./NavChildAdmin.scss";
import { UilEstate } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import {  ShoppingOutlined,SearchOutlined } from "@ant-design/icons";
function NavChildAdmin() {
  return (
    <div className="NavChildAdmin">
      <nav>
        <span>
          <Link to="/admin" style={{ display: "flex" }}>
            <UilEstate className="i" />
            <p className="link-name">Dahsboard</p>
          </Link>
        </span>
        <span>
        <Link to="/addvoucher" style={{ display: "flex" }}>
          <ShoppingOutlined className="i" />
          <p className="link-name">Thêm Voucher</p>
        </Link>
        </span>
        <span>
        <Link to="/searchbill" style={{ display: "flex" }}>
          <SearchOutlined className="i" />
          <p className="link-name">Search hóa đơn</p>
        </Link>
        </span>
      </nav>
    </div>
  );
}

export default NavChildAdmin;
