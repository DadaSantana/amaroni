import { News } from '../types/news';
import { db, storage } from '../libs/firebase';
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage';
import { 
    doc, 
    setDoc,
    collection, 
    query, 
    where, 
    getDocs,
    getDoc,
    updateDoc 
} from "firebase/firestore"; 
import { v4 as createId } from 'uuid';


export const getAll = async () => {
    let list: News[] = [];

    const q = query(collection(db, "news"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        let item = {
            id: doc.id,
            imageUrl: doc.data().imageUrl,
            name: doc.data().name,
            description: doc.data().description,
            address: doc.data().address,
            telephone: doc.data().telephone,
            email: doc.data().email,
            links: doc.data().links
        }    
    list.push(item);
    });

    return list;
}

export const getAllCount = async () => {

    const q = query(collection(db, "news"));

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.size);
    return querySnapshot.size;
}

export const setNews = async (imageUrl: string, name: string, description: string, address: string, telephone: string, email: string, links: any[]) => {
    let randomName = createId();
    await setDoc(doc(db, "news", randomName), {
        id: randomName,
        imageUrl: imageUrl,
        name: name,
        description: description,
        address: address,
        telephone: telephone,
        email: email,
        links: links
    });
}

export const getEventById = async (id: any) => {
    let list: News[] = [];

    const docRef = doc(db, "news", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let item = {
            id: id,
            imageUrl: docSnap.data().imageUrl,
            name: docSnap.data().name,
            description: docSnap.data().description,
            address: docSnap.data().address,
            telephone: docSnap.data().telephone,
            email: docSnap.data().email,
            links: docSnap.data().links
        } 
        list.push(item);
        
    } 

    return list;
}

export const updateEventPhoto = async (imageUrl: string, id: string) => {
    const annunciosRef = doc(db, "news", id);
    await updateDoc( annunciosRef, {
        imageUrl: imageUrl
    });
}

export const updateEvent = async (id: string, name: string, description: string, address: string, telephone: string, email: string, links: any[]) => {
    const attractionRef = doc(db, "news", id);
    await updateDoc( attractionRef, {
        id: id,
        name: name,
        description: description,
        address: address,
        telephone: telephone,
        email: email,
        links: links
    });
}
