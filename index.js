const passwordField = document.getElementById("password");
const showPassword = document.getElementById("showPassword");

showPassword.addEventListener("change", function () {
    passwordField.type = this.checked ? "text" : "password";
});

const form = document.getElementById("loginForm");
const modal = document.getElementById("successModal");
const userName = document.getElementById("userName");
const closeBtn = document.getElementById("closeBtn");
const closeX = document.querySelector(".close");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();

    if (firstName.length === 0) {
        alert("Будь ласка, введіть ім'я!");
        return;
    }

    userName.textContent = firstName;

    modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    form.reset();
});

closeX.addEventListener("click", () => {
    modal.style.display = "none";
    form.reset();
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        form.reset();
    }
});
