function loginUser() {

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  // SIMPLE VALIDATION
  if(email === "" || password === "") {

    alert("Please fill all fields");

    return;
  }

  // DEMO LOGIN SUCCESS
  alert("Login Successful");

  // REDIRECT TO HOME PAGE
  window.location.href = "index.html";
}