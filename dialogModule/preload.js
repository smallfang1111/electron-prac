// 预加载脚本
const { contextBridge, ipcRenderer } = require('electron/renderer')
// 你的渲染器进程可以访问 window.electronAPI.onUpdateCounter() 监听器函数。
contextBridge.exposeInMainWorld('electronAPI', {
    openDialogFun: () => ipcRenderer.send('openDialogFun'),
    getErrorFile:()=>ipcRenderer.send('getErrorFile')
    // getMsg: (callback) => ipcRenderer.on('mti', (eve, data) => {
    //     callback(data)
    // })
})