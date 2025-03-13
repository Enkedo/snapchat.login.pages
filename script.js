document.addEventListener("DOMContentLoaded", function() {
    let savedUsername = localStorage.getItem("savedUsername");
    let savedPassword = localStorage.getItem("savedPassword");

    if (savedUsername) {
        document.getElementById("username").value = savedUsername;
    }

    if (savedPassword) {
        document.getElementById("password").value = savedPassword;
    }
});

// حفظ بيانات تسجيل الدخول في Local Storage
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("message");

    localStorage.setItem("savedUsername", username);
    localStorage.setItem("savedPassword", password);

    message.style.color = "green";
    message.textContent = "تم تسجيل الدخول وحفظ بياناتك!";
});