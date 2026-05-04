// 🟢 STEP 1: Load existing cart (TOP of file)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 🟢 STEP 2: Fetch products from backend
fetch("http://localhost:5000/api/products")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("products");

    container.innerHTML = ""; // optional: prevents duplicate display

    data.forEach(product => {
      container.innerHTML += `
        <div class="card">
          <img src="${product.image}">
          <h3>${product.name}</h3>
          <p>₹${product.price}</p>
          <button onclick='addToCart(${JSON.stringify(product)})'>
            Add to Cart
          </button>
        </div>
      `;
    });
  })
  .catch(err => console.log(err));


// 🟢 STEP 3: ADD THIS FUNCTION (VERY IMPORTANT)
// 👉 Place this BELOW fetch OR ABOVE — both are fine

function addToCart(product) {
  cart.push(product);

  // Save to browser storage
  localStorage.setItem("cart", JSON.stringify(cart));

  alert(product.name + " added to cart");
}