// Menu.
const menu = document.querySelector('.menu');
const toggleButton = document.querySelector('.main-button.-toggle-menu');

// Media Queries.
const mediaMediumSize = matchMedia('(max-width: 30.5625em)'); // 489px ou menos. Breakpoint estratégico.
const mediaLargeSize = matchMedia('(min-width: 55.3125em)'); // 885px ou mais. Breakpoint estratégico.

// Muda o texto se a condição for atendida, se não volta para o padrão.
function changeText(event) {
  const skillElement = Array.from(document.querySelectorAll('.main-subtitle.-second'))
                         .find(element => element.textContent === 'JavaScript' || element.textContent === 'JS');

  if (event.matches) {
    skillElement.innerHTML = `<abbr title="JavaScript">JS</abbr>`;
  } else {
    skillElement.textContent = 'JavaScript';
  }
}

// Esconde o menu.
function hideMenu() {
  const barsIcon = `<span class="fas fa-bars"></span>`

  toggleButton.removeChild(toggleButton.firstElementChild);
  toggleButton.insertAdjacentHTML('afterbegin', barsIcon);
  toggleButton.setAttribute('title', 'Mostrar menu');

  menu.classList.remove('-responsive');
}

// Mostra o menu.
function showMenu() {
  const closeIcon = `<span class="fas fa-times"></span>`

  toggleButton.removeChild(toggleButton.firstElementChild);
  toggleButton.insertAdjacentHTML('afterbegin', closeIcon);
  toggleButton.setAttribute('title', 'Esconder menu');

  menu.classList.add('-responsive');
}

// Esconde/mostra o menu.
function toggleMenu() {
  if (menu.classList.contains('-responsive')) {
    hideMenu();
  } else {
    showMenu();
  }
}

// Normaliza o menu após a tela ser redimensionada.
function normalizeMenu() {
  hideMenu();
}

// Ouvidores de mudança no tamanho da tela.
mediaMediumSize.addEventListener('change', changeText);

mediaLargeSize.addEventListener('change', normalizeMenu);

// Ouvidor para o clique no botão que mostra/esconde o menu.
toggleButton.addEventListener('click', toggleMenu);

// Funções para chamar no início.
changeText(mediaMediumSize);
