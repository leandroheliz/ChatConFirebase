import {createContext, useState} from 'react';
import {initializeApp} from 'firebase/app';
import {getFirestore, collection, addDoc, getDocs, onSnapshot, query} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBBfHHdnzTeZhED0zjbXnPBLR7EsBcMLmM",
  authDomain: "chat-f8834.firebaseapp.com",
  projectId: "chat-f8834",
  storageBucket: "chat-f8834.appspot.com",
  messagingSenderId: "1066364058837",
  appId: "1:1066364058837:web:1ac5eb592fd02e41a4b65c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const ChatContext = createContext(null);

export const ChatProvider = ({children}) => {

  const [ chatData, setChatData ] = useState({
    from:'',
    time:'',
    message:'',
  });

  const [ loading, setLoading ] = useState(true);

  const sendMessage = async(from, message) => {
    try {
      if(message === '')return;
      const docRef = await addDoc(collection(db, 'ChatApp'),{
        from: from,
        message: message,
        time: Date.now(),
      })
      return docRef
    } catch (error) {
      console.error('Error sending message', error);
    }
  }

  const getChatHistory = async() => {
    try {
      const querySnapshot = await getDocs(collection(db, 'ChatApp'))
     let tempchatData = [];
     querySnapshot.forEach(doc => {
       if (doc.exists()){
         tempchatData.push({id: doc.id,  ...doc.data()})
         setChatData([...tempchatData])
         setLoading(false)
        }
     })
     const chatDiv = document.querySelector('.chat');
     chatDiv.scrollTop = chatDiv.scrollHeight;
    } catch (error) {
      console.log('Error getting chat history', error);
    }
  }

  const updateChatHistory = () => {
    const q = query(collection(db, 'ChatApp'));
    onSnapshot(q, (querySnapshot) => {
      let chatHistory = [];
      querySnapshot.forEach(doc => {
        chatHistory.push({id: doc.id, ...doc.data()});
        setChatData([...chatHistory]);
        setLoading(false);
      })
      const chatDiv = document.querySelector('.chat');
      chatDiv.scrollTop = chatDiv.scrollHeight;
    })
  }

  return(
    <ChatContext.Provider value={{updateChatHistory, loading, chatData, getChatHistory, sendMessage}}>{children}</ChatContext.Provider>
  )
}