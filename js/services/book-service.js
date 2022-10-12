'use strict'

const STORAGE_KEY = 'booksDB'
const PAGE_SIZE = 3

var gPageIdx = 0
var gBooks
var gFilterBy = { maxPrice: 30, minRate: 0, text: '' }
var gIsTableLayout = true

function getBooksToDisplay() {

    // Filtering:
    var books = gBooks.filter(book => (book.price < gFilterBy.maxPrice) && (book.rate >= gFilterBy.minRate))
    // Paging:
    const startIdx = gPageIdx * PAGE_SIZE
    books = books.slice(startIdx, startIdx + PAGE_SIZE)

    if(gFilterBy.text){
        books = gBooks.filter(book => book.bookName.toLowerCase().includes(gFilterBy.text.toLowerCase()))
    }
    return books
}

function nextPage() {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = Math.floor(gBooks.length / PAGE_SIZE)
    }
}

function prevPage() {
    gPageIdx--
    if (gPageIdx * PAGE_SIZE <= 0) {
        gPageIdx = 0
    }
}


function getBooks() {
    return gBooks
}

function deleteBook(bookId) {
    console.log('from service:', bookId);
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    console.log(bookIdx);
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function addBook(bookName, price) {
    var book = _createBook(bookName, price)
    gBooks.unshift(book)
    _saveBooksToStorage()
    return book

}

function updateBook(bookId, newPrice) {
    const book = gBooks.find(book => book.id === bookId)
    book.price = newPrice
    _saveBooksToStorage()
    return book
}

function changeRate(bookId, diff) {
    const book = gBooks.find(book => book.id === bookId)
    if (book.rate === 0 && diff < 0 || book.rate === 10 && diff > 0) return
    book.rate += diff
    _saveBooksToStorage()
    return book
}


function setBookFilter(filterBy = {}) {
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
    if (filterBy.text !== undefined) gFilterBy.text = filterBy.text
    if (filterBy.bookId !== undefined) gFilterBy.bookId = filterBy.bookId
    return gFilterBy
}

function changeLayout(){
    gIsTableLayout = !gIsTableLayout
    return gIsTableLayout
}



function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)

    if (!books || !books.length) {
        books = []
        for (var i = 0; i < 10; i++) {
            books.push(_createBook())
        }
    }
    gBooks = books
    _saveBooksToStorage()
}



function _createBook(bookName = makeTitle(), price = getRandomIntInclusive(7, 25), rate = 0) {
    return {
        id: makeId(),
        bookName: bookName,
        price: price,
        imgUrl: `img/${bookName}.png`,
        rate: rate
    }
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}