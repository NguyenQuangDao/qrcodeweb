import React from "react";
import "./Register.scss";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../../Firebase/Config";
import {
  collection,
  serverTimestamp,
  setDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
function Register() {
  const auth = getAuth();
  const navigate = useNavigate();
  //set err
  const [error, setError] = message.useMessage();
  //register
  const onSubmitRegister = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const PasswordConfirm = e.target[3].value;
    if (password !== PasswordConfirm) {
      error.open({
        type: "error",
        content: "Mật khẩu xác nhận không trùng khớp",
      });
      return;
    }
    const q = query(collection(db, "user"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (email && password && displayName) {
      // query check email already exist
      try {
        if (!querySnapshot.empty) {
          error.open({
            type: "error",
            content: "Tài khoản đã tồn tại",
          });
          return;
        } else {
          const res = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          await setDoc(doc(db, "user", res.user.uid), {
            displayName,
            email: email,
            password:password,
            uid: res.user.uid,
            timestamp: serverTimestamp(),
            roles: "user",
          });
        }
      } catch (err) {
        console.log(err);
      }
      navigate("/login");
    }
  };
  return (
    <div className="register">
      {/* error */}
      {setError}
      {/* error */}
      <div className="form_container">
        <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
          <div className="wrapper wrapper--w680">
            <div className="card card-4">
              <div className="card-body">
                <div className="logo_container">
                  <h2 className="title">Đăng kí tài khoản</h2>
                </div>
                <form onSubmit={(e) => onSubmitRegister(e)}>
                  <div className="row row-space">
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label">
                          Username <span style={{ color: "#F3453F" }}>*</span>
                        </label>
                        <input
                          className="input--style-4"
                          type="text"
                          name="username"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label">
                          Email <span style={{ color: "#F3453F" }}>*</span>
                        </label>
                        <input
                          className="input--style-4"
                          type="email"
                          name="email"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label">
                          Password <span style={{ color: "#F3453F" }}>*</span>
                        </label>
                        <input
                          className="input--style-4"
                          type="text"
                          name="password"
                          minLength={6}
                        />
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label">
                          Password confirm{" "}
                          <span style={{ color: "#F3453F" }}>*</span>
                        </label>
                        <input
                          className="input--style-4"
                          type="text"
                          name="password"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-t-15">
                    <button className="register_btn" type="submit">
                      Đăng kí
                    </button>
                  </div>
                  <div style={{ textAlign: "center", marginTop: "30px" }}>
                    <p style={{ fontSize: "0.8rem" }}>
                      Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="vendor/select2/select2.min.js"></script>
        <script src="vendor/datepicker/moment.min.js"></script>
        <script src="vendor/datepicker/daterangepicker.js"></script>
        <script src="js/global.js"></script>
      </div>
    </div>
  );
}

export default Register;
