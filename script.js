// استيراد Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, get, remove } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// تكوين Firebase (استبدل بمعلومات مشروعك من Firebase Console)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// عند الضغط على زر "تسجيل الدخول"
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("message");

    // حفظ بيانات تسجيل الدخول في Firebase
    set(ref(database, "users/" + username), {
        username: username,
        password: password
    }).then(() => {
        message.style.color = "green";
        message.textContent = "تم حفظ بياناتك في السحابة!";
    }).catch((error) => {
        console.error("Error saving data:", error);
        message.style.color = "red";
        message.textContent = "حدث خطأ أثناء الحفظ.";
    });
});

// استرجاع بيانات المستخدم عند إدخال اسم المستخدم
document.getElementById("username").addEventListener("blur", function() {
    let username = document.getElementById("username").value;
    let passwordInput = document.getElementById("password");

    if (username) {
        get(ref(database, "users/" + username)).then((snapshot) => {
            if (snapshot.exists()) {
                passwordInput.value = snapshot.val().password;
            } else {
                passwordInput.value = "";
            }
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
    }
});

// مسح البيانات عند الضغط على الزر
document.getElementById("clearData").addEventListener("click", function() {
    let username = document.getElementById("username").value;

    if (username) {
        remove(ref(database, "users/" + username)).then(() => {
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
            alert("تم مسح بيانات تسجيل الدخول!");
        }).catch((error) => {
            alert("حدث خطأ أثناء مسح البيانات.");
        });
    }
});