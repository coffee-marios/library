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

console.log(JS.info());
console.log(Object.getPrototypeOf(JS));
