const textInput = document.getElementById('textInput');
const chat = document.getElementById('chat');

let context = {};
let message = '';

const templateChatMessage = (message, from) => `
  <div class="from-${from}">
    <div class="message-inner">
      <p>${message}</p>
    </div>
  </div>
  `;

const InsertTemplateInTheChat = (template) => {
    const div = document.createElement('div');
    div.innerHTML = template;

    chat.appendChild(div);
};

const getWatsonMessageAndInsertTemplate = async (text = '') => {
    const uri = location.href + 'conversation/';

    const response = await (await fetch(uri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            text,
            context,
        }),
    })).json();

    context = response.context;
    message = response.output.text


    const template = templateChatMessage(message, 'watson');
    message = undefined;

    InsertTemplateInTheChat(template);
};

textInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13 && textInput.value) {
        getWatsonMessageAndInsertTemplate(textInput.value);

        const template = templateChatMessage(textInput.value, 'user');
        InsertTemplateInTheChat(template);

        textInput.value = '';
    }
});

getWatsonMessageAndInsertTemplate();