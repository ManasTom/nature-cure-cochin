
// Handle login
document.getElementById('loginBtn').addEventListener('click', function () {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // Redirect to blog.html
            window.location.href = 'admin.html';
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert('Error: ' + errorMessage);
        });
});

// Handle forgot password
document.getElementById('forgotPasswordLink').addEventListener('click', function () {
    var email = document.getElementById('email').value;

    if (email) {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                alert('Password reset email sent!');
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert('Error: ' + errorMessage);
            });
    } else {
        alert('Please enter your email address.');
    }
});