import "./styles.css";
import trashcanSvg from "./assets/trash-can-outline.svg";
import openBookSvg from "./assets/book-open-variant.svg";
import closedBookSvg from "./assets/book-check-outline.svg";


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
        if (this.read === true || this.read === "true") this.read = false;
        else if (this.read === false || this.read === "false") this.read = true;
        else alert('Error toggling read. Try again.');
    }
}


// Card
class Card {
    constructor(book, library) {
        this.book = book;
        this.card = document.createElement('div');
        this.title = document.createElement('h3');
        this.author = document.createElement('h5');
        this.pages = document.createElement('p');
        this.bin = new Image();
        this.bin.src = trashcanSvg;
        this.read = new Image();
        this.classname = 'card';

        this.title.textContent = book.title;
        this.author.textContent = book.author;
        this.pages.textContent = `${book.pages} pages`;

        this.bin.classList.add('bin');
        this.read.classList.add('read');

        this.card.appendChild(this.title);
        this.card.appendChild(this.author);
        this.card.appendChild(this.pages);
        this.card.appendChild(this.bin);
        this.card.appendChild(this.read);

        this.card.classList.add(`${this.classname}`);

        this.read.addEventListener('click', () => {
            this.book.toggleRead();
            this.setRead();
        });
        // library passed in @ card creation
        this.bin.addEventListener('click', () => {
            library.deleteBook(this.book.id);
        });
    }

    setRead() {
        if (this.book.read === true || this.book.read === "true") this.read.src = closedBookSvg;
        else this.read.src = openBookSvg;
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

    updateShelf() {
        this.shelf.innerHTML = "";

        this.cards.forEach(card => {
            card.setRead();
            this.shelf.appendChild(card.card);
        });
    }

    addBook(title, author, pages, read = false) {
        const book = new Book(title, author, pages, read);
        const card = new Card(book, this);
        this.books.push(book);
        this.cards.push(card);
        this.updateShelf();
    }

    deleteBook(id) {
        const ind = this.books.findIndex(book =>
            book.id === id);
        
        this.books.splice(ind, 1);
        this.cards.splice(ind, 1);

        this.updateShelf();
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


    prepopulate() {
        this.addBook("The Wizard of Oz", "L. Frank Baum", 215, false);
        this.addBook("Salem's Lot", "Stephen King", 235, false);
        this.addBook("Spare", "Prince Harry", 367, false);
        this.addBook("The Code Book", "Simon Singh", 235, false);
        this.addBook('Autobiography of Red', 'Anne Carson', 149, false);
    }
}


function generateLibrary(newBookBtn, closeBtn, dialog, form) {
    const library = new Library();
    // const newBookBtn = document.getElementById('new-book');
    // const dialog = document.querySelector('dialog');
    // const form = document.getElementById('form');
    // const closeBtn = document.getElementById('close');

    newBookBtn.addEventListener('click', () => {
        dialog.showModal();
    });
    closeBtn.addEventListener('click', () => {
        dialog.close();
    });
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const obj = Object.fromEntries(formData);
        dialog.close();

        library.addBook(obj.title, obj.author, obj.pages, obj.read);
    });

    library.adoptParent(document.querySelector('main'));
    library.prepopulate();
    library.updateShelf();

    console.log(library);
}

generateLibrary(document.getElementById('new-book'), 
    document.getElementById('close'), 
    document.querySelector('dialog'), 
    document.getElementById('form'));