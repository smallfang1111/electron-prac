

window.addEventListener('DOMContentLoaded', () => {
    const createMenuBtn = document.getElementById('createMenu')
    const addMenuItemBtn = document.getElementById('addMenuItem')
    const textInputVal = document.getElementById('textInput')
    createMenuBtn.addEventListener('click', () => {
        window.electronAPI.createMenu()

    })
    addMenuItemBtn.addEventListener('click', () => {
        window.electronAPI.addMenuItem(textInputVal.value)
    })

})