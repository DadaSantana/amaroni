import { Support } from '../types/Support';
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
import { getStorage, ref, listAll, getDownloadURL  } from "firebase/storage";
import { v4 as createId } from 'uuid';
import { writeSupportData } from './realtime';


export const getAllCalls = async () => {
    let list: Support[] = [];
    const q = query(collection(db, "support"), where("finished", "==", false));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((document) => {
        let item = {
            id: document.id,
            subject: document.data().subject,
            request: document.data().request,
            date: document.data().date,
            authorId: document.data().authorId,
            authorName: document.data().authorName,
            progress: document.data().progress,
            finished: document.data().finished
        }    
    list.push(item);
    });
    return list;
}

export const getResolvedCalls = async () => {
    let list: Support[] = [];
    const q = query(collection(db, "support"), where("finished", "==", true));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((document) => {
        let item = {
            id: document.id,
            subject: document.data().subject,
            request: document.data().request,
            date: document.data().date,
            authorId: document.data().authorId,
            authorName: document.data().authorName,
            progress: document.data().progress,
            finished: document.data().finished
        }    
    list.push(item);
    });
    return list;
}

export const newSupport = async (subject: string, request: string, date: string, authorId: string, authorName: string, progress: string, finished: boolean) => {
    let randomName = createId();
    await setDoc(doc(db, "support", randomName), {
        subject: subject,
        request: request,
        date: date,
        authorId: authorId,
        authorName: authorName,
        progress: progress,
        finished: finished
    });

    writeSupportData(randomName,request,false);

    return randomName;
}

export const getCallByUserId = async (id: any) => {
    //get att by user id
    const attractionsRef = collection(db, "support");
    const q = query(attractionsRef, where("authorId", "==", id));
    
    let list: Support[] = [];

    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        let item = {
            id: doc.id,
            subject: doc.data().subject,
            request: doc.data().request,
            date: doc.data().date,
            authorId: doc.data().authorId,
            authorName: doc.data().authorName,
            progress: doc.data().progress,
            finished: doc.data().finished
        } 
        list.push(item);
    });

    return(list);
}

export const getCallById = async (id: any) => {
    let list: Support[] = [];  
    const docRef = doc(db, "support", id);
    const docSnap = await getDoc(docRef);  
    
    if (docSnap.exists()) {
        let item = {
            id: id,
            subject: docSnap.data().subject,
            request: docSnap.data().request,
            date: docSnap.data().date,
            authorId: docSnap.data().authorId,
            authorName: docSnap.data().authorName,
            progress: docSnap.data().progress,
            finished: docSnap.data().finished
        } 
        list.push(item);        
    } 
    
    return list;
}

export const getSupportAttach = async (id: any) => {
    const storage = getStorage();
    const listRef = ref(storage, `support/`);

    let list: any[] = [];

    let path: any[] = [];

    let array = await listAll(listRef)
    .then((res) => {
        let items: any[] = [];
        res.items.forEach((itemRef) => {
        // All the items under listRef.
            const stringRef = `support/${id}`;
            if (itemRef.fullPath == stringRef) {
                items.push(itemRef.fullPath);
            }
        });   
        return items;
    }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
    });

    path.push(array);


    for (let index = 0; index < path[0].length; index++) {
        const element = path[0][index];
        getDownloadURL(ref(storage, element))
        .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        list.push(url);
        })
        .catch((error) => {
        // Handle any errors
        return null;
        }) 
    }
    
    return list;
}

export const updateSupportStatus = async (id: string, status: string) => {
    const supportRef = doc(db, "support", id);
    if (status == 'Finished') {
        await updateDoc( supportRef, {
            progress: status,
            finished: true
        });
    } else {
        await updateDoc( supportRef, {
            progress: status,
            finished: false
        });
    }
}

export const getOpenCallsCount = async () => {
    const supportsRef = collection(db, "support");
    const q = query(supportsRef, where("progress", "==", 'Registered Call'));

    const querySnapshot = await getDocs(q);
    
    return querySnapshot.size;
}
