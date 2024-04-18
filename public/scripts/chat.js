var socket = io();

let to = '';
let from = '';

const messagesBuffer = new Map();

socket.on('connected', function(msg) {
    from = msg;
    addUserInfo(from);
});

socket.on('contacts-list', (contacts) => {
    others = contacts.filter(contact => contact.socket !== socket.id);
    updateContacts(others);
    if (contacts.length > 1 && !to) {
        to = others[0];
        updateChatHeader();
    }
});

socket.on('chat-msg', (msg) => {
    const { content, from } = msg;
    console.log('chat-msg', content);
    if (from.id === to.id) {
        addOtherMessage(content);
    } else {
        storeUnreadMessage(from.id, content);
        updateUnreadMessages(from.id);
        console.log('unread messages', messagesBuffer)
    }
});

const documentSelectors = {
    inputMessage: document.querySelector('.input-message'),
    userInfo: document.querySelector('.user-info'),
    messagesContainer: document.querySelector('.messages-container'),
    contactsList: document.querySelector('.contacts-list'),
    chatHeader: document.querySelector('.chat-header'),
};

/* 
    Event listeners
*/

documentSelectors.inputMessage.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (!this.value) return;
        socket.emit('chat-msg', { message: this.value, to, from });
        addMyMessage(this.value);
        this.value = '';
    }
});


/* 
    User info 
*/

function addUserInfo(user) {
    documentSelectors.userInfo.innerHTML = `
        <div class="user-nick">${user.nick}</div>
        <div class="user-status">
            <span class="status-text">Active</span>
            <span class="status-dot"></span>
        </div>
    `;
}

/* 
    Messages 
*/

function addMyMessage(msg) {
    const newMessage = document.createElement('div');
    newMessage.className = 'message my-message';
    newMessage.innerHTML = '<p>' + msg + '</p>';
    documentSelectors.messagesContainer.appendChild(newMessage);
    scrollToBottom();
}

function addOtherMessage(msg) {
    const newMessage = document.createElement('div');
    newMessage.className = 'message other-message';
    newMessage.innerHTML = '<p>' + msg + '</p>';
    documentSelectors.messagesContainer.appendChild(newMessage);
    scrollToBottom();
}

const messagesContainer = documentSelectors.messagesContainer;

function scrollToBottom() {
    documentSelectors.messagesContainer.scrollTop = documentSelectors.messagesContainer.scrollHeight;
}

/* 
    Contact list 
*/

function updateContacts(contacts) {
    documentSelectors.contactsList.innerHTML = '';
    contacts.forEach(contact => {
        if (contact.socket !== socket.id) addContactCard(contact);
    });
}

function addContactCard(contact) {
    const contactCard = document.createElement('div');
    contactCard.className = 'contact-card';
    contactCard.dataset.id = contact.id;
    contactCard.innerHTML = `
        <div class="contact-info">
            <span class="contact-nick">${contact.nick}</span>
            <div class="user-status">
                <span class="status-text">Active</span>
                <span class="status-dot"></span>
                <span class="unread-messages-info">0</span>
            </div>
        </div>
    `;
    contactCard.addEventListener('click', function(e) {
        e.preventDefault();
        to = contact;
        documentSelectors.messagesContainer.innerHTML = '';
        updateChatHeader();
        dispalyUnreadMessages(to.id);
        hideUnreadMessages(to.id);
    });
    documentSelectors.contactsList.appendChild(contactCard);
}

function updateUnreadMessages(id) {
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        if (card.dataset.id == id) {
            console.log('card', card.dataset.id, id);
            const unreadMessagesInfo = card.querySelector('.unread-messages-info');
            unreadMessagesInfo.textContent = messagesBuffer.get(id).length;
            unreadMessagesInfo.style.display = 'block';
        }
    });
}

function hideUnreadMessages(id) {
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        if (card.dataset.id == id) {
            const unreadMessagesInfo = card.querySelector('.unread-messages-info');
            unreadMessagesInfo.style.display = 'none';
        }
    });
}

function updateChatHeader() {
    documentSelectors.chatHeader.innerHTML = `
        <div class="contact-info">
        <span class="contact-nick">${to.nick}</span>
        <div class="user-status">
            <span class="status-text">Active</span>
            <span class="status-dot"></span>
        </div>
        </div>
    `;
    documentSelectors.chatHeader.style.display = 'flex';
}

/* 
    Utils 
*/

function storeUnreadMessage(id, message) {
    const MAX_UNREAD_MESSAGES = 10;

    if (!messagesBuffer.has(id)) {
        messagesBuffer.set(id, []);
    }

    if (messagesBuffer.get(id).length >= MAX_UNREAD_MESSAGES) return;
    
    messagesBuffer.get(id).push(message);
}

function dispalyUnreadMessages(id) {
    if (messagesBuffer.has(id)) {
        messagesBuffer.get(id).forEach(msg => addOtherMessage(msg));
        messagesBuffer.delete(id);
    }
}