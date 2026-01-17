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

  #creerSectionInfo(className, label, value) {
    const div = document.createElement("div");
    div.className = className;
    div.innerHTML = `<h1>${label}</h1><div class="carteInput">${value}</div>`;
    return div;
  }


  CreerCarte() {
      
  /*##################
  #     DIV INFO     #
  ##################*/

  const nodeInfo = document.createElement("div")
  nodeInfo.className = "livreInfoCarte";

 // tableau des infos à créer
  const infos = [
    { className: "titreCarte", label: "Titre", value: this.titre },
    { className: "autheurCarte", label: "Auteur", value: this.autheur },
    { className: "releaseCarte", label: "Année publication", value: this.release },
    { className: "genreCarte", label: "Genre", value: this.genre },
  ];

  infos.forEach(info => {
    const section = this.#creerSectionInfo(info.className, info.label, info.value);
    nodeInfo.appendChild(section);
  });
  
  // DIV bouton et checkbox
  const nodeBouton = this.creerBoutonEtCheckbox();

  // DIV cover
  const nodeLivreCover = document.createElement('div');
  nodeLivreCover.className = "livreCover";

  // Carte finale
  this.node.className = "livreCarte";
  [nodeInfo, nodeBouton, nodeLivreCover].forEach(n => this.node.appendChild(n));
  this.node.setAttribute("id", this.id);
  this.nodeParent.appendChild(this.node);
}
  /*-------------------------------------------------------------------------------------
  -------------------------------------------------------------------------------------*/

  creerBoutonEtCheckbox() {
  const div = document.createElement("div");
  div.className = "livreBoutonCarte";

  const bouton = document.createElement("button");
  bouton.type = "button";
  bouton.className = "buttonInput";
  bouton.textContent = "Delete";
  bouton.addEventListener("click", () => this.remove());

  const divCheckbox = document.createElement("div");
  divCheckbox.className = "checkBox";
  divCheckbox.innerHTML = `<input type="checkbox" id="id"><label for="id">Read:</label>`;

  [bouton, divCheckbox].forEach(e => div.appendChild(e));
  return div;
}

/*-------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------*/
  
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