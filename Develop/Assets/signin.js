document.getElementById('signInForm').addEventListener('submit', function(event) {
    // prevent that default action and instead perform custom logic for handling the form data, such as
    // Displaying error messages or success notifications. and Validating the user’s input.
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

