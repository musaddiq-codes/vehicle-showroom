import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import NoPage from "./pages/NoPage/NoPage";
import Navbar from "./pages/Navbar/Navbar";
import CarsPage from "./pages/CarsPage/CarsPage";
import VehiclesPage from "./pages/VehiclesPage/VehiclesPage";
import styles from './app.module.css'

export default function App() {
  return (
    <div className={styles.main_div}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<WelcomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vehicles" element={<VehiclesPage />} />
            <Route path="/cars" element={<CarsPage />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="login" element={<Login />} />

            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}