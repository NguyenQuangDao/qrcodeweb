import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ContextProivider } from "./Context/userContext";
import PageHome from "./components/PageHome/PageHome";
import Login from "./components/Authentication/Login/Login";
import Register from "./components/Authentication/Register/Register";
import Dashboard from "./Admin/Dashboard/Dashboard";
import BabyAdmin from "./BabyAdmin/BabyAdmin";

function App() {
  return (
    <div className="App">
      <ContextProivider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PageHome />} />
          {/* BabyAdmin */}
          <Route path="/babyadmin" element={<BabyAdmin />} />
          {/* Admin */}
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
      </ContextProivider>
    </div>
  );
}

export default App;
