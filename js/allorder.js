import { getFirestore, collection, onSnapshot, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const db = getFirestore();
const auth = getAuth();

function renderOrder(doc) {
    const orderList = document.getElementById('ordersList');
    const orderDiv = document.createElement('div');
    orderDiv.className = "order";

    const svgImage = document.createElement('div');
    svgImage.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
        </svg>
    `;
    svgImage.className = 'order-icon';
    svgImage.style.display = 'none';

    const tableNo = document.createElement('p');
    tableNo.textContent = `Table No: ${doc.data().tableNo}`;

    const orderDetails = document.createElement('p');
    orderDetails.textContent = `Order: ${doc.data().orderDetails}`;

    const totalCost = document.createElement('p');
    totalCost.textContent = `Total Cost: ${doc.data().totalCost}`;

    const completeButton = document.createElement('button');
    completeButton.textContent = "Complete";

    if (doc.data().status === "completed") {
        completeButton.style.backgroundColor = "green";
        svgImage.style.display = "flex";
    } else {
        completeButton.style.backgroundColor = "white";
        svgImage.style.display = "none";
    }

    completeButton.onclick = async () => {
        const newStatus = doc.data().status === "completed" ? "incomplete" : "completed";
        await updateDoc(doc.ref, { status: newStatus });

        if (newStatus === "completed") {
            completeButton.style.backgroundColor = "green";
            svgImage.style.display = "flex";
        } else {
            completeButton.style.backgroundColor = "white";
            svgImage.style.display = "none";
        }
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.onclick = async () => {
        await deleteDoc(doc.ref);
    };

    orderDiv.appendChild(svgImage);
    orderDiv.appendChild(tableNo);
    orderDiv.appendChild(orderDetails);
    orderDiv.appendChild(totalCost);
    orderDiv.appendChild(completeButton);
    orderDiv.appendChild(deleteButton);
    orderList.appendChild(orderDiv);
}



const ordersCollection = collection(db, "orders");
onSnapshot(ordersCollection, (snapshot) => {
    document.getElementById('ordersList').innerHTML = '';
    snapshot.forEach((doc) => {
        renderOrder(doc);
    });
});

