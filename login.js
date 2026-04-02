// Load users or create empty
let users = JSON.parse(localStorage.getItem("users")) || [];

// 🔷 Register Function
function register() {
    let user = document.getElementById("newUser").value;
    let pass = document.getElementById("newPass").value;

    if (user === "" || pass === "") {
        alert("Fill all fields");
        return;
    }

    // Check if user exists
    let exists = users.find(u => u.username === user);

    if (exists) {
        alert("Username already exists");
        return;
    }

    users.push({ username: user, password: pass });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");

    window.location.href = "login.html";
}

// 🔷 Login Function
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    let validUser = users.find(u => 
        u.username === user && u.password === pass
    );

    if (validUser) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", user);

        window.location.href = "index.html";
    } else {
        alert("Invalid username or password");
    }
}

// 🔷 Go to Register Page
function goToRegister() {
    window.location.href = "register.html";
}