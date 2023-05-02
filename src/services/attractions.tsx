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

export const getAll = async () => {
    let list: Attraction[] = [];
    const q = query(collection(db, "attractions"));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((document) => {
        let item = {
            id: document.id,
            imageUrl: document.data().imageUrl,
            name: document.data().name,
            type: document.data().type,
            address: document.data().address,
            tel: document.data().tel,
            website: document.data().website,
            latitude: document.data().latitude,
            longitude: document.data().longitude,
            description: document.data().description,
            authorId: document.data().authorId,
            authorName: document.data().authorName,
            rating: document.data().rating,
            links: document.data().links
        }    
    list.push(item);
    });
    return list;
}

export const newAttraction = async (id:string,imageUrl: string, name: string, type: string, address: string, tel: string, website: string, latitude: number, longitude: number, description: string, authorId: string, authorName: string,links: any[]) => {
    await setDoc(doc(db, "attractions", id), {
        imageUrl: imageUrl,
        name: name,
        type: type, 
        address: address,
        tel: tel,
        website: website,
        latitude: latitude,
        longitude: longitude,
        description: description,
        authorId: authorId,
        authorName: authorName,
        links: links
    });

    console.log(imageUrl);

    const data = {
        title: 'Nuova posizione aggiunta!',
        body: `Nome del luogo: ${name},\nIndirizzo: ${address},\nTelefono: ${tel}.
        `,
        imageUrl: imageUrl
      }
  
    const notificationData = await fetch('https://amaroni-it-notification.web.app/api/spaceapp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // dados retornados pela API
    })
    .catch(error => {
        console.error(error); // erro de requisição
    });

    console.log(notificationData);
}

export const updateAttPhoto = async (imageUrl: string, id: string) => {
    const attractionRef = doc(db, "attractions", id);
    await updateDoc( attractionRef, {
        imageUrl: imageUrl,
    });
}

export const updateAttRating = async (id: string, rating: number) => {
    const attractionRef = doc(db, "attractions", id);
    await updateDoc( attractionRef, {
        rating: rating
    });
}

export const updateAttraction = async (id: string, name: string, type: string, address: string, tel: string, website: string, latitude: number, longitude: number, description: string, links: any[]) => {
    const attractionRef = doc(db, "attractions", id);
    await updateDoc( attractionRef, {
        name: name,
        type: type, 
        address: address,
        tel: tel,
        website: website,
        latitude: latitude,
        longitude: longitude,
        description: description,
        links: links
    });
}

export const getAttById = async (id: any) => {
    let list: Attraction[] = [];  
    const docRef = doc(db, "attractions", id);
    const docSnap = await getDoc(docRef);    

    if (docSnap.exists()) {
        let item = {
            id: id,
            imageUrl: docSnap.data().imageUrl,
            name: docSnap.data().name,
            type: docSnap.data().type,
            address: docSnap.data().address,
            tel: docSnap.data().tel,
            website: docSnap.data().website,
            latitude: docSnap.data().latitude,
            longitude: docSnap.data().longitude,
            description: docSnap.data().description,
            authorId: docSnap.data().authorId,
            authorName: docSnap.data().authorName,
            rating: docSnap.data().rating,
            links: docSnap.data().links
        } 
        list.push(item);
        
    } 
    
    return list;
}

export const getAttByUser = async (id: string) => {
    //get att by user id
    const attractionsRef = collection(db, "attractions");
    const q = query(attractionsRef, where("authorId", "==", id));
    
    let list: Attraction[] = [];

    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        let item = {
            id: doc.id,
            imageUrl: doc.data().imageUrl,
            name: doc.data().name,
            type: doc.data().type,
            address: doc.data().address,
            tel: doc.data().tel,
            website: doc.data().website,
            latitude: doc.data().latitude,
            longitude: doc.data().longitude,
            description: doc.data().description,
            authorId: doc.data().authorId,
            authorName: doc.data().authorName,
            rating: doc.data().rating,
            links: doc.data().links
        } 
        list.push(item);
    });

    return(list);
}

export const getByName = async (value: string) => {
    const attractionsRef = collection(db, "attractions");
    const q = query(attractionsRef, where("name", "==", value));

    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });

}

export const getUserNameById = async (id: string) => {
    if (id == undefined) {
        return 'é indefinido';
    } else {
        //get user name by user id
        const userRef = doc(db, "users", id);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            return docSnap.data().name;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

}

export const getAttByType = async (type: string) => {
    //get att by type
    const attractionsRef = collection(db, "attractions");
    const q = query(attractionsRef, where("type", "==", type));
    
    let list: Attraction[] = [];

    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        let item = {
            id: doc.id,
            imageUrl: doc.data().imageUrl,
            name: doc.data().name,
            type: doc.data().type,
            address: doc.data().address,
            tel: doc.data().tel,
            website: doc.data().website,
            latitude: doc.data().latitude,
            longitude: doc.data().longitude,
            description: doc.data().description,
            authorId: doc.data().authorId,
            authorName: doc.data().authorName,
            rating: doc.data().rating,
            links: doc.data().links
        } 
        list.push(item);
    });

    return(list);
}

export const addAttractionStorage = async (url: string, files: FileList) => {
    const storage = getStorage();
    const attractionsRef = collection(db, "attractions");
    const q = query(attractionsRef, where("imageUrl", "==", url));
    const querySnapshot = await getDocs(q);
    if (files != null) {
        for (let index = 0; index < files.length; index++) {
            const fr = new FileReader();
            const element = files[index];
            fr.readAsArrayBuffer(element);
            fr.onload = function() {
                if (fr.result != null) {
                    const blob = new Blob([fr.result], { type: "image/png" });
                    
                    querySnapshot.forEach((doc) => {
                        // Create a child reference
                        let randomName = createId();
                        const storageRef = ref(storage, `attractions/${doc.id}/${randomName}`);
                        uploadBytes(storageRef, blob).then((snapshot) => {
                            console.log('Uploaded a blob or file!');
                        });
                    });
                }
            }   
        }                                     
    }
    


}

export const getQtdAttPhotos = async (id: any) => {

    const storage = getStorage();
    const listRef = ref(storage, `attractions/${id}/`);

    let path: any[] = [];

    let array = await listAll(listRef)
    .then((res) => {
        let items: any[] = [];
        res.items.forEach((itemRef) => {
        // All the items under listRef.
            items.push(itemRef.fullPath);
        });   
        return items;
    }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
    });

    path.push(array);

    return path[0].length;
}

export const getAttPhotos = async (id: any) => {

    const storage = getStorage();
    const listRef = ref(storage, `attractions/${id}/`);

    let list: any[] = [];

    let path: any[] = [];

    let array = await listAll(listRef)
    .then((res) => {
        let items: any[] = [];
        res.items.forEach((itemRef) => {
        // All the items under listRef.
            items.push(itemRef.fullPath);
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
        list.push({url: url, path: element});
        })
        .catch((error) => {
        // Handle any errors
        return null;
        }) 
    }
    return list;
}

export const deleteAttPhoto = async (path: string) => {
    const storage = getStorage();

    // Create a reference to the file to delete
    const pathRef = ref(storage, path);
    
    // Delete the file
    deleteObject(pathRef).then(() => {
        
    }).catch((error) => {
        
    });

    return true;
}