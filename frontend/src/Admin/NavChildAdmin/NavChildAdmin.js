import React from "react";
import "./NavChildAdmin.scss";
import { Link } from "react-router-dom";
import { ShoppingOutlined, SearchOutlined,HomeOutlined } from "@ant-design/icons";
function NavChildAdmin() {
  return (
    <div className="NavChildAdmin">
      <nav>
        <div>
          <Link to="/admin" style={{ display: "flex", lineHeight:'40px'}}>
            <HomeOutlined className="i" />
            <p className="link-name MyTikTok2" style={{}}>
              Dahsboard
            </p>
          </Link>
        </div>
        <div>
          <Link to="/addvoucher" style={{ display: "flex"  ,lineHeight:'40px'}}>
            <ShoppingOutlined className="i" />
            <p className="link-name MyTikTok2">Voucher</p>
          </Link>
        </div>
        <div>
          <Link to="/searchbill" style={{ display: "flex" ,lineHeight:'40px'}}>
            <SearchOutlined className="i" />
            <p className="link-name MyTikTok2">Search</p>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default NavChildAdmin;
