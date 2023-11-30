import React, { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker, Space } from "antd";
import NavChildAdmin from "../../NavChildAdmin/NavChildAdmin";
import InvoiceBill from "../../../components/Share/InvoiceBill/InvoiceBill";
const { RangePicker } = DatePicker;
function SearchBill() {
  const [dateRange, setDateRange] = useState([]);
  const [billToDate, setBillToDate] = useState([]);
  const handleDateChange = (dates) => {
    setDateRange(dates);
  };
  useEffect(() => {
    const fetchDateData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/api/records?startDate=${dateRange[0]?.format(
            "YYYY-MM-DD"
          )}&endDate=${dateRange[1]?.format("YYYY-MM-DD")}`
        );
        setBillToDate(response.data);
      } catch (error) {
        console.error("Error fetching drinks:", error);
      }
    };
    fetchDateData();
  }, [dateRange]);
  console.log(billToDate);
  return (
    <div>
      <NavChildAdmin />
      <div
        style={{
          display: "flex",
margin:'50px',
          justifyContent:'center'
        }}
      >
        <p className="fontRobo24 textCenter">Tra cứu hóa đơn</p>

        <RangePicker
          style={{ margin: "0px 0 0 50px",border:'2px solid #000' }}
          onChange={handleDateChange}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {billToDate ? (
          billToDate?.map((billData) => (
            <InvoiceBill key={billData.billID} billData={billData} />
          ))
        ) : (
          <h2 className="textCenter fontRobo32">Không có đơn nào</h2>
        )}
      </div>
    </div>
  );
}

export default SearchBill;
