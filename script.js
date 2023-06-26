let myLibrary = [
  {
    title: "The Black Swan: The Impact of the Highly Improbable",
    author: "Nassim Nicholas Taleb",
    pages: 394,
    read: "yes",
    id_book: 0,
  },
  {
    title:
      "Very Bad People: The Inside Story of the Fight Against the World’s Network of Corruption",
    author: "Patrick Alley",
    pages: 336,
    read: "no",
    id_book: 1,
  },
  {
    title: "People Hacker",
    author: "Jenny Radcliffe",
    pages: 303,
    read: "no",
    id_book: 2,
  },
];

let id_book = 2;

const Book = function (title, author, pages, read, id_book) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id_book = id_book;
};

const increment = function () {
  id_book += 1;
  console.log(id_book);
  return id_book;
};

Book.prototype.info = function () {
  const haveRead = function () {
    if (this.read === "yes") {
      return "I have read it.";
    } else {
      return "I haven't read it yet.";
    }
  };
  return `${this.title} by ${this.author}, ${this.pages} pages, ${haveRead()}`;
};

function addBookToLibrary() {
  if (statusForm.style.display === "block") {
    statusForm.style.display = "none";
  }
  const newTitle = document.getElementById("ftitle").value;
  const newAuthor = document.getElementById("fauthor").value;
  const newPages = document.getElementById("fpages").value;
  const newRead = document.getElementById("fread").value;

  console.clear();
  console.log(Book.prototype);

  let id_newRow = increment();
  const BookAdd = new Book(newTitle, newAuthor, newRead, id_newRow);

  myLibrary.push(BookAdd);
  let myBooks = document.getElementById("books-collection");

  let newRow = myBooks.insertRow(1);
  newRow.insertCell(0).innerHTML = newTitle;
  newRow.insertCell(1).innerHTML = newAuthor;
  newRow.insertCell(2).innerHTML = newPages;
  newRow.insertCell(3).innerHTML = newRead;

  newRow.dataset.idRow = id_newRow;
  console.log(newRow.dataset.idRow);

  const newButton = document.createElement("button");
  newButton.setAttribute("id", id_newRow);

  newRow.insertCell(4).appendChild(newButton);

  let del_text = document.createTextNode(`--${id_newRow}--`);
  newButton.appendChild(del_text);

  newButton.addEventListener("click", removeBook);
  event.preventDefault();
}

const JS = new Book(
  "The Principles of Object-Oriented JavaScript",
  "Nicholas C. Zakas",
  120,
  "no"
);

var myBooks = document.getElementById("books-collection");

function showLibrary() {
  console.clear();
  for (let i = 0; i < myLibrary.length; i++) {
    let new_row = myBooks.insertRow(1);
    new_row.dataset.idRow = myLibrary[i]["id_book"];
    console.log(new_row.dataset.idRow);

    let new_cell;
    console.log(myLibrary[i]["id_book"]);
    for (let j = 0; j < 4; j++) {
      new_cell = new_row.insertCell(j);
      new_cell.textContent = Object.values(myLibrary[i])[j];
    }
    let del_cell = new_row.insertCell(4);
    var del_button = document.createElement("BUTTON");
    let del_text = document.createTextNode(`--${myLibrary[i]["id_book"]}--`);
    del_button.appendChild(del_text);
    del_button.setAttribute("id", myLibrary[i]["id_book"]);
    del_cell.appendChild(del_button);
    del_button.addEventListener("click", removeBook);
  }
}

function removeBook(e) {
  console.clear();
  const id_remove = e.target.id;

  console.log(myLibrary);
  console.log(id_remove);
  myLibrary.splice(id_remove, 1);
  console.log(myLibrary);
  document.querySelector(`[data-id-row = "${id_remove}"]`).remove();
}

showLibrary();

// console.log(JS.info());
// console.log(Object.getPrototypeOf(JS));

let statusForm = document.getElementById("addBookForm");

function showForm() {
  statusForm.style.display === "block"
    ? (statusForm.style.display = "none")
    : (statusForm.style.display = "block");
}

const showFormButton = document.getElementById("showForm");
showFormButton.addEventListener("click", showForm);

const addBookButton = document.getElementById("addBook");
addBookButton.addEventListener("click", addBookToLibrary);
