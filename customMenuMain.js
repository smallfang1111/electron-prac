const { app, BrowserWindow, Menu,ipcMain } = require('electron')
const path = require('node:path')

const createWindow = () => {
    let mainWin = new BrowserWindow({
        title: '自定义菜单',
        backgroundColor: '#fff',
        width: 800,
        height: 400,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })
    mainWin.loadFile('customMenu.html')
    mainWin.on('closed', () => {
        mainWin = null
    })
}

// 控制ready事件
// ready事件是：当 Electron 完成初始化时，发出一次。
app.on('ready', () => {
    let contextTemp = [
        { label: 'run code' },
        { label: '转到定义' },
        { label: 'seperator' },
        {
            label: '其他功能',
            click: () => {
                console.log('点击ll ')
            }
        }
    ]
let menu=Menu.buildFromTemplate(contextTemp)
ipcMain.on('popup-menu', () => {
    menu.popup()
})


    // 
    // 监听消息
    app.on('activate', () => {
        // 在 macOS 系统内, 如果没有已开启的应用窗口
        // 点击托盘图标时通常会重新创建一个新窗口 
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    createWindow()

})