const GEMINI_API_KEY = "TU_API_KEY";

const API_URL =`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const chat = document.getElementById("chat");
const form = document.getElementById("chatForm");
const messageInput = document.getElementById("message");
const statusBar = document.getElementById("status");

let messages =
JSON.parse(localStorage.getItem("chat")) || [];

renderMessages();

function saveMessages(){
    localStorage.setItem(
        "chat",
        JSON.stringify(messages)
    );
}

function addMessage(role,text){

    messages.push({
        role,
        text
    });

    saveMessages();
    renderMessages();
}

function renderMessages(){

    chat.innerHTML="";

    messages.forEach(msg=>{

        const div=document.createElement("div");

        div.className=
        `message ${msg.role}`;

        div.innerHTML=
        `<span>${msg.text}</span>`;

        chat.appendChild(div);

    });

    chat.scrollTop=
    chat.scrollHeight;
}

async function askGemini(prompt){

    const response=
    await fetch(API_URL,{
        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            contents:[
                {
                    parts:[
                        {
                            text:
`Actúa como un psicólogo profesional.
Responde con empatía.

Usuario:
${prompt}`
                        }
                    ]
                }
            ]

        })
    });

    const data=
    await response.json();

    if(!response.ok){

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
async e=>{

    e.preventDefault();

    const text=
    messageInput.value.trim();

    if(!text) return;

    addMessage("user",text);

    messageInput.value="";

    statusBar.textContent=
    "Pensando...";

    try{

        const response=
        await askGemini(text);

        addMessage(
            "ai",
            response
        );

        statusBar.textContent=
        "Respuesta recibida";

    }catch(error){

        statusBar.textContent=
        error.message;

    }

});
