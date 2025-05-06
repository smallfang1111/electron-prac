window.addEventListener('DOMContentLoaded', () => {
    const oBtn = document.getElementById('btn')
    oBtn.addEventListener('click', () => {
        window.electronAPI.createRenderWin('来自于index进程的数据')

        // 打开窗口1之后，保存数据至...
        // localStorage.setItem('name','小芳芳有钱')
    })

    // 接收从主进程发送过来的数据
    window.electronAPI.getMsg((val) => {
        console.log(val, 'asdsads')
    })
})