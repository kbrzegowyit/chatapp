const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', function(event) {
    console.log('Form submitted');
    // Prevent the form from being submitted normally
    event.preventDefault();

    // Get the form data
    const formData = new FormData(loginForm);

    // Convert the form data to a JSON object
    const data = {};
    formData.forEach((value, key) => data[key] = value);

    // Send a POST request to the login API
    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        const result = response.json();
        console.log('Response:', result);
        return result;
    })
    .then(data => {
        console.log('Data:', data)
        if (data.success) {
            // Login was successful
            console.log('Logged in successfully');
        } else {
            // Login failed
            console.log('Login failed');
        }
    })
    .catch(error => {
        // An error occurred
        console.error('Error:', error);
    });
});