let cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("cart-items");

let total = 0;

cart.forEach((product, index) => {

  total += product.price;

  container.innerHTML += `
    <div class="card">
      <img src="${product.image}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>

      <button onclick="increase(${index})">+</button>

      <button onclick="decrease(${index})">-</button>
    </div>
  `;
});

document.getElementById("total").innerText =
  "Total: ₹" + total;


// ✅ INCREASE
function increase(index) {

  cart.push(cart[index]);

  localStorage.setItem("cart", JSON.stringify(cart));

  location.reload();
}


// ✅ DECREASE
function decrease(index) {

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  location.reload();
}