const chat =
document.getElementById("chat");

let messages =
getMessages();

function renderMessages() {

    chat.innerHTML = "";

    messages.forEach(msg => {

        const div =
        document.createElement("div");

        div.className =
        `message ${msg.role}`;

        div.innerHTML = `
            <div class="message-content">
                ${msg.text}
            </div>

            <div class="message-actions">
                <button onclick="copyMessage('${msg.text.replace(/'/g,"\\'")}')">
                    📋
                </button>

                <button onclick="deleteMessage(${messages.indexOf(msg)})">
                    🗑
                </button>
            </div>
        `;

        chat.appendChild(div);
    });

    chat.scrollTop =
    chat.scrollHeight;
}

function addMessage(
    role,
    text
) {

    messages.push({
        role,
        text
    });

    saveMessages(messages);

    renderMessages();
}

function deleteMessage(index) {

    messages.splice(index,1);

    saveMessages(messages);

    renderMessages();
}

function copyMessage(text) {

    navigator.clipboard.writeText(text);
}

renderMessages();
newChatBtn.addEventListener(
"click",
() => {

    messages = [];

    saveMessages(messages);

    renderMessages();

    statusBar.textContent =
    "Nuevo chat iniciado";
});
clearBtn.addEventListener(
"click",
() => {

    if (
        confirm(
            "¿Deseas borrar toda la conversación?"
        )
    ) {

        messages = [];

        clearMessages();

        renderMessages();

        statusBar.textContent =
        "Historial eliminado";
    }
});
exportBtn.addEventListener(
"click",
() => {

    const text =
    messages
        .map(
            m =>
            `${m.role}: ${m.text}`
        )
        .join("\n\n");

    const blob =
    new Blob(
        [text],
        {
            type:
            "text/plain"
        }
    );

    const a =
    document.createElement("a");

    a.href =
    URL.createObjectURL(blob);

    a.download =
    "conversacion.txt";

    a.click();
});