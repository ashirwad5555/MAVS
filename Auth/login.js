// import { auth, provider, db } from "./firebase-config.js";

// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("auth-form");
//   const toggleBtn = document.getElementById("toggle-btn");
//   const formTitle = document.getElementById("form-title");
//   const submitBtn = document.getElementById("submit-btn");
//   // const googleBtn = document.getElementById("google-btn");
//   let isLogin = true;

//   toggleBtn.addEventListener("click", function () {
//     isLogin = !isLogin;
//     formTitle.textContent = isLogin ? "Login" : "Sign Up";
//     submitBtn.textContent = isLogin ? "Login" : "Sign Up";
//     toggleBtn.textContent = isLogin
//       ? "Create an account"
//       : "I already have an account";
//   });

//   form.addEventListener("submit", function (e) {
//     e.preventDefault();
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     const userType = document.getElementById("userType").value;

//     if (isLogin) {
//       // Perform login operation
//       console.log("Login", { email, password, userType });
//     } else {
//       // Perform sign-up operation
//       console.log("Sign Up", { email, password, userType });
//     }
//   });

// googleBtn.addEventListener("click", function () {
//   // Perform Google Sign-In operation
//   console.log("Sign In with Google");
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const user = result.user;
//       console.log(user);
//       window.location.href = "../view/student/studentProfile.html";
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//     });
// });
// });
