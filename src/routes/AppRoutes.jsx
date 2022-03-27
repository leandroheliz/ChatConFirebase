import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../pages/Login"
import MainChat from "../pages/MainChat"
import Register from "../pages/Register"

const AppRoutes = () => {
  return (
    <>
  <BrowserRouter>
  <Routes>
    <Route path="/chat" element={<MainChat />} />
    <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
  </Routes>
  </BrowserRouter>
    </>
  )
}

export default AppRoutes