document.getElementById('search-button').addEventListener('click', function () {
  const category = document.getElementById('category-input').value;
  if (!category) {
    alert('Inserisci una categoria');
    return;
  }

  const apiUrl = `https://openlibrary.org/subjects/${category}.json`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Category not found.');
      }
      return response.json();
    })
    .then(data => {
      const bookListDiv = document.getElementById('book-list');
      bookListDiv.innerHTML = '';

      if (data.works && data.works.length > 0) {
        console.log(data)
        data.works.forEach(book => {
          const bookDiv = document.createElement('div');
          
          bookDiv.className = 'book-item'
          
          // Title
          const bookTitle = document.createElement('h2');
          bookTitle.className = 'book-title';
          bookTitle.textContent = book.title;
          // bookTitle.addEventListener('click', () => fetchBookDescription(book.key));
          
          // Authors
          const authors = document.createElement('h4');
          console.log(book.authors)
          authors.textContent = `Authors: ${book.authors.map(author => author.name).join(', ')}`;
          console.log(authors)
          
          // Description button
          const btn = document.createElement('button');
          btn.className = 'btn-description';
          btn.textContent = 'Descrizione';
          btn.addEventListener('click', () => fetchBookDescription(book.key));
          
          bookDiv.appendChild(bookTitle);
          bookDiv.appendChild(authors);
          bookListDiv.appendChild(bookDiv);
          bookDiv.appendChild(btn);
        });
      } else {
        bookListDiv.textContent = 'Nessun libro trovato per questa categoria.';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Ricerca libri fallita. Riprova, per favore.');
    });
  });
  async function fetchBookDescription(bookKey) {
  const apiUrl  = `https://openlibrary.org${bookKey}.json`;
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Descrizione del libro non trovata.');
      }
      return response.json();
    })
    .then(data => {
      alert(data.description ? data.description : 'Nessuna descrizione disponibile per questo libro.');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Ricerca libri fallita. Riprova, per favore.');
    });
}