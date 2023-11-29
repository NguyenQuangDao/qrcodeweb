import React, { memo } from "react";
import "./InvoiceBill.scss";
import imgCoffe from "../../../asset/image/coffe.jpg";
function InvoiceBill(props) {
  return (
    <div id="invoice">
      <img className="imgCoffe" src={imgCoffe} alt="logo menu" />
      <div className="infomationBill">
        <div
          className="header fontRobo32 textCenter"
          style={{ lineHeight: "50px", color: "#512D14" }}
        >
          Hóa đơn
        </div>
        <div
          className="header fontPaytone14 textCenter"
          style={{ marginBottom: "15px" }}
        >
          Ngày: 12/12/2023
        </div>
        <div className="informationHoaDon">
          <tr>
            <td className="fontRobo16">MÃ HÓA ĐƠN:</td>
            <td className="fontRobo16">{props.billData.billID}</td>
          </tr>
          <tr>
            <td className="fontRobo16">TÊN KHÁCH HÀNG</td>
            <td className="fontRobo16">{props.billData.customerName}</td>
          </tr>
          <tr>
            <td className="fontRobo16">SỐ LƯỢNG NGƯỜI</td>
            <td className="fontRobo16">{props.billData.numCustomer}</td>
          </tr>
          <div className="line"  style={{ marginLeft: "5px", marginTop:'5px' }}></div>
        </div>
        <table>
          <tr>
            <th className="fontPaytone14 ">STT</th>
            <th className="fontPaytone14 ">Đồ uống</th>
            <th className="fontPaytone14 parallelogram">Số lượng</th>
            <th className="fontPaytone14 parallelogram">Giá</th>
            <th className="fontPaytone14 ">Tổng</th>
          </tr>
          {props.billData?.drinks?.map((drink, index) => (
            <tr className="InfoDrinkChild" key={index}>
              <td className="fontRobo14 textCenter">{index + 1}</td>
              <td className="fontRobo14 textCenter">{drink.drink}</td>
              <td className="fontRobo14 textCenter">{drink.quantity}</td>
              <td className="fontRobo14 textCenter">{drink.quantity}</td>
              <td className="fontRobo14 textCenter">{drink.quantity}</td>
            </tr>
          ))}
        </table>
        <div className="SumPay">
          <tr>
            <td className="fontPaytone16">Tổng tiền</td>
            <td className="fontRobo14 textCenter">100</td>
          </tr>
          <tr>
            <td className="fontPaytone16">Giảm giá</td>
            <td className="fontRobo14 textCenter">20</td>
          </tr>
          <tr>
            <td className="fontPaytone16">Tổng cộng</td>
            <td className="fontRobo14 textCenter">80</td>
          </tr>
        </div>
        <div className="fontPaytone16 textCenter mgt40">
          Cảm ơn quý khách đã sử dụng dịch vụ
        </div>
      </div>
    </div>
  );
}
export default memo(InvoiceBill);
