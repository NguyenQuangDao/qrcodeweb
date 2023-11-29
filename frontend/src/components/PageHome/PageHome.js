import React from "react";

import NavBar from "../Share/NavBar/NavBar";
// import InvoiceBill from "../Share/InvoiceBill/InvoiceBill";
import InsertCode from "../InsertCode/InsertCode";
function PageHome() {
  return (
    <>
      <NavBar />
      <div
        style={{
         height:'100vh',
        }}
      >
        <InsertCode />
      </div>
    </>
  );
}

export default PageHome;
