function loginUser() {

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  if(email === "" || password === "") {

    alert("Please fill all fields");

    return;
  }

  // ✅ SAVE USER
  localStorage.setItem("user", email);

  alert("Login Successful");

  // ✅ GO TO HOME PAGE
  window.location.href = "index.html";
}
function togglePassword(){

  const passwordInput =
    document.getElementById("password");

  if(passwordInput.type === "password"){

    passwordInput.type = "text";

  } else {

    passwordInput.type = "password";
  }
}