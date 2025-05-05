// 预加载脚本
const { contextBridge, ipcRenderer } = require('electron/renderer')
// 你的渲染器进程可以访问 window.electronAPI.onUpdateCounter() 监听器函数。
contextBridge.exposeInMainWorld('electronAPI', {
    popupMenu: () => ipcRenderer.send('popup-menu'),
    // addMenuItem: (inputVal) => ipcRenderer.send('add-menu-item',inputVal)
})