var signUp = document.getElementById('signup-btn');
var login = document.getElementById('login-btn');
var registerSection = document.getElementById('register-section');
var loginSection = document.getElementById('login-section');

var password = document.getElementById('password');
var confirmPassword = document.getElementById('confirm-password');

// add html5 required message for recaptcha
window.onload = function() {
  var $recaptcha = document.querySelector('.g-recaptcha-response');

  if($recaptcha) {
      $recaptcha.setAttribute("required", "required");
  }
};

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

