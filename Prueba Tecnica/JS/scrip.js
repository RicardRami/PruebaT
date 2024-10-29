const apiUrl = 'https://rickandmortyapi.com/api/character';
    let personajeData = [];
    let filtroper = [];
    let currentPage = 1;
    const itemsPerPage = 6;//objetos por pagina

    async function getData() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Error en la petición');
        }
        const data = await response.json();
        personajeData = data.results;
        filtroper = personajeData; // Inicialmente sin filtros
        displayData(currentPage);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    function filterData() {
      const species = document.getElementById('species-filter').value;
      const gender = document.getElementById('gender-filter').value;

      filtroper = personajeData.filter(character => {
        return (species === 'all' || character.species === species) &&
               (gender === 'all' || character.gender === gender);
      });

      displayData(1); // Reiniciar a la primera página después de filtrar
    }

    function displayData(page) {
      const personajeDiv = document.getElementById('characters');
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedCharacters = filtroper.slice(start, end);
      personajeDiv.innerHTML = paginatedCharacters.map(character => `
        <div class="image-container">
          <img src="${character.image}" alt="${character.name}" class="image">
          <div class="nombre">${character.name}</div>
          <div class="overlay">${character.name}<br>${character.status}<br>${character.species}<br>${character.type}<br>${character.gender}</div>
          </div>
      `).join('');
      updatePagination(page);
    }

    function updatePagination(page) {
      const pages = document.querySelectorAll('.paginacion .page');
      pages.forEach(p => p.classList.remove('active'));
      if (pages[page - 1]) {
        pages[page - 1].classList.add('active');
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      getData();

      document.getElementById('species-filter').addEventListener('change', filterData);
      document.getElementById('gender-filter').addEventListener('change', filterData);

      const pages = document.querySelectorAll('.pagination a.page');
      const prev = document.querySelector('.paginacion a.prev');
      const next = document.querySelector('.paginacion a.next');

      pages.forEach((page, index) => {
        page.addEventListener('click', (e) => {
          e.preventDefault();
          currentPage = index + 1;
          displayData(currentPage);
        });
      });

      prev.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
          currentPage--;
          displayData(currentPage);
        }
      });

      next.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < pages.length) {
          currentPage++;
          displayData(currentPage);
        }
      });
    });