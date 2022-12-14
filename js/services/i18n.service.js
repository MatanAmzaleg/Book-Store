const gTrans = {
    'main-title': {
        en: 'Book Store馃摎',
        he: '讞谞讜转 住驻专讬诐馃摎'
    },
    'max-price': {
        en: 'max price',
        he: '诪讞讬专 诪拽住讬诪诇讬',
    },
    'min-rate': {
        en: 'min price',
        he: '诪讞讬专 诪讬谞讬诪诇讬',
    },
    'search-input': {
        en: 'Seatch for a Book',
        he: '讞驻砖 住驻专...'
    },
    'add-new-book': {
        en: 'Add new book',
        he: '讛讜住祝 住驻专 讞讚砖',
    },
    'prev-page': {
        en: '鈴甈revious Page',
        he: '鈴溩⒆炞曌? 讛拽讜讚诐',
    },
    'next-page': {
        en: 'Next Page鈴?',
        he: '诇注诪讜讚 讛讘讗鈴?',
    },
    'price': {
        en: 'Price',
        he: '诪讞讬专',
    },
    'title': {
        en: 'Title',
        he: '讻讜转专转',
    },
    'id': {
        en: 'Id',
        he: '诪.住.讚',
    },
    'filter': {
        en: 'Filter',
        he: '住谞谉'
    },
    'read': {
        en: 'Read馃摉',
        he: '拽专讗馃摉',
    },
    'update': {
        en: 'Update馃挷',
        he: '注讚讻谉馃挷',
    },
    'delete': {
        en: 'Delete鉂?',
        he: '诪讞拽鉂?',
    },
    'rate': {
        en: 'Rate',
        he: '讚专讙',
    },
    'actions': {
        en: 'Actions',
        he: '驻注讜诇讜转',
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


