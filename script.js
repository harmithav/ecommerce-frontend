console.log("SCRIPT RUNNING");

// 🟢 CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 🟢 ALL PRODUCTS
let allProducts = [];


// 🟢 FETCH PRODUCTS FROM BACKEND
fetch("https://ecommerce-backend-1-uinl.onrender.com/api/products")
  .then(res => res.json())

  .then(data => {

    console.log("ALL PRODUCTS:", data);

    // ✅ REMOVE LOADING TEXT
    const loading =
      document.getElementById("loading");

    if(loading){
      loading.style.display = "none";
    }

    allProducts = data;

    displayProducts(data);

  })

  .catch(error => {

    console.log(error);

  });




// 🟢 DISPLAY PRODUCTS
function displayProducts(products){

  const container =
    document.getElementById("products");

  container.innerHTML = "";

  products.forEach(product => {

    const quantity =
      getProductQuantity(product.name);

    container.innerHTML += `

      <div class="card">

        <img src="${product.image}" />

        <h3>${product.name}</h3>

        <p>₹${product.price}</p>

        <small>${product.category}</small>

        ${
          quantity === 0

          ?

          `<button onclick='addToCart(${JSON.stringify(product)})'>
              Add to Cart
           </button>`

          :

          `<div class="qty-box">

              <button onclick="decreaseQty('${product.name}')">
                -
              </button>

              <span>${quantity}</span>

              <button onclick='addToCart(${JSON.stringify(product)})'>
                +
              </button>

           </div>`
        }

      </div>
    `;
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




// 🟢 DECREASE QTY
function decreaseQty(productName){

  const index =
    cart.findIndex(item =>
      item.name === productName
    );

  if(index !== -1){

    cart.splice(index, 1);

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    updateCartCount();

    displayProducts(allProducts);
  }
}




// 🟢 GET PRODUCT QTY
function getProductQuantity(productName){

  return cart.filter(item =>
    item.name === productName
  ).length;
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

  const value =
    document.getElementById("search")
    .value
    .toLowerCase();

  const filtered =
    allProducts.filter(product =>

      product.name
      .toLowerCase()
      .includes(value)

      ||

      product.category
      .toLowerCase()
      .includes(value)
    );

  displayProducts(filtered);
}




// 🟢 INITIAL CART COUNT
updateCartCount();




// =========================
// 🟢 ACCOUNT SYSTEM
// =========================

const user =
  localStorage.getItem("user");

const accountBtn =
  document.getElementById("account-btn");

const dropdown =
  document.getElementById("account-dropdown");

const userEmail =
  document.getElementById("user-email");



if(accountBtn && dropdown && userEmail){

  dropdown.style.display = "none";


  // LOGIN CHECK
  if(user){

    accountBtn.innerText = "My Account";

    userEmail.innerText =
      "Email: " + user;

  }else{

    accountBtn.innerText = "Login";

    userEmail.innerText =
      "Please Login";
  }



  // BUTTON CLICK
  accountBtn.addEventListener("click", () => {

    if(!user){

      window.location.href =
        "login.html";

      return;
    }

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

  window.location.href =
    "login.html";
}

// 🟢 FILTER CATEGORY

function filterCategory(category){

  if(category === "All"){

    displayProducts(allProducts);

    return;
  }

  const filteredProducts =
    allProducts.filter(product =>
      product.category === category
    );

  displayProducts(filteredProducts);

}