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

function creationDivCarte (className, nomLabel, bookPropertie) {
  const titre = document.createElement("div");
  titre.className = className;
    const titreLabel = document.createElement("h1");
    titreLabel.textContent = nomLabel;
    const titreInput = document.createElement("div")
    titreInput.className = "carteInput";
    titreInput.textContent = bookPropertie;
  titre.appendChild(titreLabel);
  titre.appendChild(titreInput);
  return titre;
}

function creationCarte (nodeParent) {
   // TITRE DIV
  const titreCarte = creationDivCarte("titreCarte", "Titre", book.titre);
  // AUTHEUR DIV
  const autheurCarte = creationDivCarte("autheurCarte", "Autheur", book.autheur);
  // ANNEE PUBLICATION DIV
  const releaseCarte = creationDivCarte("releaseCarte", "Année publication", book.release);
  // GENRE DIV
  const genreCarte = creationDivCarte("genreCarte", "Genre", book.genre);
  // CARTE FINALE
  const node = document.createElement("div")
  node.className = "livreCarte";
  node.appendChild(titreCarte);
  node.appendChild(autheurCarte);
  node.appendChild(releaseCarte);
  node.appendChild(genreCarte);
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
        creationCarte(main);
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