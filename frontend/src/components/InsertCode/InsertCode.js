import React, { useState } from "react";
import "./InsertCode.scss";
import InvoiceBill from "../Share/InvoiceBill/InvoiceBill";
import { message } from "antd";
import axios from "axios";

function InsertCode() {
  const [successMess, setSuccessMess] = message.useMessage();
  const [valueSearchCode, setValueSearchCode] = useState("");
  const [billData, setBillData] = useState([]);

  const handleSearchCode = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5555/api/bills/${valueSearchCode}`
      );
      localStorage.setItem("billData", JSON.stringify(response.data));
      setBillData(response.data);
      successMess.open({
        type: "success",
        content: "Tra cứu hóa đơn thành công",
      });
    } catch (error) {
      console.error("Error fetching drinks:", error);
      successMess.open({
        type: "success",
        content: "Tra cứu hóa đơn thất bại",
      });
    }
  };

  return (
    <div id="InsertCode">
      <div className="form_container">
        <div className="title_container">
          <p className="title">Tra cứu</p>
          <span className="subtitle">Nhập mã voucher tại đây</span>
        </div>
        <div className="input_container">
          <label className="input_label" htmlFor="email_field">
            Code
          </label>
          <input
            placeholder="TXTXXXXXX"
            title="Email"
            name="input-name"
            type="text"
            className="input_field"
            id="email_field"
            value={valueSearchCode}
            onChange={(e) => setValueSearchCode(e.target.value)}
          />
        </div>

        <button className="sign-in_btn" onClick={handleSearchCode}>
          <span>Tra cứu</span>
        </button>
      </div>
      <InvoiceBill billData={billData} />
    </div>
  );
}

export default InsertCode;