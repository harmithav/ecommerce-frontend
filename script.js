// 🟢 STEP 1: Load existing cart (TOP of file)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

fetch("https://ecommerce-backend-1-uinl.onrender.com/api/products")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("products");
    container.innerHTML = "";

    data.forEach(product => {
      container.innerHTML += `
        <div class="card">
          <img src="${product.image}" />
          <h3>${product.name}</h3>
          <p>₹${product.price}</p>
          <button>Add to Cart</button>
        </div>
      `;
    });
  })
  .catch(err => console.log(err));