window.addEventListener('DOMContentLoaded', () => {
    const createMenuBtn = document.getElementById('createMenu')
    const addMenuItemBtn = document.getElementById('addMenuItem')
    const textInputVal = document.getElementById('textInput')
    createMenuBtn.addEventListener('click', () => {
        window.electronAPI.createMenu()

    })
    addMenuItemBtn.addEventListener('click', () => {
        window.electronAPI.addMenuItem(textInputVal.value.trim())
        window.electronAPI.addMenuItemAsync('这是从渲染进程到主进程的一条同步消息')
    })

    window.addEventListener('contextmenu', (ev) => {
        ev.preventDefault()
        window.electronAPI.rightClick()
    }, false)

    window.electronAPI.addMenuItemBack((val) => {
        console.log('这是接收从主进程发送过来的消息', val)
    })

    window.electronAPI.getMptMessage((val) => {
        console.log('electron', val)
    })
})