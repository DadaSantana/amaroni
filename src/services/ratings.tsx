import { Attraction } from '../types/Attraction';
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
import { RatingType } from '../types/Rating';

export const newRating = async (id: string, user: string, userPhoto: string, rating: number, textarea: string) => {
    let randomName = createId();
    await setDoc(doc(db, "ratings", randomName), {
        attraction: id,
        userName: user,
        userPhoto: userPhoto,
        userRating: rating,
        userComment: textarea
    });
}

export const getRatingByLocalId = async (id: string | undefined) => {
    //get att by user id
    const localRef = collection(db, "ratings");
    const q = query(localRef, where("attraction", "==", id));
    
    let list: RatingType[] = [];

    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        let item = {
            id: doc.id,
            userName: doc.data().userName,
            userPhoto: doc.data().userPhoto,
            userRating: doc.data().userRating,
            userComment: doc.data().userComment
        } 
        list.push(item);
    });

    return(list);
}