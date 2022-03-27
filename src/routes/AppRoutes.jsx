import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainChat from "../pages/MainChat"
import PublicRoutes from "./PublicRoutes"

const AppRoutes = () => {
  return (
    <>
  <BrowserRouter>
  <Routes>
    <Route path="/chat" element={<MainChat />} />
    <Route path="/admin/*" element={<PublicRoutes />} />
  </Routes>
  </BrowserRouter>
    </>
  )
}

export default AppRoutes