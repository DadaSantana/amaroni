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
import { writeLastMessageId } from './realtime';

import { getMessaging, getToken } from "firebase/messaging";
import { getAll } from './tokens';

import axios from 'axios';
import { service } from '../libs/firebaseAdmin';


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

    await writeLastMessageId(randomName,title,message);
    await sendNotification(title,message); 
}

export const sendNotification = async (title:string, message:string) => {

    const messaging = getMessaging();
    getToken(messaging, { vapidKey: 'BFFgiOFZH-1KJ7DixVoDyRIKyyasrbiZYh4Cq8Pv8FxI3ghGErba26c-YGSak9T3dSP9wqaVLC_pQcToYbpsR5U' }).then(async (currentToken) => {
        if (currentToken) {
            console.log(service);
/*           const auth = new GoogleAuth({
            keyFile: '../libs/serviceAccountKey.json',
            scopes: ['https://console.cloud.google.com/iam-admin/serviceaccounts/details/102657734354411889242?authuser=0&hl=pt&project=amaroni-it']
          }); */
          // Obtenha um token de acesso OAuth2 válido
          /* const client = await auth.getClient() as OAuth2Client;
          const token = await client.getAccessToken();
          const accessToken = token.token;
        // Send the token to your server and update the UI if necessary
            const tokens = await getAll();
            
            tokens.forEach(async element => {
              console.log(element);
              const url = 'https://fcm.googleapis.com/v1/projects/amaroni-it/messages:send';
              const serverKey = '29215d6a053247cd282266870d7b0c7697deefa5';
              const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${serverKey}`,
              };
              const body = JSON.stringify({
                message: {
                  token: 'fqdiMEAZb0yIQMqKsX2A1b:APA91bEkQl0fR3VV6yE_O0mhqg2y3A9ExCMUrEMkyVZVukU1F22O2G6fdE12kn7WXbQXVfNiDWE9P9suRkO9PCDmAGx6_9_yKqgb51WbqF7ot2EAyJn8SMOraul_6diQwIWSbjNvEKvM',
                  notification: {
                    title: 'Teste de envio de mensagem',
                    body: 'Esta é uma mensagem de teste.',
                  },
                },
              });
              const response = await axios.post(url, body, { headers });
              return response;
            }); */
            

        } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
    }); 
} 
