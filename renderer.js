// const information = document.getElementById('info')
// information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`


// const func=async()=>{
//     const response=await window.versions.ping()
//     console.log(response)
// }

// func()

// const setButton = document.getElementById('btn')
// const titleInput = document.getElementById('title')
// setButton.addEventListener('click', () => {
//   const title = titleInput.value
//   window.electronAPI.setTitle(title)
// })

// const btn = document.getElementById('btn')
// const filePathElement = document.getElementById('filePath')

// btn.addEventListener('click', async () => {
//   const filePath = await window.electronAPI.openFile()
//   filePathElement.innerText = filePath
// })

// 构建渲染器进程 UI
// const counter = document.getElementById('counter')

// window.electronAPI.onUpdateCounter((value) => {
//   const oldValue = Number(counter.innerText)
//   const newValue = oldValue + value
//   counter.innerText = newValue.toString()
//   window.electronAPI.counterValue(newValue)
// })

const { ipcRenderer } = require('electron');
window.addEventListener('DOMContentLoaded', () => {
  console.log('1111')
  // 打开新窗体
  document.getElementById('btn').addEventListener('click', () => {
    ipcRenderer.send('create-new-window');
  });

  // 获取元素添加点击操作的监听
  let minimiseBtn = document.getElementsByClassName('windowTool')[0].getElementsByClassName('minimise')[0]
  minimiseBtn.addEventListener('click', () => {
    ipcRenderer.send('minimise-window');
  })

  let fullScreenBtn = document.getElementsByClassName('windowTool')[0].getElementsByClassName('fullScreen')[0]
  fullScreenBtn.addEventListener('click', () => {
    ipcRenderer.send('fullScreen-window');
  })

  let closeBtn = document.getElementsByClassName('windowTool')[0].getElementsByClassName('close')[0]
  closeBtn.addEventListener('click', () => {
    ipcRenderer.send('close-window');
  })
})
