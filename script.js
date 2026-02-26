function login() {
    let user = document.getElementById("username").value;
    if(user === "") {
        alert("Enter your name");
        return;
    }

    localStorage.setItem("kindhandUser", user);
    window.location.href = "index.html";
}

function signup() {
    login(); // For demo both same
}

window.onload = function() {
    let user = localStorage.getItem("kindhandUser");
    if(user) {
        document.getElementById("greetText").innerText = "Welcome back, " + user + " 👋";
        document.getElementById("authBtn").innerText = "Logout";
        document.getElementById("authBtn").href = "#";
        document.getElementById("authBtn").onclick = function() {
            localStorage.removeItem("kindhandUser");
            location.reload();
        }
    }
}
