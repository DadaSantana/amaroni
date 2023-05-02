import { Tokens } from '../types/Tokens';
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

export const getAll = async () => {
    let list: string[] = [];
    const q = query(collection(db, "tokens"));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((document) => {
        list.push(document.data().token);
    });

    console.log(list);
    return list;
}

