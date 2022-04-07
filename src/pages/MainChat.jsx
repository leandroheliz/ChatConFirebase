import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { ChatContext } from "../context/chat";
import picUser from '../assets/user.png'

const MainChat = () => {
  const navigate = useNavigate();
  const { user, persistUser, singOut } = useContext(AuthContext);
  const { sendMessage, getChatHistory, chatData, loading, updateChatHistory } =
    useContext(ChatContext);
  const [messageToSave, setMessageToSave] = useState("");

  useEffect(() => {
    if (!persistUser()) {
      return navigate("/");
    }
    getChatHistory();
    //eslint-disable-next-line
  }, []);

  const singUserOut = () => {
    singOut();
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = user;
    await sendMessage(email, messageToSave);
    updateChatHistory();
    setMessageToSave("");
  };

  const chatHistory =
    chatData.length > 0
      ? chatData.sort((a, b) => {
          return a.time - b.time;
        })
      : null;

  if (loading) {
    return <h1 className="container flex justify-center">Cargando Chat...</h1>;
  }
  return (
    <>
      <div className="chat-grid">
        <div className="sidebar">
          <p className="flex justify-center">
            <img src={picUser} alt="" style={{width:"60px", height:"60px"}}/>
          </p>
          <p className="flex justify-center">
          <b>Sesión iniciada como: {user?.email}</b>
          </p>
          <p className="sing-out" onClick={singUserOut}>
            <b>Cerrar Sesión</b>
          </p>
        </div>
        <div className="chat">
          {chatHistory?.map((c) => {
            return c.from === user?.email ? (
              <div key={c.time} className="user-chat">
                <div className="chat-info">
                  {c.from}on <span>{c.time}</span>
                  <button className="btnEdit">
                    <i className="fa-solid fa-file-pen"></i>
                  </button>
                  <button className="btnDelete">
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
                <b>{c.message}</b>
              </div>
            ) : (
              <div key={c.time} className="sender-chat">
                <div className="chat-info">
                  {c.from} on <span>{c.time}</span>
                  <button className="btnEdit">
                    <i className="fa-solid fa-file-pen"></i>
                  </button>
                  <button className="btnDelete">
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
                <b>{c.message}</b>
              </div>
            );
          })}
        </div>
      </div>
      <br/>
      <div className="chat-form-container">
        <form className="chat-form" onSubmit={handleSubmit}>
          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input inputs"
              value={messageToSave}
              onChange={(e) => setMessageToSave(e.target.value)}
              style={{width:'65%'}}
            />
            <input className="inputs chat-send" type="submit" value="Enviar" style={{width:'200px'}}/>
          </div>
        </form>
      </div>
    </>
  );
};

export default MainChat;
