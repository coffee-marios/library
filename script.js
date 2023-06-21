let myLibrary = [
  {
    title: "The Black Swan: The Impact of the Highly Improbable",
    author: "Nassim Nicholas Taleb",
    pages: 394,
    read: "yes",
  },
  {
    title:
      "Very Bad People: The Inside Story of the Fight Against the World’s Network of Corruption",
    author: "Patrick Alley",
    pages: 336,
    read: "no",
  },
  {
    title: "People Hacker",
    author: "Jenny Radcliffe",
    pages: 303,
    read: "no",
  },
];

const Book = function (title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
};

function addBookToLibrary() {
  if (statusForm.style.display === "block") {
    statusForm.style.display = "none";
  }
  const newTitle = document.getElementById("ftitle").value;
  const newAuthor = document.getElementById("fauthor").value;
  const newPages = document.getElementById("fpages").value;
  const newRead = document.getElementById("fread").value;

  const BookAdd = new Book(newTitle, newAuthor, newRead);
  myLibrary.push(BookAdd);
  let myBooks = document.getElementById("books-collection");
  let newRow = myBooks.insertRow(1);
  newRow.insertCell(0).innerHTML = newTitle;
  newRow.insertCell(1).innerHTML = newAuthor;
  newRow.insertCell(2).innerHTML = newPages;
  newRow.insertCell(3).innerHTML = newRead;

  newRead;

  event.preventDefault();
}

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

const JS = new Book(
  "The Principles of Object-Oriented JavaScript",
  "Nicholas C. Zakas",
  120,
  "no"
);

function showLibrary() {
  let myBooks = document.getElementById("books-collection");

  for (let i = 0; i < myLibrary.length; i++) {
    let new_row = myBooks.insertRow(1);
    let new_cell;
    for (let j = 0; j < 4; j++) {
      new_cell = new_row.insertCell(j);
      new_cell.innerHTML = Object.values(myLibrary[i])[j];
      console.log(myLibrary[i]);
    }
  }
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
