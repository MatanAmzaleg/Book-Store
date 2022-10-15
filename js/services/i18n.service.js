const gTrans = {
    'main-title': {
        en: 'Book Store📚',
        he: 'חנות ספרים📚'
    },
    'max-price': {
        en: 'max price',
        he: 'מחיר מקסימלי',
    },
    'min-rate': {
        en: 'min price',
        he: 'מחיר מינימלי',
    },
    'search-input': {
        en: 'Seatch for a Book',
        he: 'חפש ספר...'
    },
    'add-new-book': {
        en: 'Add new book',
        he: 'הוסף ספר חדש',
    },
    'prev-page': {
        en: '⏮Previous Page',
        he: '⏭לעמוד הקודם',
    },
    'next-page': {
        en: 'Next Page⏭',
        he: 'לעמוד הבא⏮',
    },
    'price': {
        en: 'Price',
        he: 'מחיר',
    },
    'title': {
        en: 'Title',
        he: 'כותרת',
    },
    'id': {
        en: 'Id',
        he: 'מ.ס.ד',
    },
    'filter': {
        en: 'Filter',
        he: 'סנן'
    },
    'read': {
        en: 'Read📖',
        he: 'קרא📖',
    },
    'update': {
        en: 'Update💲',
        he: 'עדכן💲',
    },
    'delete': {
        en: 'Delete❌',
        he: 'מחק❌',
    },
    'rate': {
        en: 'Rate',
        he: 'דרג',
    },
    'actions': {
        en: 'Actions',
        he: 'פעולות',
    },
}

let gCurrLang = 'en'

function getTrans(transKey) {
    const transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN'

    let trans = transMap[gCurrLang]
    if (!trans) trans = transMap.en
    return trans
}

function doTrans() {
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const trans = getTrans(transKey)
        el.innerText = trans
        if (el.placeholder) el.placeholder = trans
    })
    saveToStorage(STORAGE_KEY, gBooks)
}

function setLang(lang) {
    gCurrLang = lang
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num)
}


