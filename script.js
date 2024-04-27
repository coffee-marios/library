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
addBookButton.addEventListener("click", addBookHandle);

const cancelForm = document.getElementById("cancelForm");
cancelForm.addEventListener("click", formCanceling);

class LibraryBooks {
  id_book = myLibrary.length + 1;
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.registry = { title, author, pages, read };
  }

  addBook() {
    this.registry.id_book = this.id_book;
    myLibrary.push(this.registry);

    if (this.author === "") {
      this.author = "-";
    }

    if (this.pages === "") {
      this.pages = "-";
    }

    let newRow = myBooks.insertRow(1);
    newRow.insertCell(0).innerHTML = this.title;
    newRow.insertCell(1).innerHTML = this.author;
    newRow.insertCell(2).innerHTML = this.pages;

    let read_cell = newRow.insertCell(3);
    let read_button = document.createElement("BUTTON");
    let read_text = document.createTextNode(this.read);
    read_button.appendChild(read_text);

    let id_read_button = "r" + this.id_book;
    read_button.setAttribute("id", id_read_button);
    read_button.setAttribute("class", "haveRead");

    if (newRead.value === "read") {
      read_button.style.backgroundColor = "green";
      read_button.style.color = "white";
    }

    read_cell.appendChild(read_button);
    read_button.addEventListener("click", toggleRead);

    newRow.dataset.idRow = this.id_book;

    const delete_button = document.createElement("button");
    delete_button.setAttribute("class", "delete_book");

    delete_button.setAttribute("id", this.id_book);

    newRow.insertCell(4).appendChild(delete_button);

    let del_text = document.createTextNode("  ");
    delete_button.appendChild(del_text);

    delete_button.addEventListener("click", removeBook);

    newTitle.value = "";
    newAuthor.value = "";
    newPages.value = "";
  }
}

// prepared books
var blackSwan = new LibraryBooks(
  "The Black Swan: The Impact of the Highly Improbable",
  "Nassim Nicholas Taleb",
  394,
  "Yes"
);

blackSwan.addBook();

var badPeople = new LibraryBooks(
  "Very Bad People: The Inside Story of the Fight Against the World’s Network of Corruption",
  "Patrick Alley",
  336,
  "No"
);

badPeople.addBook();

var peopleHacker = new LibraryBooks(
  "People Hacker",
  "Jenny Radcliffe",
  303,
  "No"
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

  if (newTitle.validity.valueMissing) {
    newTitle.setCustomValidity("Please, write the title of a new book");
    newTitle.reportValidity();
  } else {
    if (newTitle.value.length > 120) {
      newTitle.setCustomValidity("Are you f@@@@@g kidding me?");
      newTitle.reportValidity();
    } else {
      newTitle.setCustomValidity("");
      testTitle = true;
    }
  }

  let numbers = /^[1-9]+[0-9]*$/;
  let zeroNumbers = /^0[0-9]*$/;
  let notANumber = /^\d*[^\d]\d*$/;

  if (newPages.value.match(numbers) || newPages.value === "") {
    let numberPages = Number(newPages.value);
    if (numberPages > 400) {
      newPages.setCustomValidity("Sorry, this is very big for our library");
      newPages.reportValidity();
    } else {
      testPages = true;
    }
  } else if (newPages.value.match(zeroNumbers)) {
    newPages.setCustomValidity("The number of pages cannot start from zero");
    newPages.reportValidity();
  } else if (newPages.value.match(notANumber)) {
    newPages.setCustomValidity(
      "Please, write a number without any other characters"
    );
    newPages.reportValidity();
    //testPages = false;
  }

  if (testPages === true && testTitle === true) {
    testPages = false;
    testTitle = false;

    return true;
  } else {
    return false;
  }
}

function toggleRead(e) {
  let id_temp = e.target.id.slice(1);
  let id_temp_array = id_temp - 1;
  console.log();

  if (e.target.innerText === "No") {
    document.getElementById(e.target.id).textContent = "Yes";
    myLibrary[id_temp_array]["read"] = "Yes";
    document.getElementById(e.target.id).style.color = "white";
    document.getElementById(e.target.id).style.backgroundColor = "green";
  } else {
    document.getElementById(e.target.id).textContent = "No";
    document.getElementById(e.target.id).style.color = "black";
    document.getElementById(e.target.id).style.backgroundColor = "orange";

    myLibrary[id_temp_array]["read"] = "NO";
  }
}

function removeBook(e) {
  const id_remove = e.target.id;
  const id_remove_array = id_remove - 1;
  myLibrary.splice(id_remove_array, 1);
  document.querySelector(`[data-id-row = "${id_remove}"]`).remove();
}

function showForm() {
  statusForm.style.display === "block"
    ? (statusForm.style.display = "none")
    : (statusForm.style.display = "block");
}

function formCanceling() {
  statusForm.style.display = "none";
}

function addBookHandle() {
  let title1 = newTitle.value;
  let author1 = newAuthor.value;
  let approvalTesting = testValid();
  let approvalRating = includesBook([title1, author1]);

  //We don't want to add the same book twice
  if (approvalRating) {
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

      // Remove the form
      if (statusForm.style.display === "block") {
        statusForm.style.display = "none";
      }
    }

    event.preventDefault();
  }
}
