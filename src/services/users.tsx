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
import { Users } from '../types/Users';
import { updateAccontPhoto, updateAccountName } from './auth';



export const getAll = async () => {
    let list: Users[] = [];

    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        let item = {
            id: doc.id,
            name: doc.data().userName,
            email: doc.data().userEmail,
            photo: doc.data().userPhoto,
            phone: doc.data().userPhone,
            levels: doc.data().levels,
            blocked: doc.data().blocked
        }    
    list.push(item);
    });
    return list;
}

/*
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
    let list: Users[] = [];

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let item = {
            id: docSnap.id,
            name: docSnap.data().userName,
            email: docSnap.data().userEmail,
            photo: docSnap.data().userPhoto,
            phone: docSnap.data().userPhone,
            levels: docSnap.data().levels,
            blocked: docSnap.data().blocked
        } 
        list.push(item);        
    } 

    return list[0];
} 

export const newUid = async (uid: string,name: string,email:string) => {
    let item = await setDoc(doc(db, "users", uid), {
        uid: uid,
        userName: name, 
        userEmail: email,
        userPhoto: 'https://firebasestorage.googleapis.com/v0/b/amaroni-it.appspot.com/o/users%2Fuser-profile.png?alt=media&token=8b36dc06-7535-4819-8660-2059ea8afe8b',
        userPhone: '(  )',
        levels: {
            admin: false,
            member: false,
            guest: true
        }
    });

    return item;
}

export const updateUserPhoto = async (imageUrl: string, id: string) => {
    await updateAccontPhoto(imageUrl);

    const userRef = doc(db, "users", id);
    await updateDoc( userRef, {
        userPhoto: imageUrl,
    });
}

export const updateUserName = async (id: string, name: string) => {
    await updateAccountName(name);
    const userRef = doc(db, "users", id);
    await updateDoc( userRef, {
        userName: name
    });
}

export const updateUserPhone = async (id: string, phone: string) => {
    const userRef = doc(db, "users", id);
    await updateDoc( userRef, {
        userPhone: phone
    });
}

export const updateUserLevel = async (id: string, level: string) => {
    const userRef = doc(db, "users", id);
    
    if (level === 'admin') {
        await updateDoc( userRef, {
            levels: {
                admin: true,
                member: false,
                guest: false
            }
        });
    }

    if (level === 'member') {
        await updateDoc( userRef, {
            levels: {
                admin: false,
                member: true,
                guest: false
            }
        });
    }

    if (level === 'guest') {
        await updateDoc( userRef, {
            levels: {
                admin: false,
                member: false,
                guest: true
            }
        });
    }

}

export const blockUser = async (id: string) => {
    const userRef = doc(db, "users", id);
    await updateDoc( userRef, {
        blocked: true
    });
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