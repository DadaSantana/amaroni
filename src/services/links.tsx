import { db } from '../libs/firebase';
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

export const insertLinkFirestore = async (colection: string, document: string, links: any[]) => {
    const linkRef = doc(db, colection, document);
    await updateDoc( linkRef, {
        links: links
    });
}

export const getLinks = async (collection: string, document: string) => {
    let list: any[] = [];

    const docRef = doc(db, collection, document);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

        let item = {
            links: docSnap.data().links
        } 
        list.push(item);        
    } 
    console.log(list[0].links);
    return list[0].links;
}

