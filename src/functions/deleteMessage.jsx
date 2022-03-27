import firebaseapp from "../firebase/config";
import { getFirestore, deleteDoc, collection, doc } from "firebase/firestore";

const db = getFirestore(firebaseapp);

export default async function deleteMessage (message){
  const collectionRef = collection(db, "ChatApp");
  const docuRef = doc(collectionRef, message.id);
  const eliminado = await deleteDoc(docuRef);
  return eliminado;  
}
