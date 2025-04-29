// CLASSES
// Book
class Book {
    constructor(title, author, pages, read = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    }

    toggleRead() {
        if (this.read === true) this.read = false;
        else if (this.read === false) this.read = true;
        else alert('Error toggling read. Try again.');
    }
}


// Card
class Card {
    constructor(book) {
        this.book = book;
        this.card = document.createElement('div');
        this.title = document.createElement('h3');
        this.author = document.createElement('h5');
        this.pages = document.createElement('p');
        this.bin = new Image();
        this.bin.src = "./assets/trash-can-outline.svg";
        this.read = new Image();


        this.classname = 'card';

        this.title.textContent = book.title;
        this.author.textContent = book.author;
        this.pages.textContent = book.pages;

        this.bin.classList.add('bin');
        this.read.classList.add('read');

        this.card.appendChild(this.title);
        this.card.appendChild(this.author);
        this.card.appendChild(this.pages);
        this.card.appendChild(this.bin);
        this.card.appendChild(this.read);

        this.card.classList.add(`${this.classname}`);
    }

    setRead() {
        if (this.book.read === true) this.read.src = "./assets/book-check-outline.svg";
        else this.read.src = "./assets/book-open-variant.svg";
    }

    adoptParent(div) {
        div.appendChild(this.card);
    }

    changeClassName(name) {
        this.card.classList.remove(`${this.classname}`);
        this.classname = name;
        this.card.className.add(`${this.classname}`);
    }

    addClassName(name) {
        this.card.classList.add(`${name}`);
    }

    removeClassName(name) {
        this.card.classList.remove(`${name}`);
    }
}


// Library
class Library {
    constructor() {
        this.books = [];
        this.cards = [];
        this.shelf = document.createElement('div');
        this.shelf.classList.add('library');
    }

    addBook(title, author, pages, read = false) {
        const book = new Book(title, author, pages, read);
        const card = new Card(book);
        this.books.push(book);
        this.cards.push(card);
    }

    deleteBook(book) {
        this.books.splice(this.books.indexOf(book), 1);
    }

    adoptParent(div) {
        div.appendChild(this.shelf);
    }

    changeClassName(name) {
        this.shelf.classList.remove(`${this.classname}`);
        this.classname = name;
        this.shelf.className.add(`${name}`);
    }

    addClassName(name) {
        this.shelf.classList.add(`${name}`);
    }

    removeClassName(name) {
        this.shelf.classList.remove(`${name}`);
    }

    updateShelf() {
        this.shelf.innerHTML = "";

        this.cards.forEach(card => {
            card.setRead();
            this.shelf.appendChild(card.card);
        });
    }

    prepopulate() {
        this.addBook("The Wizard of Oz", "L. Frank Baum", 215, true);
        this.addBook("Salem's Lot", "Stephen King", 235, true);
        this.addBook("Spare", "Prince Harry", 367, true);
        this.addBook("The Code Book", "Simon Singh", 235, true);
        this.addBook('Autobiography of Red', 'Anne Carson', 149, true);
    }
}


const library = new Library();
library.adoptParent(document.querySelector('main'));
library.prepopulate();
library.updateShelf();