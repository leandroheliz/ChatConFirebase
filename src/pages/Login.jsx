import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth"

const Login = () => {

  const navigate = useNavigate();

  const { loginUser, loading, error, message, persistUser } = useContext(AuthContext);

  useEffect(() => {
    if(!persistUser()){
     return navigate('/admin/login')
    }else{
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
      const result = await loginUser(email, password)
      if(result === undefined){
        return;
      }else{
       navigate("/chat")
      }
    } catch (error) {
      
    }
  }

  return (
    <div className="container">
      <h2 className="text-center">Login to start getting chat</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" name="email" placeholder=" Email" className="inputs" value={newUser.email}
          onChange={handleInputChange} />
        </div>
        <div>
          <input type="new-password" name="password" placeholder=" Password" className="inputs" value={newUser.password}
          onChange={handleInputChange} />
        </div>
        {error && <p className='alert-error'>{message}</p>}
        <div className="flex justify-center">
         <input type="submit" value={!loading ? "Validating ..." : "Login"} className="inputsBtn btnRegister"/>
         </div>
      </form>
      <p>
       Does no Have an account? please register {''}
        <Link to={'/admin/register'}>Follow this link</Link>
      </p>
    </div>
  )
}

export default Login