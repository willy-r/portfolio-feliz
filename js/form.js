// Global.
var timeout;

// Mensagem de informação.
const informationMessage = document.querySelector('.information-message');
const closeButton = document.querySelector('.close-button');

// Formulário.
const form = document.querySelector('.main-form');

// Adiciona e mostra a mensagem verificando se o e-mail foi enviado ou não.
function showInformationMessage(message, emailWasSent) {
  const classList = informationMessage.classList;
  const messageElement = `<p class="message">${message}</p>`;

  // Adiciona a classe de variação dependendo da resposta do servidor.
  if (emailWasSent) {
    classList.add('-success');
    classList.remove('-error');
  } else {
    classList.add('-error');
    classList.remove('-success');
  }

  informationMessage.insertAdjacentHTML('afterbegin', messageElement);
  informationMessage.style.display = 'flex';
  informationMessage.style.opacity = 1;
}

// Remove e depois fecha a mensagem.
function closeInformationMessage() {
  informationMessage.style.opacity = 0;
  
  setTimeout(() => {
    informationMessage.removeChild(informationMessage.firstChild);
    informationMessage.style.display = 'none';
  }, 1000);
}

form.addEventListener('submit', event => {
  // Previne o comportamento padrão do formulário.
  event.preventDefault();

  const data = new FormData(form);

  fetch('https://portfolio-feliz-backend.herokuapp.com/send-email', {
    method: 'POST',
    body: data,
  })
  .then(response => response.json())
  .then(json => {
    // Limpa o formulário.
    form.reset();

    location.href = '#contacts';
    showInformationMessage(json.message, json.sent);

    // Fecha a mensagem de informação após 10 segundos.
    timeout = setTimeout(closeInformationMessage, 10000);
  })
  .catch(err => console.error(err));
});

closeButton.addEventListener('click', () => {
  closeInformationMessage();
  clearTimeout(timeout);
});
