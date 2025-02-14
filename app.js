  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
  import { getFirestore, doc, setDoc, query, where, getDocs, collection,addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
   const firebaseConfig = {
    apiKey: "AIzaSyBp3fMnnawEhcU6MRqz4P9uP-YtHgik3Do",
    authDomain: "fir-web-78ff6.firebaseapp.com",
    projectId: "fir-web-78ff6",
    storageBucket: "fir-web-78ff6.firebasestorage.app",
    messagingSenderId: "981983884982",
    appId: "1:981983884982:web:d7d66e61ee2411e81a1817",
    measurementId: "G-Z17PEHHBEX"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  export const auth = getAuth(app);
 export const db = getFirestore(app);
  const googleProvider = new GoogleAuthProvider();
  
// Sign up with email/password
const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Add user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      uid: user.uid,
      createdAt: new Date(),
    });

    // Store UID in localStorage
    localStorage.setItem("uid", user.uid);

    // Redirect to dashboard
    window.location.href = "./dashboard/dashboard.html";
  } catch (error) {
    alert("Error signing up: " + error.message);
  }
};

// // Login with email/password
// const loginWithEmail = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     // Store UID in localStorage
//     localStorage.setItem("uid", user.uid);

//     // Redirect to dashboard
//     window.location.href = "./pages/dashboard.html";
//   } catch (error) {
//     alert("Error logging in: " + error.message);
//   }
// };

// Sign in with Google
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Add user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      uid: user.uid,
      createdAt: new Date(),
    });

    // Store UID in localStorage
    localStorage.setItem("uid", user.uid);

    // Redirect to dashboard
    window.location.href = "./dashboard/dashboard.html";
  } catch (error) {
    alert("Error signing in with Google: " + error.message);
  }
};

// Event listeners
document.getElementById('signUpButton').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  signUpWithEmail(email, password);
});

// document.getElementById('loginButton').addEventListener('click', () => {
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;
//   loginWithEmail(email, password);
// });

document.getElementById('googleSignInButton').addEventListener('click', signInWithGoogle);


