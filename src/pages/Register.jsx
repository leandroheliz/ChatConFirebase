import React, {useState, useContext, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from '../context/auth'
import AuthLayout from '../layout/AuthLayout';
import Footer from '../layout/Footer'

const Register = () => {

  const navigate = useNavigate();

  const {createNewUser, loading, error, message, persistUser} = useContext(AuthContext);

  useEffect(() => {
    if(persistUser()){
    //  return navigate('/')
    // }else{
      return navigate('/chat')  
      }
   //eslint-disable-next-line
  }, [])

  const [ newUser, setNewUser ] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {email, password} = newUser;
     const result = await createNewUser(email, password)
     if(result === undefined){
       return;
     }else{
      navigate("/chat")
     }
    } catch (error) {
      console.error('Error creating user', error)
    }
  }

  return (
    <>
    <div className="container">
      <AuthLayout/>
      <br/>
      <div className='flex justify-center'>
      <h4 className="text-center">Registrate para Utilizar el Chat.</h4>
      </div>
      <br/>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" name="email" placeholder=" Correo" className="inputs" value={newUser.email}
          onChange={handleInputChange} />
        </div>
        <div>
          <input type="password" name="password" placeholder=" Contraseña" className="inputs" value={newUser.password}
         onChange={handleInputChange} />
        </div>
          {error && <p className='alert-error'>{message}</p>}
        <div className="flex justify-center">
        <input type="submit" value={!loading ? "Validando ..." : "Registrarme"} className="inputsBtn btnRegister"/>
         </div>
      </form>
        <i className="fa-brands fa-rocketchat fa-2x"></i>
        <br/>
      <p>
      ¿Tenes cuenta? Inicia Sesión. {''}
        <Link to={'/'}>Sigue este Link</Link>
      </p>
    </div>
    <Footer/>
          </>
  )
}

export default Register