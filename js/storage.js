function getMessages() {
    return JSON.parse(localStorage.getItem("chat")) || [];
}

function saveMessages(messages) {
    localStorage.setItem(
        "chat",
        JSON.stringify(messages)
    );
}

function clearMessages() {
    localStorage.removeItem("chat");
}