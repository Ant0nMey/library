const myLibrary = [];

function Book(titre, autheur, release, genre) {
  this.titre = titre;
  this.autheur = autheur;
  this.release = release;
  this.genre = genre;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(titre, autheur, release, genre) {
  let newBook = new Book(titre, autheur, release, genre);
  myLibrary.push(newBook);
}

function formData() {
  // Récupérer et stocker toutes les valeurs entrées par l'utilisateur.
  this.titre = document.getElementById('titre').value;
  this.autheur = document.getElementById('autheur').value;
  this.release = document.getElementById('release').value;
  this.genre = document.getElementById('genre').value;
    // Reset de l'affichage d'ajout de livre.
  this.reset = function () { 
      document.querySelectorAll("form input[type='text']").forEach(input => input.value = '');
  }
}

function creationDivLivre (nodeParent) {
  // TITRE DIV
  const titre = document.createElement("div");
  titre.className = "titreCarte";
    const titreLabel = document.createElement("h1");
    titreLabel.textContent = "Titre";
    const titreInput = document.createElement("div")
    titreInput.className = "carteInput";
    titreInput.textContent = book.titre;
  titre.appendChild(titreLabel);
  titre.appendChild(titreInput);

  // AUTHEUR DIV
  const autheur = document.createElement("div");
  autheur.className = "autheurCarte";
    const autheurLabel = document.createElement("h1");
    autheurLabel.textContent = "Autheur";
    const autheurInput = document.createElement("div")
    autheurInput.className = "carteInput"
    autheurInput.textContent = book.autheur;
  autheur.appendChild(autheurLabel);
  autheur.appendChild(autheurInput);

  // ANNEE PUBLICATION DIV
  const release = document.createElement("div");
  release.className = "releaseCarte";
    const releaseLabel = document.createElement("h1");
    releaseLabel.textContent = "Année publication";
    const releaseInput = document.createElement("div")
    releaseInput.className = "carteInput"
    releaseInput.textContent = book.release;
  release.appendChild(releaseLabel);
  release.appendChild(releaseInput);

  // GENRE
  const genre = document.createElement("div");
  genre.className = "genreCarte";
    const genreLabel = document.createElement("h1");
    genreLabel.textContent = "Genre";
    const genreInput = document.createElement("div")
    genreInput.className = "carteInput"
    genreInput.textContent = book.genre;
  genre.appendChild(genreLabel);
  genre.appendChild(genreInput);

  const node = document.createElement("div")
  node.className = "livreCarte";
  node.appendChild(titre);
  node.appendChild(autheur);
  node.appendChild(release);
  node.appendChild(genre);
  node.setAttribute("id", book.id);
  nodeParent.appendChild(node);
}

function afficherLivre() {
  const main = document.querySelector("main > div");
    for (book of myLibrary) {
      // Ne pas réafficher les livres déja présents dans le DOM.
      if (document.querySelector(`[id='${book.id}']`)) {
        continue;
      }
      else {
      // Si le livre n'est pas affiché, on créé sa div et on l'affiche dans main.
        creationDivLivre(main);
      }
    };
};

// Détection d'ajout d'un livre par l'utilisateur.
const formButton = document.getElementById('form_button');
formButton.addEventListener("click", () => {
  // Récupération des données du livre entrées par l'utilisateur.
  let myFormData = new formData();
  addBookToLibrary(myFormData.titre, myFormData.autheur, myFormData.release, myFormData.genre);
  myFormData.reset();
  afficherLivre();
});