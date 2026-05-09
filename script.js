let cart = JSON.parse(localStorage.getItem("cart")) || [];

let allProducts = [];


// LOAD PRODUCTS

fetch("https://ecommerce-backend-1-uinl.onrender.com/api/products")
  .then(res => res.json())
  .then(data => {

    allProducts = data;

    displayProducts(allProducts.slice(0,20));

  })

  .catch(err => console.log(err));




// DISPLAY PRODUCTS

function displayProducts(products){

  const container =
    document.getElementById("products");

  container.innerHTML = "";

  products.forEach(product => {

    container.innerHTML += `

      <div class="card">

        <img loading="lazy" src="${product.image}" />

        <h3>${product.name}</h3>

        <p>₹${product.price}</p>

        <small>${product.category}</small>

        <button onclick='addToCart(${JSON.stringify(product)})'>
          Add to Cart
        </button>

      </div>

    `;

  });

}




// FILTER PRODUCTS

function filterProducts(category){

  if(category === "All"){

    displayProducts(allProducts.slice(0,20));
    return;
  }

  const filteredProducts =
    allProducts.filter(product =>
      product.category === category
    );

  displayProducts(filteredProducts.slice(0,20));

}




// SEARCH PRODUCTS

function searchProducts(){

  const value =
    document.getElementById("search")
    .value
    .toLowerCase();

  const filtered =
    allProducts.filter(product =>
      product.name.toLowerCase().includes(value)
    );

  displayProducts(filtered.slice(0,20));

}

function filterProducts(category){

  if(category === "All"){

    displayProducts(allProducts.slice(0,20));

  }else{

    const filteredProducts =
      allProducts.filter(product =>
        product.category === category
      );

    displayProducts(filteredProducts.slice(0,20));
  }

}


// ADD TO CART

function addToCart(product){

  cart.push(product);

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  updateCartCount();

  alert("Added to Cart");

}




// UPDATE CART COUNT

function updateCartCount(){

  const cartCount =
    document.getElementById("cart-count");

  if(cartCount){

    cartCount.innerText = cart.length;

  }

}


updateCartCount();