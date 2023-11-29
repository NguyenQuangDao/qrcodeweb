import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/Config";
import { useNavigate } from "react-router-dom";
// import { v4 as uuidv4 } from 'uuid';
const UserContext = createContext({});
export const useUserContext = () => useContext(UserContext);
export const ContextProivider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  //signInWithPassword
  const signInWithPassword = (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
    navigate("/");
  };

  //onAuthStateChanged
  useEffect(() => {
    setLoading(true);
    const unsubcribe = onAuthStateChanged(auth, async (res) => {
      if (res) {
        setLoading(false);
        // admin
        await getDoc(doc(db, "user", res.uid)).then((doc) => {
          setUser(doc.data());
          if (doc.data().roles === "admin") {
            navigate("/admin");
          } else if (doc.data().roles === "babyadmin") {
            navigate("/babyadmin");
          } else {
            navigate("/");
          }
        });
        //If the account does not exist in the database => login
      } else {
        setLoading(false);
        navigate("/login");
      }
    });
    return () => {
      unsubcribe();
    };
  }, []);
  const contextValue = {
    user,
    loading,
    signInWithPassword,
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
