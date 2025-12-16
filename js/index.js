//  페이지 로드 시 랜덤 좌석번호 생성 + localStorage 저장
document.addEventListener("DOMContentLoaded", () => {
    const blocked = [1, 2, 3, 4, 5, 16, 18, 21, 26, 27, 37, 39, 40, 41, 42, 43, 44, 45]
    let seatNumber;
    do {
        seatNumber = Math.floor(Math.random() * 50) + 1
    } while (blocked.includes(seatNumber))


    localStorage.setItem("seatNumber", seatNumber)
    document.getElementById("seat-number").innerText = seatNumber
})

// 모달의 close 버튼
const closeBtns = document.querySelectorAll('.modal .close')

closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.target.closest('.modal').style.display = 'none'
    })
})

// 바탕 화면 눌러도 모달 없애기
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none'
    if (e.target === adminModal) adminModal.style.display = 'none'
})

//  손님 회원가입 모달
const signupBtn = document.getElementById('customer-btn')
const modal = document.getElementById('signup-modal')

signupBtn.addEventListener('click', () => {
    modal.style.display = 'block'
})

// 손님 회원가입 제출
document.getElementById('signup-submit').addEventListener('click', (e) => {
    e.preventDefault()

    const nameInput = document.getElementById('customer-name')
    const birthInput = document.getElementById('customer-birth')
    const passInput = document.getElementById('customer-pass')

    const name = nameInput.value.trim()
    const birth = birthInput.value.trim()
    const pass = passInput.value.trim()

    if (!name || !pass) {
        alert("필수 항목(*)을 모두 입력해주세요.")
        return;
    }

    // 저장된 좌석번호 가져오기
    const seatNumber = localStorage.getItem("seatNumber")

    // localStorage 저장
    localStorage.setItem("customerName", name)
    localStorage.setItem("customerPassword", pass)
    localStorage.setItem("customerBirthday", birth)
    localStorage.setItem("seatNumber", seatNumber)

    // 모달 닫기 + 이동
    document.getElementById('signup-modal').style.display = 'none';
    nameInput.value = ''
    birthInput.value = ''
    passInput.value = ''

    location.href = 'pages/customer/main.html'
})

// 관리자 로그인 모달
const adminBtn = document.getElementById('admin-btn')
const adminModal = document.getElementById('admin-modal')

adminBtn.addEventListener('click', () => {
    adminModal.style.display = 'block'
})

// 관리자 로그인 제출
document.getElementById('admin-submit').addEventListener('click', (e) => {
    e.preventDefault()

    const passInput = document.getElementById('admin-pass')
    const adminPass = passInput.value.trim()

    if (!adminPass) {
        alert("비밀번호를 입력해주세요.")
        return
    }

    if (adminPass === "admin123") {
        adminModal.style.display = 'none'
        passInput.value = ""

        location.href = 'pages/admin/main.html'
    } else {
        alert("비밀번호가 틀렸습니다.")
    }
})

