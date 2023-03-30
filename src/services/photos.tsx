import { Photo } from '../types/Photo';
import { storage } from '../libs/firebase';
import { ref, listAll, getDownloadURL, uploadBytes, getStorage, deleteObject } from 'firebase/storage';
import { v4 as createId } from 'uuid';

export const getAll = async () => {
    let list: Photo[] = [];

    const imagesFolder = ref(storage, "images");
    const photoList = await listAll(imagesFolder);

    for(let i in photoList.items) {
        let photoUrl = await getDownloadURL(photoList.items[i]);

        list.push({
            name: photoList.items[i].name,
            url: photoUrl
        });
    }

    return list;
}

export const insert = async (file: File) => {
    if(['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {

        let randomName = createId();
        let newFile = ref(storage, `images/${randomName}`);

        let upload = await uploadBytes(newFile, file);
        let photoUrl = await getDownloadURL(upload.ref);

        return {
            name: upload.ref.name,
            url: photoUrl
        } as Photo;


    } else {
        return new Error('Tipo de arquivo não permitido');
    }
}

//Attractions
export const insertAtt =async (file: File) => {
    if(['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {

        let randomName = createId();
        let newFile = ref(storage, `attractions/${randomName}`);

        let upload = await uploadBytes(newFile, file);
        let photoUrl = await getDownloadURL(upload.ref);

        return {
            name: upload.ref.name,
            url: photoUrl
        } as Photo;


    } else {
        return new Error('Tipo de arquivo não permitido');
    }
}

//News
export const insertNewsPhoto = async (file: File) => {
    if(['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {

        let randomName = createId();
        let newFile = ref(storage, `news/${randomName}`);

        let upload = await uploadBytes(newFile, file);
        let photoUrl = await getDownloadURL(upload.ref);

        return {
            name: upload.ref.name,
            url: photoUrl
        } as Photo;


    } 
}

//User
export const inserUserPhoto =async (file: File) => {
    if(['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {

        let randomName = createId();
        let newFile = ref(storage, `users/${randomName}`);

        let upload = await uploadBytes(newFile, file);
        let photoUrl = await getDownloadURL(upload.ref);

        return {
            name: upload.ref.name,
            url: photoUrl
        } as Photo;


    } else {
        return new Error('Tipo de arquivo não permitido');
    }
}

//Events
export const insertAnn =async (file: File) => {
    if(['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {

        let randomName = createId();
        let newFile = ref(storage, `annuncios/${randomName}`);

        let upload = await uploadBytes(newFile, file);
        let photoUrl = await getDownloadURL(upload.ref);

        return {
            name: upload.ref.name,
            url: photoUrl
        } as Photo;


    } else {
        return new Error('Tipo de arquivo não permitido');
    }
}

export const getPhotoStorage = async (path: string) => {
    let list: Photo[] = [];
    console.log(path);
    const imagesFolder = ref(storage, path);
    const photoList = await listAll(imagesFolder);

    for(let i in photoList.items) {
        let photoUrl = await getDownloadURL(photoList.items[i]);

        list.push({
            name: photoList.items[i].name,
            url: photoUrl
        });
    }

    return list;
}

export const insertPhotoComponent = async (path: string, id: string | undefined, file: File) => {
    if(['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {

        let randomName = createId();
        let newFile: any = '';
        if (id != undefined) {
            newFile = ref(storage, `${path}/${id}/${randomName}`);
        } else {
            newFile = ref(storage, `${path}/${randomName}`);
        }
        

        let upload = await uploadBytes(newFile, file);
        let photoUrl = await getDownloadURL(upload.ref);

        return {
            name: upload.ref.name,
            url: photoUrl
        } as Photo;


    } else {
        return new Error('Tipo de arquivo não permitido');
    }
}

export const deleteEventPhoto = async (path: string) => {
    const storage = getStorage();
    console.log(path);

    // Create a reference to the file to delete
    const pathRef = ref(storage, path);
    
    // Delete the file
    deleteObject(pathRef).then(() => {
        
    }).catch((error) => {
        
    });

    return true;
}

//Support
export const newSupportImage =async (file: File, id: string) => {
    if(['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {

        let newFile = ref(storage, `support/${id}`);

        let upload = await uploadBytes(newFile, file);
        let photoUrl = await getDownloadURL(upload.ref);

        return {
            name: upload.ref.name,
            url: photoUrl
        } as Photo;


    } else {
        return new Error('Tipo de arquivo não permitido');
    }
}

//Gallery
export const deleteGalleryPhoto = async (path: string) => {
    const storage = getStorage();

    // Create a reference to the file to delete
    const pathRef = ref(storage, path);
    
    // Delete the file
    deleteObject(pathRef).then(() => {
        
    }).catch((error) => {
        
    });

    return true;
}

export const insertImageGallery = async (file: File) => {
    if(['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {

        let randomName = createId();
        let newFile = ref(storage, `gallery/${randomName}`);

        let upload = await uploadBytes(newFile, file);
        let photoUrl = await getDownloadURL(upload.ref);

        return {
            name: upload.ref.name,
            url: photoUrl
        } as Photo;


    } else {
        return new Error('Tipo de arquivo não permitido');
    }
}

//News
export const inserNewsImage = async (file: File) => {
    if(['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {

        let randomName = createId();
        let newFile = ref(storage, `news/${randomName}`);

        let upload = await uploadBytes(newFile, file);
        let photoUrl = await getDownloadURL(upload.ref);

        return {
            name: upload.ref.name,
            url: photoUrl
        } as Photo;


    } else {
        return new Error('Tipo de arquivo não permitido');
    }
}

export const getNews = async () => {
    let list: Photo[] = [];

    const imagesFolder = ref(storage, "news");
    const photoList = await listAll(imagesFolder);

    for(let i in photoList.items) {
        let photoUrl = await getDownloadURL(photoList.items[i]);

        list.push({
            name: photoList.items[i].name,
            url: photoUrl
        });
    }

    console.log(list);

    return list;
}

export const deleteNews = async (path: string) => {
    const storage = getStorage();
    // Create a reference to the file to delete
    const pathRef = ref(storage, 'news/'+path);    
    // Delete the file
    deleteObject(pathRef).then(() => {        
        }).catch((error) => {        
        });
}