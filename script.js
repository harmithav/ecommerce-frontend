console.log("SCRIPT RUNNING");

// 🟢 CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 🟢 ALL PRODUCTS
let allProducts = [];


// 🟢 FETCH PRODUCTS
fetch("https://ecommerce-backend-1-uinl.onrender.com/api/products")
  .then(res => res.json())
  .then(data => {

    console.log("PRODUCTS:", data);

    allProducts = data;

    displayProducts(data);

  })
  .catch(err => console.log(err));


// 🟢 DISPLAY PRODUCTS
function displayProducts(products) {

  const container =
    document.getElementById("products");

  if(!container) return;

  container.innerHTML = "";

  products.forEach(product => {

    const card = document.createElement("div");

    card.classList.add("card");

    card.innerHTML = `
      <img src="${product.image}" />

      <h3>${product.name}</h3>

      <p>₹${product.price}</p>

      ${
  getProductQuantity(product.name) === 0

  ?

  `<button onclick='addToCart(${JSON.stringify(product)})'>
      Add to Cart
   </button>`

  :

  `<div class="qty-box">

      <button onclick="decreaseQty('${product.name}')">
        -
      </button>

      <span>
        ${getProductQuantity(product.name)}
      </span>

      <button onclick='addToCart(${JSON.stringify(product)})'>
        +
      </button>

   </div>`
}
    `;

    container.appendChild(card);

  });

}


// 🟢 ADD TO CART
function addToCart(product){

  cart.push(product);

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  updateCartCount();

  displayProducts(allProducts);
}

// 🟢 GET PRODUCT QUANTITY
function getProductQuantity(productName){

  return cart.filter(item =>
    item.name === productName
  ).length;
}


// 🟢 DECREASE QUANTITY
function decreaseQty(productName){

  const index = cart.findIndex(item =>
    item.name === productName
  );

  if(index !== -1){

    cart.splice(index, 1);

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    displayProducts(allProducts);

    updateCartCount();
  }

}

// 🟢 UPDATE CART COUNT
function updateCartCount(){

  const cartCount =
    document.getElementById("cart-count");

  if(cartCount){

    cartCount.innerText = cart.length;
  }

}


// 🟢 SEARCH PRODUCTS
function searchProducts(){

  const searchInput =
    document.getElementById("search");

  if(!searchInput) return;

  const value =
    searchInput.value.toLowerCase();

  const filtered =
    allProducts.filter(product =>
      product.name.toLowerCase().includes(value)
    );

  displayProducts(filtered);

}


// 🟢 INITIAL CART COUNT
updateCartCount();




// ==========================
// ✅ ACCOUNT SYSTEM
// ==========================

const user = localStorage.getItem("user");

const accountBtn =
  document.getElementById("account-btn");

const dropdown =
  document.getElementById("account-dropdown");

const userEmail =
  document.getElementById("user-email");


// ONLY RUN IF ELEMENTS EXIST
if(accountBtn && dropdown && userEmail){

  // HIDE INITIALLY
  dropdown.style.display = "none";

  // SHOW EMAIL
  // ✅ CHECK LOGIN

if(user){

  // USER LOGGED IN
  accountBtn.innerText = "My Account";

  userEmail.innerText =
    "Email: " + user;

}else{

  // USER NOT LOGGED IN
  accountBtn.innerText = "Login";

  userEmail.innerText =
    "Please Login";
}

  // TOGGLE DROPDOWN
  accountBtn.addEventListener("click", () => {

  // IF NOT LOGGED IN
  if(!user){

    window.location.href = "login.html";

    return;
  }

  // TOGGLE DROPDOWN
  if(dropdown.style.display === "none"){

    dropdown.style.display = "block";

  }else{

    dropdown.style.display = "none";
  }

});

}


// 🟢 LOGOUT
function logoutUser(){

  localStorage.removeItem("user");

  alert("Logged Out");

  window.location.href = "login.html";
}