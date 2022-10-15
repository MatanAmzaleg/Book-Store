'use strict'

function onInit() {
    // doTrans()
    renderFilterByQueryStringParams()
    _createBooks()
    renderBooks()
    if (gFilterBy.bookId) {
        onRead(gFilterBy.bookId)
    }
}

function renderBooks() {
    var books = getBooksToDisplay()
    var strHTML = (gIsTableLayout) ? books.map(book => `
    <tr>
    <td >${book.id}</td>
    <td class="book-name-td">${book.bookName}</td>
    <td >${book.price}$</td>
    <td><button class="btn btn-primary" data-trans="read" onclick="onRead('${book.id}')">Read📖</button><button class="btn btn-success" data-trans="update" onclick="onUpdate('${book.id}')">Update💲</button><button class="btn btn-danger" data-trans="delete" onclick="onDelete('${book.id}')">Delete❌</button></td>
    <td><button class="btn btn-outline-info" onclick="onRate('${book.id}', 1)">+</button><span class="book-rate-span">${book.rate}</span><button class="btn btn-outline-info" onclick="onRate('${book.id}' , -1)">-</button></td>
</tr>
    `) : books.map(book => `
    <div class="card border-dark mb-10">
    <h3>${book.bookName}</h3>
    <img src="${book.imgUrl}" alt="">
    <p class="bolded-price">${book.price}$</p>
    <p><button  class="btn btn-outline-info" onclick="onRate('${book.id}', 1)">+</button><span class="book-rate-span">${book.rate}</span><button class="btn btn-outline-info" onclick="onRate('${book.id}' , -1)">-</button></p>
    <button class="btn btn-primary" data-trans="read" onclick="onRead('${book.id}')">Read📖</button><button class="btn btn-success" data-trans="update" onclick="onUpdate('${book.id}')">Update💲</button><button class="btn btn-danger" button data-trans="delete" onclick="onDelete('${book.id}')">Delete❌</button>
  </div>
  `)

    if (gIsTableLayout) {
        document.querySelector('.table-body').innerHTML = strHTML.join('')
        document.querySelector('.cards-container').innerHTML = ''
        document.querySelector('.thead').innerHTML = ` 
        <th data-trans="id">Id</th>
      <th data-trans="title">Title</th>
      <th data-trans="price">Price</th>
      <th data-trans="actions">Actions</th>
      <th data-trans="rate">Rate</th>`
    } else {
        document.querySelector('.cards-container').innerHTML = strHTML.join('')
        document.querySelector('.table-body').innerHTML = ''
        document.querySelector('.thead').innerHTML = ''
    }
    doTrans()
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
    var book = getBookById(bookId)
    document.querySelector(".sidebar").style.width = "30%";
    document.querySelector(".book-subtitle").innerText = book.bookName
    document.querySelector("[data-trans='price']").innerText +=" " + book.price + '$' 
    console.log(document.querySelector("[data-trans='price']").innerText);
    // document.querySelector(".book-rate").innerText = book.rate
    var filterBy = setBookFilter({ bookId })
    onSetFilterBy(filterBy)
    console.log(filterBy);
    var filterBy = getFilterBy()
    const queryStringParams = `?maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}&text=${filterBy.text}&bookId=${filterBy.bookId}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)

}

function onSetLang(lang) {
    setLang(lang)
    setDirection(lang)
    doTrans()
    var filterBy = setBookFilter({ lang })
    onSetFilterBy(filterBy)
    console.log(filterBy);
    var filterBy = getFilterBy()
    const queryStringParams = `?maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}&text=${filterBy.text}&bookId=${filterBy.bookId}&language=${filterBy.lang}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function setDirection(lang) {
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
}

function onSetFilterBy(filterBy) {
    filterBy = setBookFilter(filterBy)
    renderBooks()
    const queryStringParams = `?maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}&text=${filterBy.text}&bookId=${filterBy.bookId}&language=${filterBy.lang}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function closeNav() {
    document.querySelector(".sidebar").style.width = "0";
    var filterBy = getFilterBy()
    const queryStringParams = `?maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}&text=${filterBy.text}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
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
        bookId: queryStringParams.get('bookId') || '',
        lang: queryStringParams.get('language') || ''
    }

    if (!filterBy.maxPrice && !filterBy.minRate && !filterBy.text) return

    document.querySelector('.filter-max-price').value = filterBy.maxPrice
    document.querySelector('.filter-min-rate').value = filterBy.minRate
    document.querySelector('.filter-text').value = filterBy.text
    document.querySelector('.trans-selector').value = filterBy.lang
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
