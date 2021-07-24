import firebase from "firebase";
import cogoToast from "cogo-toast";

var firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
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
