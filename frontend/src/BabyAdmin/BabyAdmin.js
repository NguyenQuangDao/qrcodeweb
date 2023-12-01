import React, { memo } from "react";
import "./BabyAdmin.scss";
import NavBar from "../components/Share/NavBar/NavBar";
import FormBabyAdmin from "./cpnBabyAdmin/formBbAdmin/FormBabyAdmin";
import SearchBill from "../Admin/Dashboard/SearchBill/SearchBill";
// import DrinkForm from "./cpnBabyAdmin/ChooseDrink/ChooseDrink";
function BabyAdmin() {
  return (
    <div id="babyadmin">
      <NavBar />
      <h3 style={{ textAlign: "center", margin: "20px", fontSize:'28px' }}>Nhập hóa đơn</h3>
      <FormBabyAdmin />
      {/* <DrinkForm/> */}
      <div style={{marginTop:'100px'}}></div>
      <SearchBill/>
    </div>
  );
}

export default memo(BabyAdmin);
