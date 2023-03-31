import { Notification } from '../types/Notification';
import { db } from '../libs/firebase';
import { 
    doc, 
    setDoc,
    collection, 
    query, 
    getDoc,
    getDocs,
    where,
    updateDoc
} from "firebase/firestore"; 
import { v4 as createId } from 'uuid';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";

export const getAllNotifications = async () => {
    let list: Notification[] = [];
    const q = query(collection(db, "messages"));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((document) => {
        let item = {
            title: document.data().title,
            message: document.data().message,
            author: document.data().author,
            uid: document.data().uid,
            create: document.data().create
        }    
    list.push(item);
    });
    return list;
}

export const newNotification = async (title: string, message: string, author: string, uid: string, create: Date) => {
    let randomName = createId();
    await setDoc(doc(db, "messages", randomName), {
        title: title,
        message: message,
        author: author,
        uid: uid,
        create: create,
    });
}

