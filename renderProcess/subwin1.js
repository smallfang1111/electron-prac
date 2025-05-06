window.onload = () => {
    let oInput = document.getElementById('text')
    let val = localStorage.getItem('name')
    oInput.value = val

    // 在sub中发送数据给index.js
    let oSendBtn = document.getElementById('send')
    oSendBtn.addEventListener('click', () => {
        window.electronAPI.sendMsg('来自于sub进程')
    })

    window.electronAPI.getMsg((val) => {
        console.log(val, '接收来自主进程的数据---')
    })
}