import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { ChatContext } from "../context/chat";

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
    return <h1 className="container">Loading Chat...</h1>;
  }
  return (
    <>
      <div className="chat-grid">
        <div className="sidebar">
          <p>
            Signed in as <b>{user?.email}</b>
          </p>
          <p className="sing-out" onClick={singUserOut}>
            <b>Sing out</b>
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
      <div className="chat-form-container">
        <form className="chat-form" onSubmit={handleSubmit}>
          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input inputs"
              value={messageToSave}
              onChange={(e) => setMessageToSave(e.target.value)}
            />
            <input className="inputs chat-send" type="submit" value="send" />
          </div>
        </form>
      </div>
    </>
  );
};

export default MainChat;
