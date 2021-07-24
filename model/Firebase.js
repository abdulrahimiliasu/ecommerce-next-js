const api_key = process.env.FIREBASE_API_KEY;
const auth_domain = process.env.FIREBASE_AUTH_DOMAIN;
const project_id = process.env.FIREBASE_PROJECT_ID;
const bucket = process.env.FIREBASE_STORAGE_BUCKET;
const messaging_id = process.env.FIREBASE_MESSAGING_SENDER_ID;
const mesurement_id = process.env.FIREBASE_MEASUREMENT_ID;
const app_id = process.env.FIREBASE_APP_ID;

import firebase from "firebase";
import cogoToast from "cogo-toast";

// var firebaseConfig = {
//   apiKey: `${api_key}`,
//   authDomain: `${auth_domain}`,
//   projectId: `${project_id}`,
//   storageBucket: `${bucket}`,
//   messagingSenderId: `${mesurement_id}`,
//   appId: `${app_id}`,
//   measurementId: `${messaging_id}`,
// };

var firebaseConfig = {
  apiKey: "AIzaSyDHabjK2gDYnmAtRsLY4nUn4Cltc4ybrxo",
  authDomain: "accessorys.firebaseapp.com",
  projectId: "accessorys",
  storageBucket: "accessorys.appspot.com",
  messagingSenderId: "49653100675",
  appId: "1:49653100675:web:fa19ad77daa066e8dbebb6",
  measurementId: "G-53T7N1ZBTR",
};

// Initialize Firebase
let instance;

export default function getFirebase() {
  if (typeof window !== "undefined") {
    if (instance) return instance;
    instance = firebase.initializeApp(firebaseConfig);
    return instance;
  }

  return null;
}

// Get Firebase Instance
export const firebaseInstance = getFirebase();

// Update User Info with ID
export const updateUserProfileInfo = async (id, new_data) => {
  try {
    const db = firebaseInstance.firestore();
    const userRef = db
      .collection("users")
      .doc(id)
      .set(new_data, { merge: true })
      .then(cogoToast.success("Data Updated Succesfully"));
  } catch (error) {
    cogoToast.error(error.message);
  }
};

// Sign Out User
export const signOut = async () => {
  try {
    if (firebaseInstance) {
      await firebaseInstance.auth().signOut();
      cogoToast.success("Sucessfully Signed out!");
    }
  } catch (error) {
    cogoToast.error(error.message);
  }
};

//Add empty user Details on sign up
export const addUserProfileInfo = async (user_id) => {
  if (!firebaseInstance) return;
  try {
    const database = firebaseInstance.firestore();
    const userRef = database.collection("users").doc(user_id);
    await userRef.set(
      {
        first_name: "",
        last_name: "",
        address: "",
        age: "",
        avatar_url:
          "https://firebasestorage.googleapis.com/v0/b/accessorys.appspot.com/o/avatars%2Fuser.png?alt=media&token=306ac448-0f39-411f-b5f9-aef2366e2485",
      },
      { merge: true }
    );
  } catch (error) {
    cogoToast.error(error.message);
  }
};
