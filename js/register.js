import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC7VHrBKwJsNswfxcvCoBzmGeK4iLD8odY",
  authDomain: "bakery-management-app.firebaseapp.com",
  projectId: "bakery-management-app",
  storageBucket: "bakery-management-app.appspot.com",
  messagingSenderId: "13461804822",
  appId: "1:13461804822:web:fd78a155113858c3476237"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const submit = document.getElementById('submit');
submit.addEventListener("click", function(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const companyName = document.getElementById("company name").value; 

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      
      await setDoc(doc(db, "players", user.uid), {
        email: user.email,
        uid: user.uid,
        companyName: companyName 
      });

      alert("Account created successfully!");
      window.location.href = "login.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        alert("Account already exists");
        window.location.href = "login.html";
      } else {
        const errorMessage = error.message;
        alert(errorMessage);
      }
    });
});
