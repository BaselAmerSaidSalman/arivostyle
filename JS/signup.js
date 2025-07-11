document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    alert('Account created successfully! Welcome to ProPlatform!');
});

function signupWithGoogle() {
    alert('Google signup would be implemented here');
}

function signupWithLinkedIn() {
    alert('LinkedIn signup would be implemented here');
}

function showLogin() {
    alert('Redirect to login page');
}

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});