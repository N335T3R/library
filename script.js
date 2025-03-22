// VARIABLES
const main = document.querySelector('main');
const dialog = document.querySelector('dialog');
const newBookBtn = document.getElementById('new-book');
const submitBtn = document.getElementById('submit');
const closeBtn = document.getElementById('close')
const form = document.getElementById('form');

let library = [];

const book = new Book("The Wizard of Oz", "L. Frank Baum", 215, true);
const book1 = new Book("Salem's Lot", "Stephen King", 235, true);
const book2 = new Book("Spare", "Prince Harry", 367, true);
const book3 = new Book("The Code Book", "Simon Singh", 235, true);
const book4 = new Book("The Wizard of Oz", "L. Frank Baum", 215, true);
const book5 = new Book("Salem's Lot", "Stephen King", 235, true);
const book6 = new Book("Spare", "Prince Harry", 367, true);
const book7 = new Book("The Code Book", "Simon Singh", 235, true);





library.push(book, book1, book2, book3, book4, book5, book6, book7);
refreshMain();

let bins = Array.from(document.getElementsByClassName('trash'));
let reads = Array.from(document.getElementsByClassName('read'));


// EVENT LISTENERS
// Delete book event listener;
bins.forEach(bin => {
    bin.addEventListener('click', () => {
        deleteBook(bin);
    });
});
// (un)Read book event listener
reads.forEach(read => {
    read.addEventListener('click', () => {
        toggleRead(read);
    });
});

// New book listeners
newBookBtn.addEventListener('click', () => {
    dialog.showModal();
});

closeBtn.addEventListener('click', () => {
    dialog.close();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // GET info from NewBook HTML form
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    dialog.close();

    // Create book and card
    let book = addBookToLibrary(data.title, data.author, data.pages, data.read);
    refreshMain();

    // Update bins[] & 'delete' eventListeners
    bins = Array.from(document.getElementsByClassName('trash'));
    bins.forEach(bin => {
        bin.addEventListener('click', () => {
            deleteBook(bin);
        });
    });

    reads = Array.from(document.getElementsByClassName('read'));
    reads.forEach(read => {
        read.addEventListener('click', () => {
            toggleRead(read);
        });
    });
});









// FUNCTION DECLARATIONS
function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
    this.toggleRead = () => {
        if (this.read) this.read = false;
        else this.read = true;
    }
}

function addBookToLibrary(title, author, pages, read = false) {
    const book = new Book(title, author, pages, read);
    library.push(book);

    return book;
} 

function refreshMain() {
    main.innerHTML = '';
    library.forEach(book => {
        const card = createCard(book);
        main.appendChild(card);
    });
}

function createCard(book) {
    const card = document.createElement('div');
    const title = document.createElement('h3');
    const author = document.createElement('h5');
    const pages = document.createElement('p');
    const bin = new Image();
    bin.src = "./assets/trash-can-outline.svg"
    const read = new Image();
    if (book.read)  read.src = "assets/book-check-outline.svg"
    else  read.src = "./assets/book-open-variant.svg"
    

    card.classList.add('card');
    title.innerText = `${book.title}`;
    author.innerText = `by ${book.author}`;
    pages.innerText = `Pages: ${book.pages}`;

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(bin);
    bin.classList.add('trash');
    card.append(read);
    read.classList.add('read');
    return card;
}

function deleteBook(bin) {
    const ind = bins.indexOf(bin);
    console.log(ind);
    library.splice(ind, 1);
    bins = bins.splice(ind, 1);
    refreshMain();

    // IDK why, but bins must be redeclared for
    // the eventListener to successfully reapply
    bins = Array.from(document.getElementsByClassName('trash'));
    bins.forEach(bin => {
        bin.addEventListener('click', () => {
            deleteBook(bin);
        });
    });

    reads = Array.from(document.getElementsByClassName('read'));
    reads.forEach(read => {
        read.addEventListener('click', () => {
            toggleRead(read);
        });
    });
}

function toggleRead(read) {
    const ind = reads.indexOf(read);
    library[ind].toggleRead();

    if (library[ind].read) reads[ind].src = "assets/book-check-outline.svg";
    else read.src = "./assets/book-open-variant.svg"
}