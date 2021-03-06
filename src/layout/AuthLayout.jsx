import icon from "../assets/icono.png";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <nav className="flex items-center justify-center">
        <img src={icon} alt="" className="chatIcon" />
        <p className="chat-slogan">¡ Comencemos un chat !</p>
      </nav>
      {children}
    </div>
  );
};

export default AuthLayout;
