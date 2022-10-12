'use strict'

function onInit() {
    renderFilterByQueryStringParams()
    _createBooks()
    renderBooks()
    if(gFilterBy.bookId){
        onRead(gFilterBy.bookId)
    }
}

function renderBooks() {
    var books = getBooksToDisplay()
    var strHTML = (gIsTableLayout) ? books.map(book => `
    <tr>
    <td>${book.id}</td>
    <td class="book-name-td">${book.bookName}</td>
    <td>${book.price}$</td>
    <td><button onclick="onRead('${book.id}')">Read📖</button><button onclick="onUpdate('${book.id}')">Update💲</button><button onclick="onDelete('${book.id}')">Delete❌</button></td>
    <td><button class="on-rate-btn" onclick="onRate('${book.id}', 1)">+</button>${book.rate}<button class="on-rate-btn" onclick="onRate('${book.id}' , -1)">-</button></td>
</tr>
    `) : books.map(book => `
    <div class="card">
    <h3>${book.bookName}</h3>
    <img src="img/book${getRandomIntInclusive(1, 5)}.png" alt="">
    <p>${book.price}$</p>
    <p><button class="on-rate-btn" onclick="onRate('${book.id}', 1)">+</button>${book.rate}<button class="on-rate-btn" onclick="onRate('${book.id}' , -1)">-</button></p>
    <button onclick="onRead('${book.id}')">Read📖</button><button onclick="onUpdate('${book.id}')">Update💲</button><button onclick="onDelete('${book.id}')">Delete❌</button>
  </div>
  `)

    if (gIsTableLayout) {
        document.querySelector('.table-body').innerHTML = strHTML.join('')
        document.querySelector('.cards-container').innerHTML = ''
        document.querySelector('.thead').innerHTML = ` <th>Id</th>
      <th>Title</th>
      <th>Price</th>
      <th>Actions</th>
      <th>Rate</th>`
    } else {
        document.querySelector('.cards-container').innerHTML = strHTML.join('')
        document.querySelector('.table-body').innerHTML = ''
        document.querySelector('.thead').innerHTML = ''
    }
}

function onDelete(bookId) {
    deleteBook(bookId)
    console.log('from controller:', bookId);
    renderBooks()
}

function onAddBook() {
    var bookName = prompt('please enter book name')
    var price = prompt('please enter price (in usd)')
    if (!price || !bookName) return
    addBook(bookName, price)
    renderBooks()
}

function onUpdate(bookId) {
    var newPrice = prompt('update book price')
    updateBook(bookId, newPrice)
    renderBooks()
}

function getBookById(bookId) {
    var book = gBooks.find(book => book.id === bookId)
    return book
}

// getItemIdx(bookId){
//     return gBooks.findIndex(book => book.id === bookId)
// }

function onRead(bookId) {
    const book = getBookById(bookId)
    document.querySelector(".sidebar").style.width = "30%";
    document.querySelector('.book-title').innerText = book.bookName
    document.querySelector('.book-pricing').innerText = 'pricing: ' + book.price + '$' // book.price
    document.querySelector('.book-rate').innerText = 'Rate:' + book.rate
    var filterBy = setBookFilter({ bookId })
    onSetFilterBy(filterBy)

}

function onSetFilterBy(filterBy) {
    filterBy = setBookFilter(filterBy)
    renderBooks()

    const queryStringParams = `?maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}&text=${filterBy.text}&bookId=${filterBy.bookId}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)

}
function closeNav() {
    document.querySelector(".sidebar").style.width = "0";
}

function onRate(bookId, diff) {
    changeRate(bookId, diff)
    renderBooks()
}


function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        maxPrice: +queryStringParams.get('maxPrice') || 0,
        minRate: +queryStringParams.get('minRate') || 0,
        text: queryStringParams.get('text') || '',
        bookId: queryStringParams.get('bookId') || ''
    }
    console.log(filterBy);

    if (!filterBy.maxPrice && !filterBy.minRate && !filterBy.text) return

    document.querySelector('.filter-max-price').value = filterBy.maxPrice
    document.querySelector('.filter-min-rate').value = filterBy.minRate
    document.querySelector('.filter-text').value = filterBy.text
    setBookFilter(filterBy)
}

function onPageBtn(determine) {
    determine === 'next'
        ? nextPage()
        : prevPage()

    document.querySelector('.page-number').innerText = gPageIdx
    renderBooks()
}

function onChangeLayout() {
    changeLayout()
    document.querySelector('.layout-img').src = gIsTableLayout
        ? 'img/grid.png'
        : 'img/list.png'
    renderBooks()
}


// init() =>createItems=>renderItems
// renderItems()=>getItemsForDisplay

// crud
// onRead=>read
// onRemove => remove
// onUpdate => update
// onAdd=>add

// sort/filter =>setSort/Filter




// serviceFuntions
// getItemsForDisplay(){
// items= gItems
// items= _filterItems()
// _sortItmes()
// _paging()
// return items
// }

// createItmes=>_createItem()
// saveToStorge
// loadFromStorage


// index
// itemsController
// itemsService
// storageService
// utils
