document.getElementById('send-btn').addEventListener('click', function() {  
    if (validateInput()) {  
        sendMessage();  
    }  
});  
  
document.getElementById('clear-btn').addEventListener('click', function() {  
    clearMessages();  
});  
  
document.getElementById('chat-input').addEventListener('keypress', function(e) {  
    if (e.key === 'Enter') {  
        if (validateInput()) {  
            sendMessage();  
        }  
    }  
});  
  
function validateInput() {  
    const input = document.getElementById('chat-input');  
    const messageText = input.value.trim();  
    if (messageText === '') {  
        alert('Please enter a message.');  
        return false;  
    }  
    return true;  
}  
  
function sendMessage() {  
    const input = document.getElementById('chat-input');  
    const messageText = input.value.trim();  
    if (messageText !== '') {  
        addMessage('user', messageText);  
        input.value = '';  
  
        fetch('/search', {  
            method: 'POST',  
            headers: {  
                'Content-Type': 'application/json',  
            },  
            body: JSON.stringify({ prompt: messageText }),  
        })  
        .then(response => response.json())  
        .then(data => {  
            addMessage('bot', data.response);  
        })  
        .catch(error => {  
            console.error('Error:', error);  
        });  
    }  
}  
  
function addMessage(sender, text) {  
    const chatBody = document.getElementById('chat-body');  
    const messageContainer = document.createElement('div');  
    messageContainer.classList.add('message', sender);  
    const messageText = document.createElement('p');  
    messageText.textContent = text;  
    messageContainer.appendChild(messageText);  
    chatBody.appendChild(messageContainer);  
    chatBody.scrollTop = chatBody.scrollHeight;  
}  
  
function clearMessages() {  
    const chatBody = document.getElementById('chat-body');  
    chatBody.innerHTML = '';  
}  
