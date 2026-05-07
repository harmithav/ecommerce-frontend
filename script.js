// ✅ ACCOUNT SYSTEM

const user = localStorage.getItem("user");

const accountBtn =
  document.getElementById("account-btn");

const dropdown =
  document.getElementById("account-dropdown");

const userEmail =
  document.getElementById("user-email");


// HIDE DROPDOWN INITIALLY
dropdown.style.display = "none";


// SHOW EMAIL ONLY IF LOGGED IN
if(user){

  userEmail.innerText = "Email: " + user;

}else{

  userEmail.innerText = "Not Logged In";
}


// TOGGLE DROPDOWN
accountBtn.addEventListener("click", () => {

  if(dropdown.style.display === "none"){

    dropdown.style.display = "block";

  }else{

    dropdown.style.display = "none";
  }

});


// LOGOUT
function logoutUser(){

  localStorage.removeItem("user");

  alert("Logged Out");

  window.location.href = "login.html";
}