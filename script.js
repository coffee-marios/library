let myLibrary = [];

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
