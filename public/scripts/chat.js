var socket = io();

let to = '';

// Ask the user for their nickname when connected
socket.on('connect', function() {
    const nickname = prompt('Please enter your nickname');
    to = prompt('Please enter your nick of your friend');
    socket.emit('nickname', nickname);
});

// Listen for 'chat message' events
socket.on('chat message', function(msg) {
    // Add the new message to the chat
    const newMessage = document.createElement('div');
    newMessage.className = 'message other-message';
    newMessage.innerHTML = '<p><strong>User 2:</strong> ' + msg + '</p>';
    document.querySelector('.messages-container').appendChild(newMessage);
});

// Send a new message when the form is submitted
document.querySelector('.input-message').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        socket.emit('chat message', JSON.stringify({ message: this.value, to }));
        const newMessage = document.createElement('div');
        newMessage.className = 'message my-message';
        newMessage.innerHTML = '<p><strong>User 2:</strong> ' + this.value + '</p>';
        document.querySelector('.messages-container').appendChild(newMessage);
        this.value = '';
    }
});