// 로컬에서 주문내역 가져오기
let menuList = JSON.parse(localStorage.getItem('menuList')) || []
let totalPrice = localStorage.getItem('totalPrice')
let howpay = localStorage.getItem('howpay')
let status = localStorage.getItem('status')

// 주문내역 만들기
let main = document.querySelector('main')

menuList.forEach((item) => {
    let box = document.createElement('div')
    box.className = 'history-list'
    main.appendChild(box)

    let titleBox = document.createElement('div')
    titleBox.textContent = item.menuName
    box.appendChild(titleBox)

    let qty = document.createElement('span')
    qty.className = 'history-qty'
    qty.textContent = item.qty + '개'
    titleBox.appendChild(qty)

    let priceBox = document.createElement('div')
    box.appendChild(priceBox)

    let price = document.createElement('span')
    price.textContent = item.menuprice.toLocaleString() + '원'
    priceBox.appendChild(price)

    let howpayDiv = document.createElement('span')
    howpayDiv.textContent = ' (' + howpay + ')'
    priceBox.appendChild(howpayDiv)

    let statusDiv = document.createElement('div')
    statusDiv.textContent = localStorage.getItem('orderStatus')
    box.appendChild(statusDiv)
})

// 총금액
let total = document.getElementById('history-totalPrice')
total.textContent = Number(totalPrice).toLocaleString()

// x버튼
document.querySelector('.close').addEventListener('click', () => {
    location.href = 'pages/customer/main.html'
})
