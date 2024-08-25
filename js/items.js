import { getFirestore, collection, getDocs, doc, updateDoc, addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
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

document.addEventListener('DOMContentLoaded', async () => {
    const itemsList = document.getElementById('itemsList');
    await loadItems(itemsList);

    itemsList.addEventListener('click', (e) => {
        const itemDiv = e.target.closest('.item');
        if (e.target.classList.contains('edit-button')) {
            enableEditing(itemDiv);
        } else if (e.target.classList.contains('save-button')) {
            const itemId = e.target.getAttribute('data-id');
            saveItem(itemDiv, itemId);
        }
    });
});

document.getElementById('addItemForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const itemName = document.getElementById('itemName').value;
    const itemCost = document.getElementById('itemCost').value;

    await addDoc(collection(db, 'items'), {
        name: itemName,
        cost: parseFloat(itemCost)
    });

    alert('Item added successfully');
    document.getElementById('addItemForm').reset(); // Reset form fields
    await loadItems(document.getElementById('itemsList')); // Reload items
});

async function loadItems(itemsList) {
    itemsList.innerHTML = ''; // Clear existing items

    const itemsSnapshot = await getDocs(collection(db, 'items'));
    itemsSnapshot.forEach(doc => {
        const item = doc.data();
        const itemId = doc.id; 
        const itemDiv = document.createElement('div');
        itemDiv.className = "item";
        itemDiv.innerHTML = `
            <p>
                <span class="item-name">${item.name}</span>
                <input type="text" class="edit-name" value="${item.name}">
            </p>
            <p>
                Cost: <span class="item-cost">${item.cost}</span>
                <input type="text" class="edit-cost" value="${item.cost}">
            </p>
            <button class="edit-button" data-id="${itemId}">Edit</button>
            <button class="save-button" data-id="${itemId}">Save</button>
        `;
        itemsList.appendChild(itemDiv);
    });
}

function enableEditing(itemDiv) {
    const nameSpan = itemDiv.querySelector('.item-name');
    const costSpan = itemDiv.querySelector('.item-cost');
    const nameInput = itemDiv.querySelector('.edit-name');
    const costInput = itemDiv.querySelector('.edit-cost');
    const saveButton = itemDiv.querySelector('.save-button');

    nameSpan.style.display = 'none';
    costSpan.style.display = 'none';
    nameInput.style.display = 'inline';
    costInput.style.display = 'inline';
    saveButton.style.display = 'inline';
}

async function saveItem(itemDiv, itemId) {
    const nameInput = itemDiv.querySelector('.edit-name');
    const costInput = itemDiv.querySelector('.edit-cost');
    const name = nameInput.value;
    const cost = parseFloat(costInput.value);

    const itemRef = doc(db, 'items', itemId);
    await updateDoc(itemRef, {
        name: name,
        cost: cost
    });

    itemDiv.querySelector('.item-name').textContent = name;
    itemDiv.querySelector('.item-cost').textContent = cost;

    itemDiv.querySelector('.item-name').style.display = 'inline';
    itemDiv.querySelector('.item-cost').style.display = 'inline';
    nameInput.style.display = 'none';
    costInput.style.display = 'none';
    itemDiv.querySelector('.save-button').style.display = 'none';
}
