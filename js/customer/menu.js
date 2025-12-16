// json 가져오기
async function getMenuData() {
    const res = await fetch('../../json/menu.json')
    const data = await res.json()
    console.log(data)

    let nav = document.querySelector('.menu-nav')
    let menuBox = document.querySelector('.menu-menuBox')

    // 전체메뉴에 모든메뉴 넣기
    let allMenus = []
    data.forEach((menu, i) => {
        if (i !== 0) {
            allMenus = allMenus.concat(menu.items)
        }
    })
    data[0].items = allMenus

    // nav 버튼들 만들기
    data.forEach((item) => {
        let btn = document.createElement('button')
        btn.className = 'nav-btns'
        btn.textContent = item.category
        nav.appendChild(btn)

        // 메뉴 카드 만들기
        btn.addEventListener('click', () => {
            document.querySelectorAll('.nav-btns').forEach((btns) => {
                btns.classList.remove('on')
            })

            btn.classList.add('on')

            menuBox.innerHTML = ''

            item.items.forEach((menu) => {
                let card = document.createElement('div')
                card.className = 'menu-card'
                menuBox.appendChild(card)

                let imgBox = document.createElement('div')
                imgBox.className = 'menu-imgBox'
                card.appendChild(imgBox)

                let img = document.createElement('img')
                img.className = 'menu-card-img'
                img.src = menu.image
                imgBox.appendChild(img)

                let name = document.createElement('div')
                name.className = 'menu-title'
                name.textContent = menu.name
                card.appendChild(name)

                let priceBox = document.createElement('div')
                card.appendChild(priceBox)

                let price = document.createElement('span')
                price.textContent = menu.price.toLocaleString()
                priceBox.appendChild(price)
                priceBox.append('' + '원')

                let selectBtn = document.createElement('button')
                selectBtn.id = 'menu-select'
                selectBtn.textContent = '담기'
                card.appendChild(selectBtn)

                // 담기 누르면 로컬에 정보저장
                selectBtn.addEventListener('click', () => {
                    let menuList = JSON.parse(localStorage.getItem('menuList')) || []

                    menuList.push({
                        menuName: menu.name,
                        menuprice: menu.price,
                        qty: 1
                    })

                    localStorage.setItem('menuList', JSON.stringify(menuList))
                    sideList()
                    totalPrice()
                })
            })
        })
    })
    const allBtn = nav.querySelector('.nav-btns')
    if (allBtn) allBtn.click()
}

getMenuData()

// 메인으로 나가기
let xBtn = document.querySelector('.menu-xBtn')
xBtn.addEventListener('click', () => location.href = '../../pages/customer/main.html')
let logo = document.querySelector('.logo')
logo.addEventListener('click', () => location.href = '../../pages/customer/main.html')

// 메뉴 목록 조회 리스트 만들기
function sideList() {
    let menuListContainer = document.querySelector('.menu-bside-list')
    menuListContainer.innerHTML = ''

    let storageMenuList = JSON.parse(localStorage.getItem('menuList')) || []

    if (storageMenuList.length == 0) {
        let noneList = document.createElement('div')
        noneList.textContent = '음식을 담아주세요'
        menuListContainer.appendChild(noneList)
        return
    }


    storageMenuList.forEach((list, index) => {

        let menuListBox = document.createElement('div')
        menuListBox.className = 'menu-bside-info'
        menuListContainer.appendChild(menuListBox)

        let listLeft = document.createElement('div')
        listLeft.className = 'menu-list-name'
        menuListBox.appendChild(listLeft)

        let listName = document.createElement('div')
        listName.id = 'listName'
        listName.textContent = list.menuName
        listLeft.appendChild(listName)

        let qtyBox = document.createElement('div')
        qtyBox.className = "menu-bside-qtyBox"
        listLeft.appendChild(qtyBox)

        let minusBtn = document.createElement('button')
        minusBtn.textContent = '−'
        qtyBox.appendChild(minusBtn)

        let qty = document.createElement('div')
        qty.textContent = list.qty || 1
        qtyBox.appendChild(qty)

        let plusBtn = document.createElement('button')
        plusBtn.textContent = '＋'
        qtyBox.appendChild(plusBtn)

        let priceBox = document.createElement('div')
        priceBox.className = "menu-bside-price"
        menuListBox.appendChild(priceBox)

        let listPrice = document.createElement('span')
        listPrice.id = 'listPrice'
        priceBox.appendChild(listPrice)
        priceBox.append('' + '원')

        // 가격 업데이트
        function updatePrice() {
            listPrice.textContent = (list.menuprice * Number(qty.textContent)).toLocaleString()
        }
        updatePrice()

        let listRemove = document.createElement('div')
        listRemove.textContent = 'X'
        listRemove.className = 'menu-bside-remove'
        menuListBox.appendChild(listRemove)

        // 수량구하기
        minusBtn.addEventListener('click', () => {
            let currentQty = Number(qty.textContent)
            if (currentQty > 1) {
                currentQty -= 1
            } else {
                currentQty = 1
            }
            qty.textContent = currentQty

            storageMenuList[index].qty = currentQty
            localStorage.setItem('menuList', JSON.stringify(storageMenuList))

            updatePrice()
            totalPrice()
        })

        plusBtn.addEventListener('click', () => {
            let currentQty = Number(qty.textContent)
            currentQty += 1
            qty.textContent = currentQty

            storageMenuList[index].qty = currentQty
            localStorage.setItem('menuList', JSON.stringify(storageMenuList))

            updatePrice()
            totalPrice()
        })

        // 삭제 버튼
        listRemove.addEventListener('click', () => {
            storageMenuList.splice(index, 1)
            localStorage.setItem('menuList', JSON.stringify(storageMenuList))
            sideList()
            totalPrice()
        })
    })
    totalPrice()
}

// 총 수량 구하기
function totalPrice() {
    let storageMenuList = JSON.parse(localStorage.getItem('menuList')) || []
    let total = document.getElementById('total')
    let menuTotal = 0
    storageMenuList.forEach((item) => {
        menuTotal += item.menuprice * item.qty
    })
    total.textContent = menuTotal.toLocaleString()
    localStorage.setItem('totalPrice', menuTotal)
}

// 결제수단
let howpayBtns = document.querySelectorAll('.howpayBtn')

howpayBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        howpayBtns.forEach((del) => {
            del.classList.remove('on')
        })
        btn.classList.add('on')

        localStorage.setItem('howpay', btn.textContent)
    })
})

// 주문하기
let orderBtn = document.getElementById('orderBtn')
let popup = document.querySelector('.popBox')
let keep = document.querySelector('.keep')
orderBtn.addEventListener('click', () => {
    popup.style.display = 'block'
})
// 계속주문하기 버튼
let keepOrder = document.querySelector('.keep')
keepOrder.addEventListener('click', () => {
    popup.style.display = 'none'
})
