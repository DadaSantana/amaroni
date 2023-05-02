import { Notification } from '../types/Notification';
import { db } from '../libs/firebase';
// Use o módulo firebaseAdmin aqui

import { 
    doc, 
    setDoc,
    collection, 
    query, 
    getDoc,
    getDocs,
    where,
    updateDoc,
    orderBy,
    limit
} from "firebase/firestore"; 
import { v4 as createId } from 'uuid';
import { writeLastMessageId } from './realtime';

export const getAllNotifications = async () => {
    let list: Notification[] = [];

    const notRef = collection(db, "messages");
    const q = query(notRef, orderBy('create','desc'));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((document) => {
        let item = {
            title: document.data().title,
            message: document.data().message,
            author: document.data().author,
            uid: document.data().uid,
            create: document.data().create,
            sendingTokens: document.data().sendingTokens
        }    
    list.push(item);
    });
    return list;
}

export const getLastNotifications = async () => {
  let list: Notification[] = [];

  const notRef = collection(db, "messages");
  const q = query(notRef, orderBy('create','desc'), limit(5));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((document) => {
      let item = {
          title: document.data().title,
          message: document.data().message,
          author: document.data().author,
          uid: document.data().uid,
          create: document.data().create,
          sendingTokens: document.data().sendingTokens
      }    
  list.push(item);
  });
  return list;
}

export const newNotification = async (title: string, body: string, author: string, uid: string, create: Date) => {
  let randomName = createId();
  let successTokens: any[] = [];
  await writeLastMessageId(randomName,title,body);

  const data = {
    title: title,
    body: body,
    image: null
  }

  const notificationData = await fetch('https://amaroni-it-notification.web.app/api/spaceapp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    successTokens = data.sendingTokens
  })
  .catch(error => {
      console.error(error); // erro de requisição
  });

  await setDoc(doc(db, "messages", randomName), {
    title: title,
    message: body,
    author: author,
    uid: uid,
    create: create,
    sendingTokens: successTokens
  });

} 

export const resendNotification = async (title: string,body: string) => {
  const data = {
    title: title,
    body: body,
    image: null
  }

  await fetch('https://amaroni-it-notification.web.app/api/spaceapp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
