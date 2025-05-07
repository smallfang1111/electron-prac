window.addEventListener('DOMContentLoaded', () => {
    let aBtn = document.getElementsByTagName('button')
    let aInput = document.getElementsByTagName('input')
    let oBtn = document.getElementById('copyAndPaste')
    aBtn[0].onclick = () => {
        // 复制内容
        const copyText = aInput[0].value
        window.electronAPI.copyContent(copyText)
    }

    aBtn[1].onclick = () => {
        window.electronAPI.pasteContent()
    }

    window.electronAPI.pasteText((data) => {
        aInput[1].value = data
    })

    oBtn.onclick = () => {
        window.electronAPI.pasteImage()
        // let oImage=nativeImage.createFromPath('../chrismas.png')
    }

    window.electronAPI.appendBody((data) => {
        console.log(data)
        const oImgDom = new Image()
        oImgDom.src = data.toDataURL()
        console.log(oImgDom)
        document.body.appendChild(oImgDom)
    })
})    