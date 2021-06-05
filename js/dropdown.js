// Dropdown.
const dropdownsList = Array.from(document.querySelectorAll('.main-dropdown'));

// Esconde o conteúdo do dropdown.
function hideDropdownContent(dropdownContent) {
  dropdownContent.style.opacity = 0;
  
  setTimeout(() => {
    dropdownContent.style.display = 'none';
  }, 300);
}

// Mostra o conteúdo do dropdown.
function showDropdownContent(dropdownContent) {
  dropdownContent.style.opacity = 1;
  dropdownContent.style.display = 'block';
}

// Mostra ou esconde o conteúdo do dropdown.
function toggleDropdownContent(dropdownContent) {
  if (dropdownContent.style.display === 'block') {
    hideDropdownContent(dropdownContent);
  } else {
    showDropdownContent(dropdownContent);
  }
}

// Adiciona um ouvidor de clique nos botões dos dropdowns.
dropdownsList.forEach(dropdown => {
  const button = dropdown.firstElementChild;
  const content = dropdown.lastElementChild;

  button.addEventListener('click', () => {
    // Esconde o conteúdo dos outros dropdowns.
    dropdownsList.forEach(dropdown => {
      if (button !== dropdown.firstElementChild) {
        const content = dropdown.lastElementChild;

        if (content.style.display === 'block') {
          hideDropdownContent(content);
        }
      }
    });
    toggleDropdownContent(content);
  });
});

// Esconde dropdowns quando clica fora.
document.addEventListener('click', event => {
  const element = event.target;
  const isDropdownButton = element.matches('.main-button.-dropdown') || element.matches('.fas.fa-caret-down');
  
  if (!isDropdownButton) {
    dropdownsList.forEach(dropdown => {
      const content = dropdown.lastElementChild;

      if (content.style.display === 'block') {
        hideDropdownContent(content);
      }
    });
  }
});
