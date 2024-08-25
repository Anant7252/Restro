import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

onAuthStateChanged(auth, async (user) => {
    const signinElement = document.getElementById('signin');
    const companyNameElement = document.getElementById('companyName');
    const signoutButton = document.getElementById('signout');

    if (user) {
        const docRef = doc(db, "players", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const companyName = docSnap.data().companyName || "Default Company Name";
            companyNameElement.textContent = companyName;
            companyNameElement.style.display = 'inline';
        } else {
            companyNameElement.textContent = "No Company Name Set";
            companyNameElement.style.display = 'inline';
        }

        signinElement.style.display = 'none';
        signoutButton.style.display = 'inline';
    } else {
        signinElement.style.display = 'inline';
        companyNameElement.style.display = 'none';
        signoutButton.style.display = 'none';
    }
});

document.getElementById('companyName').addEventListener('click', () => {
    const signoutButton = document.getElementById('signout');
    signoutButton.style.display = signoutButton.style.display === 'none' ? 'inline' : 'none';
});

document.getElementById('signout').addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = "login.html";
    }).catch((error) => {
        alert(error.message);
    });
});

document.getElementById('side').addEventListener('click',() =>{
    const nav =document.querySelector("nav");
    nav.style.display="flex";
    nav.style.right="0";
    nav.style.transition="right 0.5s ease";
});
document.addEventListener('click', (event) => {
    const nav =document.querySelector("nav");
    const side=document.getElementById("side");
    const isClickInside = nav.contains(event.target) || side.contains(event.target);
    
    if (!isClickInside) {
        nav.style.right = "-100vw"; 
        // nav.style.transition="left 0.5s ease";
        setTimeout(() => {
            nav.style.display = "none";
        }, 3000); 
    }
});

