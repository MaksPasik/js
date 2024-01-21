function saveUserData(username, password) {
  var existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  existingUsers.push({ username, password });
  localStorage.setItem("users", JSON.stringify(existingUsers));
}

function checkLoggedInUser() {
  var currentUser = localStorage.getItem("currentUser");

  if (currentUser) {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("loggedInButtons").style.display = "block";
  }
}

function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  var existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  var user = existingUsers.find(user => user.username === username && user.password === password);

  if (user) {
    localStorage.setItem("currentUser", username);
    checkLoggedInUser();
  } else {
    alert("Nieprawidłowe dane logowania");
  }
}

function toggleForms() {
  var loginForm = document.getElementById("loginForm");
  var registrationForm = document.getElementById("registrationForm");

  if (loginForm.style.display === "none") {
    loginForm.style.display = "block";
    registrationForm.style.display = "none";
  } else {
    loginForm.style.display = "none";
    registrationForm.style.display = "block";
  }
}

function register() {
  var newUsername = document.getElementById("newUsername").value;
  var newPassword = document.getElementById("newPassword").value;

  saveUserData(newUsername, newPassword);
  toggleForms();
  checkLoggedInUser();
}

function logout() {
  localStorage.removeItem("currentUser");
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("loggedInButtons").style.display = "none";
}

function losowaStrona() {
  const randomPages = ['pogoda.html', 'zgadnij-liczbe.html', 'papier-kamien-nozyce.html', 'pong.html', 'bird.html', 'kwadrat.html', 'lovetester.html', 'Mistrz-Kierownicy.html', 'wrozby.html'];
  const randomIndex = Math.floor(Math.random() * randomPages.length);
  const randomPage = randomPages[randomIndex];
  window.location.href = randomPage;
}

function wybor() {
  window.location.href = "wybor.html";
}

checkLoggedInUser();
