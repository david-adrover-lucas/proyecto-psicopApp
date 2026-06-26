const GEMINI_API_KEY =
"";

const API_URL =
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const form =
document.getElementById("chatForm");

const messageInput =
document.getElementById("message");

const statusBar =
document.getElementById("status");

const exportBtn =
document.getElementById("exportBtn");

const clearBtn =
document.getElementById("clearBtn");

const newChatBtn =
document.getElementById("newChatBtn");

async function askGemini(prompt) {

    const history =
    messages
        .slice(-10)
        .map(
            m =>
            `${m.role}: ${m.text}`
        )
        .join("\n");

    const response =
    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text:
`
Actúa como un psicólogo profesional.
Responde con empatía.

Conversación:

${history}

Usuario:
${prompt}
`
                        }
                    ]
                }
            ]
        })
    });

    const data =
    await response.json();

    if (!response.ok) {
        throw new Error(
            data.error.message
        );
    }

    return data
        .candidates[0]
        .content
        .parts[0]
        .text;
}

form.addEventListener(
"submit",
async e => {

    e.preventDefault();

    const text =
    messageInput.value.trim();

    if (!text) return;

    addMessage(
        "user",
        text
    );

    messageInput.value = "";

    statusBar.textContent =
    "La IA está pensando...";

    try {

        const response =
        await askGemini(text);

        addMessage(
            "ai",
            response
        );

        statusBar.textContent =
        "Respuesta recibida";

    }
    catch (error) {

        addMessage(
            "ai",
            "❌ " + error.message
        );

        statusBar.textContent =
        "Error";
    }
});
