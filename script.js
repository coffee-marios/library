var myLibrary = [];

// elements
const newTitle = document.getElementById("ftitle");
const newAuthor = document.getElementById("fauthor");
const newPages = document.getElementById("fpages");
const newRead = document.getElementById("fread");
let myBooks = document.getElementById("books-collection");

// Form for adding more books
let statusForm = document.getElementById("addBookForm");

// Elements with event listeners
const showFormElement = document.getElementById("showFormButton");
showFormElement.addEventListener("click", showForm);

const addBookButton = document.getElementById("addBook");
addBookButton.addEventListener("click", addBookBackstage);

class LibraryBooks {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    let id_book = myLibrary.length + 1;
    this.registry = { title, author, pages, read, id_book };
  }

  addBook() {
    myLibrary.push(this.registry);

    console.log(myLibrary);
  }
}

// prepared books
var blackSwan = new LibraryBooks(
  "The Black Swan: The Impact of the Highly Improbable",
  "Nassim Nicholas Taleb",
  394,
  "read"
);

blackSwan.addBook();

var badPeople = new LibraryBooks(
  "Very Bad People: The Inside Story of the Fight Against the World’s Network of Corruption",
  "Patrick Alley",
  336,
  "unread"
);

badPeople.addBook();

var peopleHacker = new LibraryBooks(
  "People Hacker",
  "Jenny Radcliffe",
  303,
  "unread"
);

peopleHacker.addBook();

function includesBook(arrayBook) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (
      myLibrary[i].title == arrayBook[0] &&
      myLibrary[i].author == arrayBook[1]
    ) {
      return true;
    }
  }

  return false;
}

function testValid() {
  let testTitle = false;
  let testPages = false;

  let approvalRating = includesBook([newTitle.value, newAuthor.value]);

  if (approvalRating) {
    newTitle.setCustomValidity("Please, write the title of a new book");
    newTitle.reportValidity();
  }

  if (newTitle.validity.valueMissing) {
    newTitle.setCustomValidity("Please, write the title of a new book");
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

  if (testPages === true && testTitle === true && testPages === true) {
    testPages = false;
    testTitle = false;

    return true;
  } else {
    return false;
  }
}

function addBookDom(newBook) {
  if (newAuthor.validity.valueMissing) {
    newAuthor.value = "-";
  }

  if (newPages.validity.valueMissing) {
    newPages.value = "-";
  }

  let newRow = myBooks.insertRow(1);
  newRow.insertCell(0).innerHTML = newBook.title;
  newRow.insertCell(1).innerHTML = newBook.author;
  newRow.insertCell(2).innerHTML = newBook.pages;

  let read_cell = newRow.insertCell(3);
  let read_button = document.createElement("BUTTON");
  let read_text = document.createTextNode(newBook.read);
  read_button.appendChild(read_text);

  let id_read_button = "r" + newBook.id_book;
  read_button.setAttribute("id", id_read_button);
  read_button.setAttribute("class", "haveRead");

  if (newRead.value === "YES") {
    read_button.style.backgroundColor = "green";
    read_button.style.color = "white";
  }

  read_cell.appendChild(read_button);
  read_button.addEventListener("click", toggleRead);

  newRow.dataset.idRow = newBook.id_book;

  const delete_button = document.createElement("button");
  delete_button.setAttribute("class", "delete_book");

  delete_button.setAttribute("id", newBook.id_book);

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

function showLibrary() {
  // Shows only the books stored on the top of this file

  for (let i = 0; i < myLibrary.length; i++) {
    let new_row = myBooks.insertRow(1);
    new_row.dataset.idRow = myLibrary[i]["id_book"];

    let new_cell;

    for (let j = 0; j < 3; j++) {
      new_cell = new_row.insertCell(j);
      new_cell.textContent = Object.values(myLibrary[i])[j];
      console.log();
    }
    let read_cell = new_row.insertCell(3);
    let read_button = document.createElement("BUTTON");
    let read_text = document.createTextNode(myLibrary[i]["read"]);
    console.log();
    read_button.appendChild(read_text);
    read_cell.appendChild(read_button);

    if (myLibrary[i]["read"] === "read") {
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

function showForm() {
  statusForm.style.display === "block"
    ? (statusForm.style.display = "none")
    : (statusForm.style.display = "block");
}

function addBookBackstage() {
  let title1 = newTitle.value;
  let author1 = newAuthor.value;
  let approvalTesting = testValid();
  let approvalRating = includesBook([title1, author1]);

  // We don't want to add a book without a title
  if (title1 == "" && author1 == "") {
    statusForm.style.display = "none";
  }
  // We don't want to add the same book twice
  else if (approvalRating) {
    newTitle.setCustomValidity("Please, write the title of a new book");
    newTitle.reportValidity();
  } else {
    if (approvalTesting) {
      let approvedBook = new LibraryBooks(
        newTitle.value,
        newAuthor.value,
        newPages.value,
        newRead.value
      );
      approvedBook.addBook();
      addBookDom(approvedBook);
      // Remove the form
      if (statusForm.style.display === "block") {
        statusForm.style.display = "none";
      }
    }

    event.preventDefault();
  }
}
