// 预加载脚本
const { contextBridge, ipcRenderer } = require('electron/renderer')
// 你的渲染器进程可以访问 window.electronAPI.onUpdateCounter() 监听器函数。
contextBridge.exposeInMainWorld('electronAPI', {
    createRenderWin: (val) => ipcRenderer.send('openWin1',val),
    getMsg: (callback) => ipcRenderer.on('mti', (eve, data) => {
        callback(data)
    })
})