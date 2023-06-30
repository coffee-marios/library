let myLibrary = [
  {
    title: "The Black Swan: The Impact of the Highly Improbable",
    author: "Nassim Nicholas Taleb",
    pages: 394,
    read: "YES",
    id_book: 0,
  },
  {
    title:
      "Very Bad People: The Inside Story of the Fight Against the World’s Network of Corruption",
    author: "Patrick Alley",
    pages: 336,
    read: "NO",
    id_book: 1,
  },
  {
    title: "People Hacker",
    author: "Jenny Radcliffe",
    pages: 303,
    read: "NO",
    id_book: 2,
  },
];

let id_book = 2;

const Book = function (title, author, pages, read, id_books) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id_books = id_book;
};

const increment = function () {
  id_book += 1;
  return id_book;
};

const newTitle = document.getElementById("ftitle");
const newAuthor = document.getElementById("fauthor");
const newPages = document.getElementById("fpages");
const newRead = document.getElementById("fread");

let test = false;

function testValid() {
  // The validation of html is skipped with we submit with js

  let testTitle = false;
  let testPages = false;

  if (newTitle.validity.valueMissing) {
    newTitle.setCustomValidity("Please, write the title of the book");
    newTitle.reportValidity();
  } else {
    newTitle.setCustomValidity("");
    testTitle = true;
  }

  var numbers = /^[-+]?[0-9]+$/;
  if (newPages.value.match(numbers) || newPages.value === "") {
    testPages = true;
  } else if (!newPages.value.match(numbers) && newPages.value !== "") {
    newPages.setCustomValidity("Please, write a number");
    newPages.reportValidity();
    testPages = false;
  }

  if (testPages === true && testTitle === true) {
    console.log(
      `This is a validation test: ${test}\n testTitle: ${testTitle}\n testPages= ${testPages}`
    );
    testPages = false;
    testTitle = false;
    return true;
  } else {
    return false;
  }
}

newTitle.addEventListener("input", testValid);

function addBookToLibrary() {
  let see = testValid();

  if (see) {
    if (newAuthor.validity.valueMissing) {
      newAuthor.value = "-";
    }

    if (newPages.validity.valueMissing) {
      newPages.value = "-";
    }

    let id_newRow = increment();

    const BookAdd = new Book(
      newTitle.value,
      newAuthor.value,
      newPages.value,
      id_newRow
    );

    myLibrary.push(BookAdd);
    let myBooks = document.getElementById("books-collection");

    let newRow = myBooks.insertRow(1);
    newRow.insertCell(0).innerHTML = newTitle.value;
    newRow.insertCell(1).innerHTML = newAuthor.value;
    newRow.insertCell(2).innerHTML = newPages.value;

    let read_cell = newRow.insertCell(3);
    let read_button = document.createElement("BUTTON");
    let read_text = document.createTextNode(newRead.value);
    read_button.appendChild(read_text);

    let id_read_button = "r" + id_newRow;
    read_button.setAttribute("id", id_read_button);
    read_button.setAttribute("class", "haveRead");

    if (newRead.value === "YES") {
      read_button.style.backgroundColor = "green";
      read_button.style.color = "white";
    }

    read_cell.appendChild(read_button);
    read_button.addEventListener("click", toggleRead);

    newRow.dataset.idRow = id_newRow;

    const delete_button = document.createElement("button");
    delete_button.setAttribute("class", "delete_book");

    delete_button.setAttribute("id", id_newRow);

    newRow.insertCell(4).appendChild(delete_button);

    let del_text = document.createTextNode("  ");
    delete_button.appendChild(del_text);

    delete_button.addEventListener("click", removeBook);

    newTitle.value = "";
    newAuthor.value = "";
    newPages.value = "";

    // Remove the form
    if (statusForm.style.display === "block") {
      statusForm.style.display = "none";
    }

    event.preventDefault();
  }
}

function toggleRead(e) {
  let id_temp = e.target.id.slice(1);

  if (e.target.innerText === "NO") {
    document.getElementById(e.target.id).textContent = "YES";
    myLibrary[id_temp]["read"] = "YES";
    document.getElementById(e.target.id).style.color = "white";
    document.getElementById(e.target.id).style.backgroundColor = "green";
  } else {
    document.getElementById(e.target.id).textContent = "NO";
    document.getElementById(e.target.id).style.color = "black";
    document.getElementById(e.target.id).style.backgroundColor = "orange";

    myLibrary[id_temp]["read"] = "NO";
  }
}

var myBooks = document.getElementById("books-collection");

function showLibrary() {
  // Shows only the books stored on the top of this file

  for (let i = 0; i < myLibrary.length; i++) {
    let new_row = myBooks.insertRow(1);
    new_row.dataset.idRow = myLibrary[i]["id_book"];

    let new_cell;

    for (let j = 0; j < 3; j++) {
      new_cell = new_row.insertCell(j);
      new_cell.textContent = Object.values(myLibrary[i])[j];
    }
    let read_cell = new_row.insertCell(3);
    let read_button = document.createElement("BUTTON");
    let read_text = document.createTextNode(myLibrary[i]["read"]);
    read_button.appendChild(read_text);
    read_cell.appendChild(read_button);

    if (myLibrary[i]["read"] === "YES") {
      read_button.style.backgroundColor = "green";
      read_button.style.color = "white";
    }

    read_button.addEventListener("click", toggleRead);

    let id_read_button = "r" + myLibrary[i]["id_book"];
    read_button.setAttribute("id", id_read_button);
    read_button.setAttribute("class", "haveRead");

    let del_cell = new_row.insertCell(4);
    var del_button = document.createElement("BUTTON");
    let del_text = document.createTextNode("  ");
    del_button.appendChild(del_text);
    del_button.setAttribute("class", "delete_book");
    del_button.setAttribute("id", myLibrary[i]["id_book"]);
    del_cell.appendChild(del_button);
    del_button.addEventListener("click", removeBook);
  }
}

function removeBook(e) {
  const id_remove = e.target.id;
  myLibrary.splice(id_remove, 1);
  document.querySelector(`[data-id-row = "${id_remove}"]`).remove();
}

showLibrary();

// Form for adding more books
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
