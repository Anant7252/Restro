import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyC7VHrBKwJsNswfxcvCoBzmGeK4iLD8odY",
    authDomain: "bakery-management-app.firebaseapp.com",
    projectId: "bakery-management-app",
    storageBucket: "bakery-management-app.appspot.com",
    messagingSenderId: "13461804822",
    appId: "1:13461804822:web:fd78a155113858c3476237"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

document.getElementById('orderForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const tableNo = document.getElementById('tableNo').value;
    const orderDetails = document.getElementById('orderDetails').value;
    const totalCost = document.getElementById('totalCost').value;
    
    try {
        const user = auth.currentUser;
        const dialog=document.getElementById("mydiag");
        if (user) {
            const docRef = collection(db, "orders");
            await addDoc(docRef, {
                tableNo,
                orderDetails,
                totalCost,
                userId: user.uid,
                timestamp: new Date()
            });
            dialog.showModal();
            setTimeout(()=>{
                dialog.close();
            },2000)

            document.getElementById('orderForm').reset();
        } else {
            alert("User not logged in.");
        }
    } catch (error) {
        console.error("Error adding order: ", error);
        alert("Error submitting order. Please try again.");
    }
});
