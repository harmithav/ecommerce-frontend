// ✅ ACCOUNT SYSTEM

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
  if(user){

    userEmail.innerText = "Email: " + user;

  }else{

    userEmail.innerText = "Not Logged In";
  }

  // TOGGLE
  accountBtn.addEventListener("click", () => {

    if(dropdown.style.display === "none"){

      dropdown.style.display = "block";

    }else{

      dropdown.style.display = "none";
    }

  });

}


// LOGOUT
function logoutUser(){

  localStorage.removeItem("user");

  alert("Logged Out");

  window.location.href = "login.html";
}