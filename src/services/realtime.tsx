import { Data } from "@react-google-maps/api";
import { getDatabase, ref, set, child, get, push,update, Database, onValue } from "firebase/database";

export const writeSupportData = (id: string, request: string, admin: boolean) => {
  const db = getDatabase();
  const timestamp = new Date().getTime();
  const date = new Date(timestamp);
  console.log(date.toLocaleString('en-GB'));
  set(ref(db, 'support/chat/' + id), [{
    by: admin ? 'admin' : 'user',
    message: request,
    ms: date.toLocaleString('en-GB')
  }]);
}

export const updateSupportData = (id: string, admin: boolean, text: string) => {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `support/chat/${id}`)).then((snapshot) => {
    if (snapshot.exists()) {
        const index = snapshot.size;
        const db = getDatabase();

        const timestamp = new Date().getTime();
        const date = new Date(timestamp);


        const postData = {
            by: admin ? 'admin' : 'user',
            message: text,
            ms: date.toLocaleString('en-GB')
        };

        const updates: any = {};
        updates[`support/chat/${id}/` + index] = postData;

        return update(ref(db), updates); 
    } else {
      writeSupportData(id,text,admin);
    }
  }).catch((error) => {
    console.error(error);
  }); 
}

export const lerDados = async (id: string) => {
  const dbRef = ref(getDatabase());
  let object: any = [];
  await get(child(dbRef, `support/chat/${id}`)).then((snapshot) => {
    if (snapshot.exists()) {
      object.push(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

  return object;;
}

export const listenerMessages = () => {
  const db = getDatabase();
  let data: any;
  const starCountRef = ref(db, 'support/chat');
  onValue(starCountRef, (snapshot) => {
    data = snapshot.val();
  });
  return data;
}

listenerMessages();

export const writeVerifyData = (id: string) => {
  const db = getDatabase();
  set(ref(db, 'verify/id/' + id), {
    state: false
  });
}

export const updateVerifiedState = (id: string, state: boolean) => {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `verify/id/${id}`)).then((snapshot) => {
    if (snapshot.exists()) {
        const db = getDatabase();

        const postData = {
          state: state
        };

        const updates: any = {};
        updates[`support/chat/${id}/`] = postData;

        return update(ref(db), updates); 
    } 
  }).catch((error) => {
    console.error(error);
  }); 
}

export const listenerVerifyData = (id?:string,state?: boolean) => {
  const db = getDatabase();
  let data: any;
  if (id != undefined) {
    const starCountRef = ref(db, 'verify/id/'+id);
    onValue(starCountRef, (snapshot) => {
      data = snapshot.val();
      console.log(data);
    });
  }
  return data;
}

listenerVerifyData();

export const writeLastMessageId = (id: string,title: string, message: string) => {
  const db = getDatabase();

  set(ref(db, 'notification/'), {
    id: id,
    title: title,
    message: message,
    state: false
  });
}

export const getCurrentNotification = async () => {
  const dbRef = ref(getDatabase());
  let object: any = [];
  await get(child(dbRef, `notification`)).then((snapshot) => {
    if (snapshot.exists()) {
      object.push(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

  return object;
}