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

function addBookToLibrary() {
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

addBookToLibrary();

// console.log(JS.info());
// console.log(Object.getPrototypeOf(JS));

// // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
// var cell1 = row.insertCell(0);
// var cell2 = row.insertCell(1);
// var cell3 = row.insertCell(2);
// var cell4 = row.insertCell(3);
// // Add some text to the new cells:
// cell1.innerHTML = "NEW CELL1";
// cell2.innerHTML = "NEW CELL2";
// cell3.innerHTML = "NEW CELL1";
// cell4.innerHTML = "NEW CELL2";
