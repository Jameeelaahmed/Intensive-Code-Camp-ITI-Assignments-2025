import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCfqqd777j9N-bfp22vA-PSFY9xGC8Tpsc",
    authDomain: "social-media-app-2384e.firebaseapp.com",
    databaseURL: "https://social-media-app-2384e-default-rtdb.firebaseio.com",
    projectId: "social-media-app-2384e",
    storageBucket: "social-media-app-2384e.firebasestorage.app",
    messagingSenderId: "849053798835",
    appId: "1:849053798835:web:1ea0e6265b50fa2b1d3bc6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export default app;