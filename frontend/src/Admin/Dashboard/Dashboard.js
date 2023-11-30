import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.scss";
import {
  UilThumbsUp,
  UilComments,
  UilBars,
  UilSearch,
  UilTachometerFastAlt,
  UilClockThree,
} from "@iconscout/react-unicons";
import {
  SolutionOutlined,
  UserOutlined,
  CheckOutlined,
  PayCircleOutlined,
} from "@ant-design/icons";
import { Modal, Avatar, Tooltip } from "antd";
import {
  doc,
  // onSnapshot,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { db, auth } from "../../Firebase/Config";
import TimeAgo from "react-timeago";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../Context/userContext";
import NavAdmin from "../NavAdmin/NavAdmin";
function Dashboard() {
  const { user } = useUserContext();
  const navigateSignout = useNavigate();
  const [addClass, setAddClass] = useState("open");
  const [isModalOpenSignOuts_admin, setIsModalOpenSignOut_admin] =
    useState(false);
  const [checkDelete, setCheckDelete] = useState(false);

  const [dataUser, setDataUser] = useState([]);

  //menu Toggle
  const modeToggle = () => {
    if (addClass === "open") {
      setAddClass("close");
    } else {
      setAddClass("open");
    }
  };
  ///sign out///
  // isModalOpenSignOut
  const admin_isModalOpenSignOut = () => {
    setIsModalOpenSignOut_admin(true);
  };
  const admin_handleOkSignOut = () => {
    auth.signOut();
    navigateSignout("/login");
  };
  const admin_handleCancelSignOut = () => {
    setIsModalOpenSignOut_admin(false);
  };

  // số user
  useEffect(() => {
    getDocs(collection(db, "user")).then((snapshot) => {
      let arrData = [];
      snapshot.forEach((s) => {
        arrData.push(s.data());
      });
      setDataUser(arrData);
    });
  }, []);
  //ModalEditUser
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [typeUser, setTypeUser] = useState("user");
  const [idEditUser, setIdEditUser] = useState("");
  const [changePasswordUser, setChangePasswordUser] = useState("");
  const showModalEditUser = (data) => {
    setOpen(true);
    setIdEditUser(data);
  };
  const handleOk = async () => {
    setConfirmLoading(true);
    await updateDoc(doc(db, "user", idEditUser), {
      roles: typeUser,
    });
    if (changePasswordUser !== "" && changePasswordUser.length >= 6) {
      await updateDoc(doc(db, "user", idEditUser), {
        password: changePasswordUser,
      });
      alert("Mật khẩu thay đổi thành công");
    } else {
      alert("Mật khẩu thay đổi không hợp lệ (ít nhất phải trên 6 ký tự)");
      setOpen(false);
      setConfirmLoading(false);
      setTypeUser("user");
      setChangePasswordUser("");
    }
    setOpen(false);
    setConfirmLoading(false);
    setTypeUser("user");
    setChangePasswordUser("");
    if (checkDelete) {
      await deleteDoc(doc(db, "user", idEditUser));
    }
    window.location.reload();
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const [sumBill,setSumBill]=useState([])
  // const [sumMoney,setSumMoney]=useState('')
  useEffect( () => {
    // let sumTotleMony = 0;
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5555/api/bills");
        setSumBill(response.data);
      } catch (error) {
        console.error("Error fetching drinks:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div id="AdMin">
      <NavAdmin
        admin_isModalOpenSignOut={admin_isModalOpenSignOut}
        admin_handleOkSignOut={admin_handleOkSignOut}
        admin_handleCancelSignOut={admin_handleCancelSignOut}
        isModalOpenSignOuts_admin={isModalOpenSignOuts_admin}
        addClass={addClass}
      />
      {/* <!-- dashboard --> */}
      <section className="dashboard">
        {/* <!-- top --> */}
        <div className="top">
          <UilBars className="i UilBars" onClick={modeToggle} />
          <div className="search-box">
            <UilSearch className="i" />
            <input type="text" placeholder="Search here..." />
          </div>
          <Avatar className="img_Avta" src={user.photoURL}>
            {user.photoURL ? user.photoURL : user.displayName}
          </Avatar>
        </div>
        {/* <!-- dash-content --> */}
        <div className="dash-content">
          <div className="overview">
            <div className="title">
              <UilTachometerFastAlt className="i" />
              <span className="text">Dashboard</span>
            </div>

            <div className="boxes">
              <div className="box box_50">
                <SolutionOutlined style={{ fontSize: "35px" }} className="i" />
                <span className="text">Tổng hóa đơn</span>
                <span className="number">{sumBill.length}</span>
              </div>
              {/* <div className="box box2">
                <PayCircleOutlined style={{ fontSize: "35px" }} className="i" />
                <span className="text">Tổng thu nhập</span>
                <span className="number">0</span>
              </div> */}
              <div className="box box_50 box4">
                <UserOutlined style={{ fontSize: "35px" }} className="i" />
                <span className="text">Tổng người dùng</span>
                <span className="number">{dataUser.length}</span>
              </div>
            </div>
          </div>

          <div className="activity">
            <div className="title">
              <UilClockThree className="i" />
              <span className="text">Recent Activity</span>
            </div>

            <div className="activity-data">
              <div>
                <span className="data-title">Name</span>
                <div className="data names">
                  {dataUser.map((data) => (
                    <span
                      key={data.uid}
                      style={{ cursor: "pointer" }}
                      className="data-list"
                      onClick={() => {
                        showModalEditUser(data.uid);
                      }}
                    >
                      <Tooltip title={data.displayName}>
                        {data.displayName}
                      </Tooltip>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="data-title">Email</span>
                <div className="data email">
                  {dataUser.map((data) => (
                    <span
                      key={data.uid}
                      style={{ cursor: "pointer" }}
                      className="data-list"
                      onClick={() => {
                        showModalEditUser(data.uid);
                      }}
                    >
                      <Tooltip title={data.email}>{data.email}</Tooltip>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="data-title">Password</span>
                <div className="data password">
                  {dataUser.map((data) => (
                    <span
                      key={data.uid}
                      style={{ cursor: "pointer" }}
                      className="data-list"
                      onClick={() => {
                        showModalEditUser(data.uid);
                      }}
                    >
                      <Tooltip title={data.password}>{data.password}</Tooltip>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="data-title">Type</span>
                <div className="data type">
                  {dataUser.map((data) => (
                    <span
                      key={data.uid}
                      className="data-list"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        showModalEditUser(data.uid);
                      }}
                    >
                      {data.roles}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="data-title">Joined</span>
                <div className="data joined">
                  {dataUser.map((data) => (
                    <span key={data.uid} className="data-list">
                      <TimeAgo date={data?.timestamp?.toDate()} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Modal edit user */}
      <Modal
        title="Edit user"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div className="Edit_type">
            <p>Type</p>
            <select
              value={typeUser}
              onChange={(e) => setTypeUser(e.target.value)}
              style={{
                padding: "5px 20px",
                borderRadius: "8px",
                userSelect: "none",
              }}
            >
              <option>user</option>
              <option>babyadmin</option>
              <option>admin</option>
            </select>
          </div>
          <div className="Edit_type">
            <p>Thay đổi mật khẩu</p>
            <input
              style={{
                padding: "5px",
                paddingLeft: "10px",
                borderRadius: "8px",
                border: "1px solid #000",
              }}
              value={changePasswordUser}
              onChange={(e) => setChangePasswordUser(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div>
            <button
              onClick={() => setCheckDelete(!checkDelete)}
              style={{
                backgroundColor: "#C7372F",
                color: "#fff",
                padding: "6px 10px",
                border: "none",
                borderRadius: "8px",
                marginTop: "15px",
                cursor: "pointer",
              }}
            >
              Xóa tài khoản
            </button>
            {checkDelete ? (
              <CheckOutlined
                style={{ color: "red", fontWeight: "bold", marginLeft: "12px" }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </Modal>
      {/* Modal edit user */}
    </div>
  );
}

export default Dashboard;
