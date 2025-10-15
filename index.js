document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const showPassword = document.getElementById('showPassword');
    const submitBtn = form.querySelector('button[type="submit"]');

    const modal = document.getElementById('successModal');
    const modalClose = modal.querySelector('.close');
    const closeBtn = document.getElementById('closeBtn');
    const userNameDisplay = document.getElementById('userName');
    const userEmailDisplay = document.getElementById('userEmail');
    const userPasswordDisplay = document.getElementById('userPassword');

    const rules = {
        firstName: {
            validate: val => /^[A-ZА-ЯІЇЄ][a-zа-яіїє']+$/.test(val),
            message: "Ім'я має починатися з великої літери та містити лише літери"
        },
        lastName: {
            validate: val => /^[A-ZА-ЯІЇЄ][a-zа-яіїє']+$/.test(val),
            message: "Прізвище має починатися з великої літери та містити лише літери"
        },
        email: {
            validate: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
            message: "Невірний формат e-mail"
        },
        password: {
            validate: val => {
                const hasUpperCase = /[A-Z]/.test(val);
                const hasLowerCase = /[a-z]/.test(val);
                const hasNumber = /\d/.test(val);
                const hasSpecialChar = /[!@#$%^&*]/.test(val);
                const hasMinLength = val.length >= 8;
                
                return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasMinLength;
            },
            message: "Пароль має бути ≥ 8 символів, містити велику, малу букву, цифру, спецсимвол"
        }
    };

    function validateField(input) {
        const fieldName = input.id;
        const val = input.value.trim();
        const errorSpan = document.getElementById(`${fieldName}Error`);
        
        if (!val) {
            input.classList.remove('valid', 'invalid');
            if (errorSpan) errorSpan.textContent = '';
            return false;
        }
        
        if (!rules[fieldName].validate(val)) {
            input.classList.add('invalid');
            input.classList.remove('valid');
            if (errorSpan) errorSpan.textContent = rules[fieldName].message;
            return false;
        } else {
            input.classList.remove('invalid');
            input.classList.add('valid');
            if (errorSpan) errorSpan.textContent = '';
            return true;
        }
    }

    function validateAllFields() {
        const fields = [firstName, lastName, email, password];
        const allValid = fields.every(field => {
            const val = field.value.trim();
            if (!val) return false; 
            return validateField(field);
        });
        
        submitBtn.disabled = !allValid;
        return allValid;
    }

    [firstName, lastName, email, password].forEach(input => {
        input.addEventListener('input', () => {
            validateField(input);
            validateAllFields();
        });
        
        input.addEventListener('blur', () => {
            validateField(input);
            validateAllFields();
        });
    });

    showPassword.addEventListener('change', () => {
        password.type = showPassword.checked ? 'text' : 'password';
    });

    form.addEventListener('submit', event => {
        event.preventDefault();
        
        if (!validateAllFields()) {
            alert('Будь ласка, виправте помилки в формі');
            return;
        }
        
        console.log('Дані форми:', {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value
        });

        userNameDisplay.textContent = `${firstName.value} ${lastName.value}`;
        userEmailDisplay.textContent = email.value;
        userPasswordDisplay.textContent = '*'.repeat(password.value.length); 
        
        modal.style.display = 'flex';
        
        form.reset();
        
        [firstName, lastName, email, password].forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
        
        submitBtn.disabled = true;
        
        showPassword.checked = false;
        password.type = 'password';
    });

    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    submitBtn.disabled = true;
});