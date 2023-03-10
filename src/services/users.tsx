import { db } from '../libs/firebase';
import { 
    doc, 
    setDoc,
    collection, 
    query, 
    getDoc,
    getDocs,
    where
} from "firebase/firestore"; 
import { v4 as createId } from 'uuid';
import { Uid } from '../types/Uid';


/* export const getAll = async () => {
    let list: Attraction[] = [];

    const q = query(collection(db, "attractions"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        let item = {
            id: doc.id,
            imageUrl: doc.data().imageUrl,
            name: doc.data().name,
            type: doc.data().type,
            address: doc.data().address,
            tel: doc.data().tel,
            map: doc.data().map,
            description: doc.data().description
        }    
    list.push(item);
    });
    return list;
}

export const newAttraction = async (imageUrl: string, name: string, type: string, address: string, tel: string, map: string, description: string) => {
    let randomName = createId();
    await setDoc(doc(db, "attractions", randomName), {
        imageUrl: imageUrl,
        name: name,
        type: type, 
        address: address,
        tel: tel,
        map: map,
        description: description
    });
} */

export const getUidData = async (uid: string) => {
    let list: Uid[] = [];

    const docRef = doc(db, "uid", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let item = {
            levels: docSnap.data().levels
        } 
        list.push(item);        
    } 

    return list[0];
} 

export const newUid = async (uid: string) => {
    let item = await setDoc(doc(db, "uid", uid), {
        levels: {
            admin: false,
            member: false,
            guest: true
        }
    });

    return item;
}

/* export const getUid = async (id: string) => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("email", "==", value));
    const userCredentials: User[] = [];

    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let item = {
            id: doc.id,
            name: doc.data().name, 
            email: doc.data().email,
            admin: doc.data().admin
        }
        userCredentials.push(item);
    });

    return userCredentials;
} */