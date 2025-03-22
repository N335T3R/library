const main = document.querySelector('main');
const dialog = document.querySelector('dialog');
const newBookBtn = document.getElementById('new-book');
const submitBtn = document.getElementById('submit');
const closeBtn = document.getElementById('close')
const form = document.getElementById('form');

const library = [];

const book = new Book("The Wizard of Oz", "L. Frank Baum", 215, true);
const book1 = new Book("Salem's Lot", "Stephen King", 235, true);
const book2 = new Book("Spare", "Prince Harry", 367, true);
const book3 = new Book("The Code Book", "Simon Singh", 235, true);
const book4 = new Book("The Wizard of Oz", "L. Frank Baum", 215, true);
const book5 = new Book("Salem's Lot", "Stephen King", 235, true);
const book6 = new Book("Spare", "Prince Harry", 367, true);
const book7 = new Book("The Code Book", "Simon Singh", 235, true);





library.push(book, book1, book2, book3, book4, book5, book6, book7);

library.forEach(book => {
    const card = createCard(book);
    main.appendChild(card);
});



newBookBtn.addEventListener('click', () => {
    dialog.showModal();
});
closeBtn.addEventListener('click', () => {
    dialog.close();
});


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    dialog.close();

    addBookToLibrary(data.title, data.author, data.pages, data.read);
    
    main.innerHTML = '';
    library.forEach(book => {
        const card = createCard(book);
        main.appendChild(card);
    });
});






function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read = false) {
    const book = new Book(title, author, pages, read);
    library.push(book);
} 


function createCard(book) {
    const card = document.createElement('div');
    const title = document.createElement('h3');
    const author = document.createElement('h5');
    const pages = document.createElement('p');
    
    
    card.classList.add('card');
    title.innerText = `${book.title}`;
    author.innerText = `by ${book.author}`;
    pages.innerText = `Pages: ${book.pages}`;

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    return card;
}