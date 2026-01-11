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

function creerSectionCarte (className, nomLabel, bookPropertie) {
  const elem = document.createElement("div");
  elem.className = className;
    const elemLabel = document.createElement("h1");
    elemLabel.textContent = nomLabel;
    const elemInput = document.createElement("div")
    elemInput.className = "carteInput";
    elemInput.textContent = bookPropertie;
  elem.appendChild(elemLabel);
  elem.appendChild(elemInput);
  return elem;
}

function creationCarte (nodeParent) {

  /*##################
  #     DIV INFO     #
  ##################*/

  const nodeInfo = document.createElement("div")
  nodeInfo.className = "livreInfoCarte";
   // TITRE DIV
  const titreCarte = creerSectionCarte("titreCarte", "Titre", book.titre);
  // AUTHEUR DIV
  const autheurCarte = creerSectionCarte("autheurCarte", "Autheur", book.autheur);
  // ANNEE PUBLICATION DIV
  const releaseCarte = creerSectionCarte("releaseCarte", "Année publication", book.release);
  // GENRE DIV
  const genreCarte = creerSectionCarte("genreCarte", "Genre", book.genre);

  nodeInfo.appendChild(titreCarte);
  nodeInfo.appendChild(autheurCarte);
  nodeInfo.appendChild(releaseCarte);
  nodeInfo.appendChild(genreCarte);
  
  /*-------------------------------------------------------------------------------------
  -------------------------------------------------------------------------------------*/

  /*####################
  # DIV BOUTON DU BAS  #
  ####################*/

  const nodeBouton = document.createElement("div")
  nodeBouton.className = "livreBoutonCarte";

  // Bouton supprimer
  const bouton = document.createElement("button");
  bouton.setAttribute("type", "button")
  bouton.className = "buttonInput"
  bouton.textContent = "Delete"

  // checked boxe
  const divCheckbox = document.createElement('div');
  divCheckbox.className = "checkBox"
  
  const checkbox= document.createElement('input');
  checkbox.type = "checkbox";
  checkbox.name = "name";
  checkbox.value = "value";
  checkbox.id = "id";
  let label = document.createElement('label');
  label.htmlFor = "id";
  label.appendChild(document.createTextNode('Read:'));
  divCheckbox.appendChild(checkbox);
  divCheckbox.appendChild(label);

  nodeBouton.appendChild(bouton);
  nodeBouton.appendChild(divCheckbox);
/*-------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------*/

  /*####################
  # DIV LIVRE COVER    #
  ####################*/

  const nodeLivreCover = document.createElement('div');
  nodeLivreCover.className = "livreCover"

/*-------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------*/
  
  // CARTE FINALE
  const node = document.createElement("div");
  node.className = "livreCarte";
  node.appendChild(nodeInfo);
  node.appendChild(nodeBouton);
  node.appendChild(nodeLivreCover);
  node.setAttribute("id", book.id);
  // Ajout de la carte sur l'affichage.
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
        // Supprimer le livre du DOM et de myLibrary si l'utilisateur appuie sur le bouton "Delete" du livre.
        deleteButton = document.querySelectorAll('.buttonInput');
        deleteButton.forEach(doc => doc.addEventListener('click', (event) => 
        {
          let livre = event.target.parentNode
          const index = myLibrary.findIndex(library => library.id == livre.id)
          myLibrary.splice(index, 1);
          console.log(myLibrary);
          event.target.parentNode.parentNode.remove();
        }))

      }
    };
};

/* let deleteButton = document.querySelectorAll('.buttonInput');
deleteButton.forEach((doc) => doc.addEventListener('click', () => {
console.log("parent");
})); */

afficherLivre();

// Détection d'ajout d'un livre par l'utilisateur.
const formButton = document.getElementById('form_button');
formButton.addEventListener("click", () => {
  // Récupération des données du livre entrées par l'utilisateur.
  let myFormData = new formData();
  addBookToLibrary(myFormData.titre, myFormData.autheur, myFormData.release, myFormData.genre);
  myFormData.reset();
  afficherLivre();
});