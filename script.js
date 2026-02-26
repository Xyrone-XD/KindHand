function login() {
    let user = document.getElementById("username").value;
    if(user === "") {
        alert("Enter your name");
        return;
    }
    localStorage.setItem("kindhandUser", user);
    window.location.href = "index.html";
}

function addProduct() {
    let name = document.getElementById("pname").value;
    let price = document.getElementById("price").value;
    let contact = document.getElementById("contact").value;
    let file = document.getElementById("imageInput").files[0];

    if(!file) {
        alert("Upload image");
        return;
    }

    let reader = new FileReader();
    reader.onload = function() {
        let product = {
            name: name,
            price: price,
            contact: contact,
            image: reader.result
        };

        let products = JSON.parse(localStorage.getItem("products")) || [];
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
        alert("Product Added!");
        window.location.href = "index.html";
    };
    reader.readAsDataURL(file);
}

window.onload = function() {
    let user = localStorage.getItem("kindhandUser");
    if(user && document.getElementById("greetText")) {
        document.getElementById("greetText").innerText =
            "Welcome, " + user + " 👋";
    }

    let productList = document.getElementById("productList");
    if(productList) {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        products.forEach(p => {
            productList.innerHTML += `
            <div class="product-card">
                <img src="${p.image}">
                <h3>${p.name}</h3>
                <p>₹${p.price}</p>
                <p>Contact: ${p.contact}</p>
            </div>
            `;
        });
    }
}
