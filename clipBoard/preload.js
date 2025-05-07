// 预加载脚本
const { contextBridge, ipcRenderer } = require('electron/renderer')
// 你的渲染器进程可以访问 window.electronAPI.onUpdateCounter() 监听器函数。
contextBridge.exposeInMainWorld('electronAPI', {
    copyContent:(val)=>ipcRenderer.send('copyContent',val),
    pasteContent:()=>ipcRenderer.send('pasteContent'),
    pasteText:(callback)=>ipcRenderer.on('pasteText',(ev,data)=>callback(data)),
    pasteImage:()=>ipcRenderer.send('pasteImage'),
    appendBody:(callback)=>ipcRenderer.on('appendBody',(ev,data)=>callback(data))
})