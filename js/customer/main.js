// localStorage 가져오기
// 이름
let customerName = document.getElementById('main-name')
let storageName = localStorage.getItem("customerName")
customerName.textContent = storageName
// 좌석
let customerSeat = document.getElementById('help-seat')
let storageSeat = localStorage.getItem('seatNumber')
customerSeat.textContent = storageSeat

// 사용시간, 요금
let useTime = document.getElementById('main-useTime')
let usePay = document.getElementById('main-usePay')
let minutes = 0
let seconds = 1
let price = 1000
let calcPrice = 20

useTime.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
usePay.textContent = price.toLocaleString()

setInterval(() => {
    seconds++
    if (seconds >= 60) {
        seconds = 0
        minutes++

        price += calcPrice
        usePay.textContent = price.toLocaleString()
    }
    let disMinutes = minutes.toString().padStart(2, '0')
    let disSeconds = seconds.toString().padStart(2, '0')
    useTime.textContent = `${disMinutes}:${disSeconds}`
}, 1000)

// 메인화면으로 나가기
let logo = document.querySelector('.logo')
let power = document.querySelector('.main-mainbtn-power')
logo.addEventListener('click', () => {
    location.href = "/index.html"
})
power.addEventListener('click', () => {
    location.href = "/index.html"
})

// 도움말 JSON 가져오기
async function getHelpData() {
    let res = await fetch('/json/help.json')
    let data = await res.json()

    let overlay = document.querySelector('.overlay')
    let helpContainer = document.querySelector('.main-help-btnBox')
    let helpModal = document.querySelector('.help-modal')
    let helpFetch = document.getElementById('help-fetch')
    let submitBtn = document.querySelector('.help-submit')

    // 요청하기 버튼
    submitBtn.addEventListener('click', () => {
        alert('요청이 완료 되었습니다')
        location.href = 'main.html'
    })

    // 도움말 버튼 만들기
    data.forEach((data, idx) => {
        let btn = document.createElement('button')
        btn.className = 'helpBtn' + idx
        btn.classList.add('helpBtn')
        btn.textContent = data.title
        btn.dataset.index = idx
        helpContainer.appendChild(btn)

        // 버튼 클릭 이벤트
        btn.addEventListener('click', () => {
            helpModal.style.display = 'block'
            overlay.style.display = 'block'
            helpFetch.innerHTML = ''

            let title = document.createElement('h2')
            title.textContent = data.title
            helpFetch.appendChild(title)

            let xBtn = document.createElement('div')
            xBtn.className = 'help-xBtn'
            xBtn.innerHTML = '&times;'
            helpFetch.appendChild(xBtn)

            let optionBox = document.createElement('div')
            optionBox.className = 'help-options'
            helpFetch.appendChild(optionBox)

            // 서브메뉴 들고오기
            data.submenu.forEach((sub, id) => {
                let label = document.createElement('label')
                let input = document.createElement('input')

                input.type = 'radio'
                input.name = data.key
                input.value = id

                label.appendChild(input)
                label.append(" " + sub)
                optionBox.appendChild(label)
            })

            // x버튼
            xBtn.addEventListener('click', () => {
                helpModal.style.display = 'none'
                overlay.style.display = 'none'
            })
        })
    })
}
getHelpData()

// 음식 주문 버튼
let menuBtn = document.getElementById('mainbtn-food')
menuBtn.addEventListener('click', () => location.href = '/pages/customer/menu.html')

// 주문 내역 버튼
let orderBtn = document.getElementById('mainbtn-order')
orderBtn.addEventListener('click', () => location.href = '/pages/customer/order-history.html')

// 내 정보 버튼
let gameBtn = document.getElementById('mainbtn-game')
gameBtn.addEventListener('click', () => location.href = '/pages/customer/game.html')





