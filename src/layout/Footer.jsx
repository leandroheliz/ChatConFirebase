const Footer = () => {
  return (
    <>
      <footer className="flex items-center justify-center">
        <div className="chat-footer">
          Creado por <i className="fa-solid fa-arrow-right"></i>
          <a href="https://leandroheliz.com" target="_blank" rel="noreferrer">
            Leandro Heliz - Frontend Developer
          </a>{" "}
          &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </>
  );
};

export default Footer;
