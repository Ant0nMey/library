const myLibrary = [];

class Book {
  constructor(formInput) {
    this.titre = formInput.titre;
    this.autheur = formInput.autheur;
    this.release = formInput.release;
    this.genre = formInput.genre;
    this.id = crypto.randomUUID();
  }

  get getBook() {
    return this;
  }

  addBookToLibrary() {
    myLibrary.push(this);
  }
}

function getFormInput () {

    titre = document.getElementById('titre').value;
    autheur = document.getElementById('autheur').value;
    release = document.getElementById('release').value;
    genre = document.getElementById('genre').value;
    reset = (() => { document.querySelectorAll("form input[type='text']").forEach(input => input.value = '') })();

    return {titre, autheur, release, genre};

}

class Carte {
  constructor(Book) {
    this.titre = Book.titre
    this.autheur = Book.autheur;
    this.genre = Book.genre;
    this.release = Book.release;
    this.id = Book.id;

    this.node = document.createElement("div");
    this.nodeParent = document.querySelector("main > div")
  }

    creerSectionInfo = function (className, nomLabel, bookPropertie) {
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

  CreerCarte() {
      
  /*##################
  #     DIV INFO     #
  ##################*/

  const nodeInfo = document.createElement("div")
  nodeInfo.className = "livreInfoCarte";
   // TITRE DIV
  const sectionInfoTitre = this.creerSectionInfo("titreCarte", "Titre", this.titre);
  // AUTHEUR DIV
  const sectionInfoAutheur = this.creerSectionInfo("autheurCarte", "Autheur", this.autheur);
  // ANNEE PUBLICATION DIV
  const sectionInfoRelease = this.creerSectionInfo("releaseCarte", "Année publication", this.release);
  // GENRE DIV
  const sectionInfoGenre = this.creerSectionInfo("genreCarte", "Genre", this.genre);

  nodeInfo.appendChild(sectionInfoTitre);
  nodeInfo.appendChild(sectionInfoAutheur);
  nodeInfo.appendChild(sectionInfoRelease);
  nodeInfo.appendChild(sectionInfoGenre);
  
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

  bouton.addEventListener("click", () => {
  console.log(this); // Carte
  this.remove();
  });

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
  this.node.className = "livreCarte";
  this.node.appendChild(nodeInfo);
  this.node.appendChild(nodeBouton);
  this.node.appendChild(nodeLivreCover);
  this.node.setAttribute("id", this.id);
  // Ajout de la carte sur l'affichage.
  this.nodeParent.appendChild(this.node);
  };
  
remove() {
  this.node.remove();
  const index = myLibrary.findIndex(library => library.id == this.id);
  myLibrary.splice(index, 1);
}
};

// Détection d'ajout d'un livre par l'utilisateur.
const formButton = document.getElementById('form_button');
formButton.addEventListener("click", () => {
  const input = getFormInput();
  const book = new Book(input);
  book.addBookToLibrary();

  const carte = new Carte(book);
  carte.CreerCarte();

});