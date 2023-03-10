import { firebaseApp } from "../libs/firebase";
import { 
    getAuth, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    updateProfile 
} from "firebase/auth";

import * as User from './users';

const auth = getAuth(firebaseApp);

export const loginEmailPassword = async (loginEmail : string, loginPassword : string) => {    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);

        return userCredential.user;
    }
    catch(error) {
        console.log(error);
        //chamar função que retorna o erro de senha ao usuário
        
    }
}

export const SignOut = async () => {
    signOut(auth).then(() => {
    // Sign-out successful.
    }).catch((error) => {
    // An error happened.
    });
}

export const LoginState = async () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
}

export const createAccont = async (userName: string, userEmail : string, userPassword : string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, userEmail, userPassword);  
        updateProfile(userCredential.user, {
            displayName: userName
        }).then(() => {
        // Profile updated!
        // ...
        }).catch((error) => {
        // An error occurred
        console.log(error);
        // ...
        });

        await User.newUid(userCredential.user.uid);
        const uid = await User.getUidData(userCredential.user.uid);

        return uid;
    }
    catch(error) {
        console.log(error)
        return error
        //chamar função que retorna o erro de senha ao usuário
    }
}

export const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if (user) {
            console.log(user);
            return true;
        }
        else {
            console.log('não está logado, será redirecionado');
            return false;
        }
    });
}

monitorAuthState();

const logout = async () => {
    await signOut(auth);
}