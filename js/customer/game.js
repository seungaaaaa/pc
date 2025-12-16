// 게임 제이슨 가져오기
let loadGameData = async function () {
    const res = await fetch('json/game.json')
    const datas = await res.json()
    console.log(datas);

    // 게임 정보 카드 만들기
    let main = document.querySelector('main')

    datas.forEach((data) => {

        let box = document.createElement('div')
        box.className = 'game-box'
        main.appendChild(box)

        let imgBox = document.createElement('div')
        imgBox.className = 'imgBox'
        box.appendChild(imgBox)

        let imgTag = document.createElement('img')
        imgTag.src = data.image
        imgTag.alt = data.title
        imgBox.appendChild(imgTag)

        let infoBox = document.createElement('div')
        infoBox.className = 'game-info'
        box.appendChild(infoBox)

        let gameTitle = document.createElement('div')
        gameTitle.className = 'game-title'
        gameTitle.textContent = data.title
        infoBox.appendChild(gameTitle)

        let desc = document.createElement('div')
        desc.className = 'game-desc'
        desc.textContent = data.description
        infoBox.appendChild(desc)
    })
}

loadGameData()

// x버튼
document.querySelector('.close').addEventListener('click', () => {
    location.href = 'pages/customer/main.html'
})
