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
import { updateAttRating } from './attractions';

export const newRating = async (id: string, user: string, uid: string, photo: string, rating: number, textarea: string) => {
    let randomName = createId();
    await setDoc(doc(db, "ratings", randomName), {
        attraction: id,
        userName: user,
        uid: uid,
        userPhoto: photo,
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
            uid: doc.data().uid,
            userPhoto: doc.data().userPhoto,
            userRating: doc.data().userRating,
            userComment: doc.data().userComment
        } 
        list.push(item);
    });

    for (let index = 0; index < list.length; index++) {
        list[index].userPhoto = await getRatingPhotoByUid(list[index].uid);
    }
    

    return(list);
}

export const getRatingPhotoByUid = async (id: string | undefined) => {
    //get att by user id
    const userRef = collection(db, "users");
    const q = query(userRef, where("uid", "==", id));
    
    let urlPhoto: any[] = [];
    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        let item = doc.data().userPhoto;
        urlPhoto.push(item);
    });
    return(urlPhoto[0]);
}

export const getRatingAvarage = async (id: string | undefined) => {
    //get att by user id
    const ratingRef = collection(db, "ratings");
    const q = query(ratingRef, where("attraction", "==", id));

    let sum: number = 0;
    let count: number = 0;

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        sum = sum+doc.data().userRating;
        count++;
    });

    const result = sum/count;

    if (id != undefined) {
        await updateAttRating(id,result);
    }    
    
    return result;
}