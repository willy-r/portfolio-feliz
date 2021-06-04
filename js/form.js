// Global.
var timeout;

// Mensagem de informação.
const informationMessage = document.querySelector('.information-message');
const closeButton = document.querySelector('.close-button');

// Formulário.
const form = document.querySelector('.main-form');
const sendButton = document.querySelector('.main-button.-large');

// Adiciona e mostra a mensagem.
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

// Remove e fecha a mensagem.
function closeInformationMessage() {
  informationMessage.style.opacity = 0;
  
  setTimeout(() => {
    informationMessage.removeChild(informationMessage.firstChild);
    informationMessage.style.display = 'none';
  }, 1000);
}

// Adiciona e mostra o spinner.
function showSpinner() {
  const spinner = '<span class="fas fa-spinner fa-spin"></span>';

  sendButton.textContent = '';
  sendButton.disabled = true;
  sendButton.insertAdjacentHTML('afterbegin', spinner);
}

// Remove e esconde o spinner.
function hideSpinner() {
  sendButton.removeChild(sendButton.firstChild);
  sendButton.textContent = 'Enviar';
  sendButton.disabled = false;
}

form.addEventListener('submit', event => {
  // Previne o comportamento padrão do formulário.
  event.preventDefault();

  showSpinner();

  const data = new FormData(form);

  fetch('https://portfolio-feliz-backend.herokuapp.com/send-email', {
    method: 'POST',
    body: data,
  })
    .then(response => response.ok ? response.json() : Promise.reject(response))
    .then(json => {
      // Limpa o formulário.
      form.reset();

      location.href = '#contacts';
      showInformationMessage(json.message, json.sent);
      hideSpinner();

      // Fecha a mensagem de informação após 10 segundos.
      timeout = setTimeout(closeInformationMessage, 10000);
    })
    .catch(err => {
      hideSpinner();
      console.error(`${err.status}: ${err.statusText}`)
    });
});

closeButton.addEventListener('click', () => {
  closeInformationMessage();
  clearTimeout(timeout);
});
