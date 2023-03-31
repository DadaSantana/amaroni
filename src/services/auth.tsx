import { firebaseApp } from "../libs/firebase";
import { 
    getAuth, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    updateProfile,
    Unsubscribe,
    sendEmailVerification,
    updatePassword, 
    sendPasswordResetEmail,
    updateCurrentUser
} from "firebase/auth";

import * as User from './users';
import { UserFirebase } from "../types/Users";
import { listenerVerifyData, updateVerifiedState } from "./realtime";

export const auth = getAuth(firebaseApp);

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
        await sendEmailVerify();
        updateProfile(userCredential.user, {
            displayName: userName, 
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/amaroni-it.appspot.com/o/users%2Fuser-profile.png?alt=media&token=dcbee91e-dc29-4f04-9886-cd5db5f479f9'
        }).then(() => {
        // Profile updated!
        // ...
        }).catch((error) => {
        // An error occurred
        console.log(error);
        // ...
        });

        await User.newUid(userCredential.user.uid,userName,userEmail);
        const uid = await User.getUidData(userCredential.user.uid);

        return uid;
    }
    catch(error) {
        console.log(error)
        return error
        //chamar função que retorna o erro de senha ao usuário
    }
}

export const monitorAuthState = async (auth?: any) => {
    let userFirebase: UserFirebase[] = [];
    await onAuthStateChanged(auth, user => {
        if (user) {
            let item = {
                accessToken: user.uid,
                displayName: user.displayName,
                email: user.email,
                emailVerified: user.emailVerified,
                phoneNumber: user.phoneNumber,
                photoURL: user.photoURL,
                uid: user.uid,
                session: {
                    accessToken: user.uid,
                    expirationTime: 0
                }
            }
            userFirebase.push(item);
        } else {
            console.log(user);
        }

    });
    console.log(userFirebase);
    return userFirebase;
}

export const monitorVerifiedState = async () => {
    let state: boolean = false;
    const auth = getAuth();

    if (auth) {
        await updateCurrentUser(auth,auth.currentUser);
    }
    
    return auth.currentUser != undefined ? auth.currentUser.emailVerified : false;
}

export const getCurrentUser = async (auth: any) => {
    let userFirebase: UserFirebase[] = [];
    const user = auth.currentUser;

    if (user) {
        let item = {
            accessToken: user.uid,
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            uid: user.uid,
            session: {
                accessToken: user.uid,
                expirationTime: 0
            }
        }
        userFirebase.push(item);
    } else {
        console.log(user);
    }

    return userFirebase;
}

export const updateAccontPhoto = async (imageUrl: string) => {
    const user = auth.currentUser;

    if (user != null) {
        updateProfile(user, {
            photoURL: imageUrl
            }).then(() => { 
            // Profile updated!
            // ...
            }).catch((error) => {
            // An error occurred
            // ...
            });   
    }
}

export const updateAccountName = async (name: string) => {
    const user = auth.currentUser;

    if (user != null) {
        updateProfile(user, {
            displayName: name
            }).then(() => { 
            // Profile updated!
            // ...
            }).catch((error) => {
            // An error occurred
            // ...
            });   
    }
}

export const sendEmailVerify = async () => {
    const auth = getAuth();
    let state = false;

    if  (auth.currentUser != null) {
        state = true;
        sendEmailVerification(auth.currentUser)
        .then(() => {
            
        });
    }

    return state;
}

export const newPasswordUser = async (newPassword: string) => {
    const auth = getAuth();
    console.log('entrou na redefinição');
    const user = auth.currentUser;

    if (user != null) {
        console.log('entrou na inserção');
        updatePassword(user, newPassword).then(() => {
            // Update successful.

            }).catch((error) => {
            // An error ocurred
            console.log(error);
            // ...
            });
    }

}

export const sendRedefinePassword = async (email: string) => {
    let state: boolean = false;
    await sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      state = true;
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

    return state;
}

