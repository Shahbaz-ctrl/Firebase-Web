import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
// import { app, auth, db, firebaseConfig } from "../app";

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
   const auth = getAuth(app);
  const db = getFirestore(app);

//  const app = initializeApp(firebaseConfig);

// Check if user is authenticated
const checkAuth = () => {
  const uid = localStorage.getItem("uid");
  if (!uid) {
    window.location.href = "../index.html"; // Redirect to login if not authenticated
  }
};

// Logout functionality
const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("uid"); // Clear UID from localStorage
    window.location.href = "../index.html"; // Redirect to login page
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
};

// Search users by email
const searchUsers = async (email) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  const userList = document.getElementById("userList");
  userList.innerHTML = ""; // Clear previous results

  querySnapshot.forEach((doc) => {
    const userData = doc.data();
    const li = document.createElement("li");
    li.textContent = `Email: ${userData.email}, UID: ${userData.uid}`;
    userList.appendChild(li);
  });
};

// Event listeners
document.getElementById('logoutButton').addEventListener('click', logout);


document.getElementById('searchButton').addEventListener('click', () => {
  const searchEmail = document.getElementById('searchBar').value;
  searchUsers(searchEmail);
});

// Check authentication on page load
window.onload = () => {
  checkAuth();
};