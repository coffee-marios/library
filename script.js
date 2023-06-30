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
  console.log(id_book);
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

    //console.clear();
    //console.log(Book.prototype);

    let id_newRow = increment();
    console.log(`id_newRow: ${id_newRow}, see: ${see}`);
    //console.clear();
    console.log(id_newRow, 3333);
    console.log(id_book);
    const BookAdd = new Book(
      newTitle.value,
      newAuthor.value,
      newPages.value,
      id_newRow
    );
    console.log(BookAdd);

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

    read_cell.appendChild(read_button);
    read_button.addEventListener("click", toggleRead);

    newRow.dataset.idRow = id_newRow;
    console.log(newRow.dataset.idRow);

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
  // console.clear();
  //console.log(e.target.id, e.target.innerText);
  let id_temp = e.target.id.slice(1);
  //console.log(id_temp, myLibrary[id_temp]["read"]);
  if (e.target.innerText === "NO") {
    document.getElementById(e.target.id).textContent = "YES";
    myLibrary[id_temp]["read"] = "YES";
  } else {
    document.getElementById(e.target.id).textContent = "NO";
    myLibrary[id_temp]["read"] = "NO";
  }
  console.log(myLibrary[id_temp]);
}

var myBooks = document.getElementById("books-collection");

function showLibrary() {
  //console.clear();
  for (let i = 0; i < myLibrary.length; i++) {
    let new_row = myBooks.insertRow(1);
    new_row.dataset.idRow = myLibrary[i]["id_book"];
    console.log(new_row.dataset.idRow);

    let new_cell;
    console.log(myLibrary[i]["id_book"]);
    for (let j = 0; j < 3; j++) {
      new_cell = new_row.insertCell(j);
      new_cell.textContent = Object.values(myLibrary[i])[j];
    }
    let read_cell = new_row.insertCell(3);
    let read_button = document.createElement("BUTTON");
    let read_text = document.createTextNode(myLibrary[i]["read"]);
    read_button.appendChild(read_text);
    read_cell.appendChild(read_button);
    read_button.addEventListener("click", toggleRead);

    let id_read_button = "r" + myLibrary[i]["id_book"];
    read_button.setAttribute("id", id_read_button);

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
  //console.clear();
  const id_remove = e.target.id;

  console.log(myLibrary);
  console.log(id_remove);
  myLibrary.splice(id_remove, 1);
  console.log(myLibrary);
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
