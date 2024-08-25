// app.js

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC7VHrBKwJsNswfxcvCoBzmGeK4iLD8odY",
    authDomain: "bakery-management-app.firebaseapp.com",
    projectId: "bakery-management-app",
    storageBucket: "bakery-management-app.appspot.com",
    messagingSenderId: "13461804822",
    appId: "1:13461804822:web:fd78a155113858c3476237"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');

if (loginButton) {
    loginButton.addEventListener('click', () => {
        window.location.href = 'login.html';
    });
}

if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        auth.signOut().then(() => {
            alert('Logged out');
            window.location.href = 'index.html';
        });
    });
}

const takeOrderLink = document.getElementById('takeOrder');
const allOrdersLink = document.getElementById('allOrders');
const allItemsLink = document.getElementById('allItems');

if (takeOrderLink) {
    takeOrderLink.addEventListener('click', () => {
        if (!auth.currentUser) {
            alert("Please log in to take orders");
            window.location.href = 'login.html';
        } else {
            window.location.href = 'take_order.html';
        }
    });
}

if (allOrdersLink) {
    allOrdersLink.addEventListener('click', () => {
        if (!auth.currentUser) {
            alert("Please log in to view orders");
            window.location.href = 'login.html';
        } else {
            window.location.href = 'all_orders.html';
        }
    });
}

if (allItemsLink) {
    allItemsLink.addEventListener('click', () => {
        if (!auth.currentUser) {
            alert("Please log in to view items");
            window.location.href = 'login.html';
        } else {
            window.location.href = 'all_items.html';
        }
    });
}

auth.onAuthStateChanged(user => {
    const userStatus = document.getElementById('userStatus');
    if (user) {
        userStatus.innerText = `Logged in as: ${user.email}`;
        loginButton.style.display = 'none';
        logoutButton.style.display = 'inline';
    } else {
        userStatus.innerText = 'Not logged in';
        loginButton.style.display = 'inline';
        logoutButton.style.display = 'none';
    }
});

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                alert('Logged in successfully');
                window.location.href = 'index.html';
            })
            .catch((error) => {
                alert(error.message);
            });
    });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                alert('Registered successfully');
                window.location.href = 'index.html';
            })
            .catch((error) => {
                alert(error.message);
            });
    });
}