document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from submitting 

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;

    if (name && email) {
        // Save data to localStorage
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);

        alert('Your data has been saved successfully!');
        
        // Redirect back to the home page (index.html)
        window.location.href = 'index.html';
    } else {
        alert('Please fill in all fields.');
    }
});

