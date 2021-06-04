// Cria uma condição que verifica se a tela é menor ou igual à 489px.
const mediaQuery = matchMedia('(max-width: 30.5625em)');

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

// Registra um ouvidor para sempre detectar a mudança de tela.
mediaQuery.addEventListener('change', changeText)

// Chama a função no início.
changeText(mediaQuery);
