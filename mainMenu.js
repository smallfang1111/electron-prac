const { app, BrowserWindow, Menu } = require('electron')
console.log(process.platform)  // 区分操作系统
const createWindow = () => {
    let mainWin = new BrowserWindow({
        title: '自定义菜单',
        backgroundColor: '#fff',
        width: 800,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })

    // 定义自己需要的菜单项
    let menuTemp = [
        {
            label: '文件', submenu: [
                {
                    label: '关于',
                    role: 'about'
                },
                { type: 'separator' },
                {
                    label: 'services', click() {
                        console.log('1212')
                    }
                },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideOthers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        },
        { label: '编辑' }
    ]

    // 利用上述模板，生成菜单项
    let menu = Menu.buildFromTemplate(menuTemp)

    // 将上述的自定义惨淡添加到应用里
    Menu.setApplicationMenu(menu)

    mainWin.loadFile('indexMenu.html')
    mainWin.on('closed', () => {
        mainWin = null
    })
}
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