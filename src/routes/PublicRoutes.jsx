import {Routes, Route} from 'react-router-dom'
import AuthLayout from '../layout/AuthLayout'
import Login from '../pages/Login'
import Register from '../pages/Register'

const PublicRoutes = () => {
  return (
    <AuthLayout>
     <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
     </Routes>
    </AuthLayout>
  )
}

export default PublicRoutes