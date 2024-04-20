var socket = io('/chat-notifications');

let to = ''; // contact nick
let from = ''; // user nick

const messagesBuffer = new Map();

socket.on('connected', (userNick) => {
    from = userNick;
    addUserInfo(from);
});

socket.on('contacts-list', (contacts) => {
    others = contacts.filter(contactNick => contactNick !== from);
    // If it's greater than 1, because the user is already in the list
    if (contacts.length > 1) {
        to = others[0];
        updateContacts(others);
        updateChatHeader();
    } else {
        updateContacts(others);
        hideChatHeader();
    }
});

socket.on('chat-message', (msg) => {
    const { content, from } = msg;
    if (from === to) {
        addOtherMessage(content);
    } else {
        storeUnreadMessage(from, content);
        updateUnreadMessages(from);
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
        socket.emit('chat-message', { message: this.value, to, from });
        addMyMessage(this.value);
        this.value = '';
    }
});


/* 
    User info 
*/

function addUserInfo(nick) {
    documentSelectors.userInfo.innerHTML = `
        <div class="user-nick">${nick}</div>
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
    contactCard.dataset.nick = contact;
    contactCard.innerHTML = `
        <div class="contact-info">
            <span class="user-nick">${contact}</span>
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
        dispalyUnreadMessages(to);
        hideUnreadMessages(to);
    });
    documentSelectors.contactsList.appendChild(contactCard);
}

function updateUnreadMessages(nick) {
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        if (card.dataset.nick == nick) {
            const unreadMessagesInfo = card.querySelector('.unread-messages-info');
            unreadMessagesInfo.textContent = messagesBuffer.get(nick).length;
            unreadMessagesInfo.style.display = 'block';
        }
    });
}

function hideUnreadMessages(nick) {
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        if (card.dataset.nick == nick) {
            const unreadMessagesInfo = card.querySelector('.unread-messages-info');
            unreadMessagesInfo.style.display = 'none';
        }
    });
}

function updateChatHeader() {
    documentSelectors.chatHeader.innerHTML = `
        <div class="contact-info">
        <span class="user-nick">${to}</span>
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

function storeUnreadMessage(nick, message) {
    const MAX_UNREAD_MESSAGES = 10;

    if (!messagesBuffer.has(nick)) {
        messagesBuffer.set(nick, []);
    }

    if (messagesBuffer.get(nick).length >= MAX_UNREAD_MESSAGES) return;
    
    messagesBuffer.get(nick).push(message);
}

function dispalyUnreadMessages(nick) {
    if (messagesBuffer.has(nick)) {
        messagesBuffer.get(nick).forEach(msg => addOtherMessage(msg));
        messagesBuffer.delete(nick);
    }
}

function hideChatHeader() {
    documentSelectors.chatHeader.style.display = 'none';
}