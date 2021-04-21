import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBj56nTjteeofJSeQTS83BrI5EPCLCkj9E",
    authDomain: "crwn-clothing-602da.firebaseapp.com",
    projectId: "crwn-clothing-602da",
    storageBucket: "crwn-clothing-602da.appspot.com",
    messagingSenderId: "745362219552",
    appId: "1:745362219552:web:534f2b5180c47a7f021245"
  };

export const createUserProfileDocument = async (userAuth, additionalData ) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  
  const snapShot = await userRef.get()

  if(!snapShot.exists) {
    const { displayName, email} = userAuth;
    const createdAt = new Date();


    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })

    } catch (error) {
        console.log('error creating user', error.message);
    }
   }

   return userRef;
}

firebase.initializeApp(config);

// export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
//   const collectionRef = firestore.collection(collectionKey);

//   const batch = firestore.batch()
//   objectToAdd.forEach(obj => {
//     const newDocRef = collectionRef.doc()
//     batch.set(newDocRef, obj)
//   });

//   return await batch.commit();
// };

export const convertCollectionsSnapshotToMap = (collectionsSnapchat) => {
  const transformCollection = collectionsSnapchat.docs.map(doc => {
    const {title, items} = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  return transformCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
}

export const getCurrentUser = () => {
  return new Promise ((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth=> {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({prompt:'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
