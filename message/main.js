const { app, BrowserWindow, ipcMain, Notification, globalShortcut } = require('electron')
const path = require('node:path')


const createWindow = () => {
    let mainWin = new BrowserWindow({
        title: '自定义菜单',
        backgroundColor: '#fff',
        width: 800,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })
    mainWin.loadFile('./message/index.html')
    mainWin.on('closed', () => {
        mainWin = null
    })
    mainWin.webContents.openDevTools()
}


ipcMain.on('showMessge', () => {
    console.log(1)
    new Notification({
        title: '学习electron',
        body: '加油加油',
    }).show();
    console.log(2)
})

// 控制ready事件
// ready事件是：当 Electron 完成初始化时，发出一次。
app.on('ready', () => {
    // 监听消息
    app.on('activate', () => {
        // 在 macOS 系统内, 如果没有已开启的应用窗口
        // 点击托盘图标时通常会重新创建一个新窗口 
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
    createWindow()
})

app.on('ready',()=>{
    // 快捷键注册
    const ret = globalShortcut.register('ctrl+p', () => {
        console.log('ctrl+p is pressed')
      })
      if (!ret) {
        console.log('registration failed')
      }
})

app.on('will-quit', () => {
    // 注销快捷键
    globalShortcut.unregister('ctrl+p')
  
    // 注销所有快捷键
    globalShortcut.unregisterAll()
  })