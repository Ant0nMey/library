const myLibrary = [];

function Book(titre, autheur, release, genre) {

  this.titre = titre;
  this.autheur = autheur;
  this.release = release;
  this.genre = genre;
  this.id = crypto.randomUUID;
}

function addBookToLibrary(titre, autheur, release, genre) {

    let newBook = new Book(titre, autheur, release, genre);
    myLibrary.push(newBook);

  // take params, create a book then store it in the array
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

// Détection d'ajout d'un livre par l'utilisateur.
const formButton = document.getElementById('form_button');
formButton.addEventListener("click", () => {
    // Récupération des données du livre entrées par l'utilisateur.
    let myFormData = new formData();
    // Ajout du book dans la library.
    addBookToLibrary(myFormData.titre, myFormData.autheur, myFormData.release, myFormData.genre);
    // Reset de l'affichage de d'ajout de livre.
    myFormData.reset();
    console.log(myLibrary)});
