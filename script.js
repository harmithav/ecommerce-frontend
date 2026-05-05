let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ✅ FETCH PRODUCTS FROM BACKEND
fetch("https://ecommerce-backend-1-uinl.onrender.com/api/products")
  .then(res => res.json())
  .then(data => {
    console.log("API DATA:", data); // 👈 DEBUG (VERY IMPORTANT)

    const container = document.getElementById("products");

    if (!container) {
      console.error("❌ products div not found");
      return;
    }

    container.innerHTML = "";

    data.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button>Add to Cart</button>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("❌ Fetch Error:", err);
  });