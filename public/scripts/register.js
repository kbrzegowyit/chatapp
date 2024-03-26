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
    fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.status === 200) {
            window.location.replace('/chat');
        }
    })
    .catch(error => {
        // An error occurred
        console.error('Error:', error);
    });
});