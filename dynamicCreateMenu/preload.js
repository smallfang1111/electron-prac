

// 所有的 Node.js API接口 都可以在 preload 进程中被调用.
// 它拥有与Chrome扩展一样的沙盒。
// window.addEventListener('DOMContentLoaded', () => {
//     const replaceText = (selector, text) => {
//       const element = document.getElementById(selector)
//       if (element) element.innerText = text
//     }

//     for (const dependency of ['chrome', 'node', 'electron']) {
//       replaceText(`${dependency}-version`, process.versions[dependency])
//     }
//   })


// contextBridge.exposeInMainWorld('versions', {
//   node: () => process.versions.node,
//   chrome: () => process.versions.chrome,
//   electron: () => process.versions.electron,
//   // 除函数之外，我们也可以暴露变量
//   ping: () => ipcRenderer.invoke('ping')
// })

// contextBridge.exposeInMainWorld('myApi',{
//   deskTop:true
// })

// contextBridge.exposeInMainWorld('electronAPI', {
//   setTitle: (title) => ipcRenderer.send('set-title', title)
// })

// contextBridge.exposeInMainWorld('electronAPI',{
//   openFile:()=>ipcRenderer.invoke('dialog:openFile')
// })


// contextBridge.exposeInMainWorld('electronAPI', {
//   onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value)),
//   counterValue: (value) => ipcRenderer.send('counter-value', value)
// })
//预加载脚本之后 你的渲染器进程应该可以访问 window.electronAPI.onUpdateCounter() 监听器函数。



// 预加载脚本
const { contextBridge, ipcRenderer } = require('electron/renderer')
// 你的渲染器进程可以访问 window.electronAPI.onUpdateCounter() 监听器函数。
contextBridge.exposeInMainWorld('electronAPI', {
    createMenu: () => ipcRenderer.send('create-menu'),
    addMenuItem: (inputVal) => ipcRenderer.send('add-menu-item',inputVal)
})