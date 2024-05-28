import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANfQdyZahFc27h5jVYjymUEnKPZ2P9SCA",
  authDomain: "mavs-10c31.firebaseapp.com",
  projectId: "mavs-10c31",
  storageBucket: "mavs-10c31.appspot.com",
  messagingSenderId: "268872005810",
  appId: "1:268872005810:web:07bafaf38e50d56b2471ab",
  measurementId: "G-HF8PYTLVMG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

auth.languageCode = "en";

// Add additional scopes to fetch user profile information
provider.addScope("profile");
provider.addScope("email");

export { auth, provider, db };
