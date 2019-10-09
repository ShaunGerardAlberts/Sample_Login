var signUp = document.getElementById('signup-btn');
var login = document.getElementById('login-btn');
var registerSection = document.getElementById('register-section');
var loginSection = document.getElementById('login-section');

var password = document.getElementById('password');
var confirmPassword = document.getElementById('confirm-password');

signUp.addEventListener('click', () => {
  signUp.classList.add('active');
  login.classList.remove('active');
  registerSection.classList.add('show');
  registerSection.classList.remove('hide');
  loginSection.classList.remove('show');
  loginSection.classList.add('hide');
});

login.addEventListener('click', () => {
  login.classList.add('active');
  signUp.classList.remove('active');
  registerSection.classList.add('hide');
  registerSection.classList.remove('show');
  loginSection.classList.remove('hide');
  loginSection.classList.add('show');
});

validatePassword = () => {
  password = document.getElementById('password');
  confirmPassword = document.getElementById('confirm-password');
  if(password.value != confirmPassword.value) {
    confirmPassword.setCustomValidity("Passwords Don't Match");
  } else {
    confirmPassword.setCustomValidity('');
  }
};

password.onchange = validatePassword;
confirmPassword.onkeyup = validatePassword;

// registerSection.addEventListener("submit", (e) => {
//   e.preventDefault();
//   var password = document.getElementById('password');
//   var confirmPassword = document.getElementById('confirm-password');
//   if (password.value !== confirmPassword.value) {
//     console.log("incorrect");
//     confirmPassword.setCustomValidity("Passwords Don't Match");
//     return;
//   } else {
//     confirmPassword.setCustomValidity("");
//     return true;
//   }
// })