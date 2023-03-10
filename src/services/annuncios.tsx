import { Annuncio } from '../types/Annuncio';
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
    let list: Annuncio[] = [];

    const q = query(collection(db, "annuncios"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        let item = {
            id: doc.id,
            imageUrl: doc.data().imageUrl,
            name: doc.data().name,
            description: doc.data().description,
            dateStart: doc.data().dateStart,
            timeStart: doc.data().timeStart,
            dateEnd: doc.data().dateEnd,
            timeEnd: doc.data().timeEnd,
            address: doc.data().address,
            tel: doc.data().tel,
            email: doc.data().email,
            links: doc.data().links
        }    
    list.push(item);
    });

    return list;
}

export const newAnnuncio = async (imageUrl: string, name: string, description: string, dateStart: string, timeStart: string, dateEnd: string, timeEnd: string, address: string, tel: string, email: string, links: any[]) => {
    let randomName = createId();
    await setDoc(doc(db, "annuncios", randomName), {
        imageUrl: imageUrl,
        name: name,
        description: description,
        dateStart: dateStart,
        timeStart: timeStart,
        dateEnd: dateEnd,
        timeEnd: timeEnd,
        address: address,
        tel: tel,
        email: email,
        links: links
        
    });
}

export const getEventById = async (id: any) => {
    let list: Annuncio[] = [];

    const docRef = doc(db, "annuncios", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let item = {
            id: id,
            imageUrl: docSnap.data().imageUrl,
            name: docSnap.data().name,
            description: docSnap.data().description,
            dateStart: docSnap.data().dateStart,
            timeStart: docSnap.data().timeStart,
            dateEnd: docSnap.data().dateEnd,
            timeEnd: docSnap.data().timeEnd,
            address: docSnap.data().address,
            tel: docSnap.data().tel,
            email: docSnap.data().email,
            links: docSnap.data().links
        } 
        list.push(item);
        
    } 

    return list;
}

export const updateEventPhoto = async (imageUrl: string, id: string) => {
    const annunciosRef = doc(db, "annuncios", id);
    await updateDoc( annunciosRef, {
        imageUrl: imageUrl
    });
}

export const updateEvent = async (id: string, name: string, description: string, dateStart: string, timeStart: string, dateEnd: string, timeEnd: string, address: string, tel: string, email: string, links: any[]) => {
    const attractionRef = doc(db, "annuncios", id);
    await updateDoc( attractionRef, {
        id: id,
        name: name,
        description: description,
        dateStart: dateStart,
        timeStart: timeStart,
        dateEnd: dateEnd,
        timeEnd: timeEnd,
        address: address,
        tel: tel,
        email: email,
        links: links
    });
}