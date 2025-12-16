let logo = document.querySelector('.logo')
logo.addEventListener('click', () => {
    location.href = "../../index.html"
})

// 네비버튼
let navbtns = document.querySelectorAll('nav>button')
let sections = document.querySelectorAll('.section')
navbtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        navbtns.forEach((item) => {
            item.classList.remove('on')
        })
        sections.forEach((section) => {
            section.classList.remove('on')
        })
        e.target.classList.add('on')
    })
})

// 좌석현황 버튼
let seatBtn = document.querySelector('.seatBtn')
let orderBtn = document.querySelector('.orderBtn')
let seatSec = document.querySelector('.admin-seat')
let orderSec = document.querySelector('.admin-order')

seatBtn.addEventListener('click', () => {
    seatSec.classList.add('on')
})
orderBtn.addEventListener('click', () => {
    orderSec.classList.add('on')
})

// 왼쪽 25개
let leftSeat = document.querySelector('.seat-left')

for (let i = 0; i < 25; i++) {
    let lseats = document.createElement('div')
    lseats.className = 'lseats'
    lseats.id = 'seat' + Number(i + 1)
    leftSeat.appendChild(lseats)

    let leftNum = document.createElement('div')
    leftNum.className = 'left-number'
    leftNum.textContent = 'No.' + Number(i + 1)
    lseats.appendChild(leftNum)
}

// 오른쪽 25개
let rightSeat = document.querySelector('.seat-right')

for (let i = 25; i < 50; i++) {
    let rseats = document.createElement('div')
    rseats.className = 'rseats'
    rseats.id = 'seat' + Number(i + 1)
    rightSeat.appendChild(rseats)

    let rightNum = document.createElement('div')
    rightNum.className = 'right-number'
    rightNum.textContent = 'No.' + Number(i + 1)
    rseats.appendChild(rightNum)
}

// 사용중 좌석 정하기
const using = [1, 2, 16, 26, 27, 41, 42, 43, 44, 45]
let seatNum = localStorage.getItem('seatNumber')
using.push(seatNum)

using.forEach((num) => {
    let seat = document.getElementById(`seat${num}`)
    let useSeat = document.createElement('div')
    useSeat.textContent = '사용 중'
    useSeat.className = 'seat-using'

    seat.appendChild(useSeat)
    seat.classList.add('used')
})

// 청소할 좌석 
const clean = [3, 4, 5, 18, 21, 37, 39, 40]

clean.forEach((num) => {
    let seat = document.getElementById(`seat${num}`)
    let cleanSeat = document.createElement('div')
    cleanSeat.className = 'seat-cleanBox'
    seat.appendChild(cleanSeat)

    let icon = document.createElement('i')
    icon.className = 'fa-regular fa-trash-can'
    cleanSeat.appendChild(icon)
})

let cleanBoxs = document.querySelectorAll('.seat-cleanBox')
cleanBoxs.forEach((trash) => {
    trash.addEventListener('click', () => {
        trash.style.display = 'none'
    })
})

// 주문관리

// 스토리지에서 가져오기
let howpay = localStorage.getItem('howpay')
let seatNumber = localStorage.getItem('seatNumber')
let totalPrice = Number(localStorage.getItem('totalPrice'))
let menuList = localStorage.getItem('menuList')
const menus = JSON.parse(localStorage.getItem('menuList'))
console.log(menus)
const menuTexts = menus.map(item => {
    if (item.qty > 1) {
        return `${item.menuName}(${item.qty})`
    }
    return item.menuName
})

let ul = document.querySelector('.order-ul')
if (menuList) {
    let li = document.createElement('li')
    ul.appendChild(li)

    let numBox = document.createElement('div')
    numBox.className = 'order-numBox'
    numBox.innerHTML = 'No.' + '<br>'
    li.appendChild(numBox)

    let strong = document.createElement('strong')
    strong.className = 'order-num'
    strong.textContent = seatNumber
    numBox.appendChild(strong)

    let menuBox = document.createElement('div')
    menuBox.className = 'order-menuBox'
    li.appendChild(menuBox)

    let menu = document.createElement('div')
    menu.className = 'order-menu'
    menu.innerHTML = menuTexts.join()
    menuBox.appendChild(menu)

    let botBox = document.createElement('div')
    botBox.className = 'order-bot'
    menuBox.appendChild(botBox)

    let priceBox = document.createElement('div')
    priceBox.innerHTML = totalPrice.toLocaleString() + ' (' + howpay + ')'
    botBox.appendChild(priceBox)

    let btnBox = document.createElement('div')
    btnBox.className = 'order-btns'
    botBox.appendChild(btnBox)

    let btn1 = document.createElement('button')
    btn1.textContent = '준비중'
    btn1.className = 'ready'
    btn1.classList.add('this')
    btnBox.appendChild(btn1)
    let btn2 = document.createElement('button')
    btn2.textContent = '전달완료'
    btn2.className = 'finish'
    btn2.classList.add('this')
    btnBox.appendChild(btn2)

} else {
    console.log('담은 메뉴 없음')
}

// 준비중 버튼
let readyBtn = document.querySelectorAll('.ready')
readyBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        btn.classList.add('on')
    })
})

// 전달완료 버튼
let finishBtn = document.querySelectorAll('.finish')
finishBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.target.closest('li').remove()
    })
})

// 스토리지에 주문 상태 저장
let statusBtns = document.querySelectorAll('.this')
statusBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let status = e.target.textContent
        localStorage.setItem('orderStatus', status)
    })
})


