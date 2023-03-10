import { Gallery } from '../types/Gallery';
import { db } from '../libs/firebase';
import { 
    doc, 
    setDoc,
    collection, 
    query, 
    getDoc,
    getDocs,
} from "firebase/firestore"; 
import { v4 as createId } from 'uuid';


export const getAll = async () => {
    let list: Gallery[] = [];
    const q = query(collection(db, "gallery"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        let item = {
            id: doc.id,
            imageUrl: doc.data().imageUrl,
            title: doc.data().title,
            alt: doc.data().alt,
            tag: doc.data().tag,
        }    
    list.push(item);
    });
    return list;
}

export const addImage = async (imageUrl: string, title: string, alt: string, tag: string) => {
    let randomName = createId();
    await setDoc(doc(db, "gallery", randomName), {
        imageUrl: imageUrl,
        title: title,
        alt: alt, 
        tag: tag,
    });
}

export const getImageById = async (id: string) => {
    let list: Gallery[] = [];

    const docRef = doc(db, "gallery", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let item = {
            id: id,
            imageUrl: docSnap.data().imageUrl,
            title: docSnap.data().title,
            alt: docSnap.data().alt,
            tag: docSnap.data().tag
        } 
        list.push(item);
        
    } 

    return list;
}