import { createContext, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBfHHdnzTeZhED0zjbXnPBLR7EsBcMLmM",
  authDomain: "chat-f8834.firebaseapp.com",
  projectId: "chat-f8834",
  storageBucket: "chat-f8834.appspot.com",
  messagingSenderId: "1066364058837",
  appId: "1:1066364058837:web:1ac5eb592fd02e41a4b65c",
};

const app = initializeApp(firebaseConfig);

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const createNewUser = async (email, password) => {
    try {
      setError(false);
      setLoading(true);
      if (email === "" || password === "") {
        setError(true);
        setMessage("Todos los campos son Requeridos");
        return;
      }
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(newUser.user);
      localStorage.setItem("chat-user", JSON.stringify({email}));
      setLoading(false);
      return newUser;
    } catch (error) {
      console.error("error",error);
      if(error.code === "auth/email-already-in-use"){
        setLoading(false);
        setError(true);
        setMessage("Usuario ya Registrado ( Inicie Sesión )");
        return;
      }
    } finally{
      setLoading(false);
    }
  }

  const loginUser = async (email, password) => {
    try {
      setError(false);
      setLoading(true);
      if (email === "" || password === "") {
        setError(true);
        setMessage("Todos los campos son Requeridos" || error.code === "auth/email-already-in-use");
      }
      const singInUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      localStorage.setItem("chat-user", JSON.stringify({email}));
      setUser(singInUser.user);
      setLoading(false);
      return singInUser;
    } catch (error) {
      if(error.code === "auth/wrong-password"){
        setError(true);
        setMessage("Credenciales Invalidas. (Usuario o Contraseña Incorrectos)" || error.code === "auth/wrong-password")
        setLoading(false);
        return
    }
    if(error.code === "auth/user-not-found"){
      setError(true);
      setMessage("Usuario no encontrado, Registrese" || error.code === "auth/wrong-password")
      setLoading(false);
      return
    }
    }finally{
      setLoading(false);
    }
  }

  const persistUser = () => {
    const userExist = localStorage.getItem("chat-user");
    if(userExist){
      const user = JSON.parse(userExist);
      setUser(user);
      return true
      } else{
        return false
    }}

    const singOut = () => {
      localStorage.removeItem("chat-user");
    }

  return (
    <AuthContext.Provider value={{ singOut, persistUser, createNewUser, loading, error, message, loginUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};
