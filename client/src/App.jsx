// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import Layout from "./pages/CarsPage/CarsPage";
import Dashboard from "./pages/Dashboard/Dashboard";
// import Signup from "./components/Signup/SignUps";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import NoPage from "./pages/NoPage/NoPage";
import Navbar from "./pages/Navbar/Navbar";



export default function App() {
  return (
    <div className="bg-blue-300">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>

            <Route index element={<WelcomePage />} />

            <Route path="dashboard" element={<Dashboard />} />
            {/* <Route path="blogs" element={<Dashboard />} />
            <Route path="blogs" element={<Dashboard />} /> */}

            <Route path="/signup" element={<Signup />} />
            <Route path="login" element={<Login />} />

            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}