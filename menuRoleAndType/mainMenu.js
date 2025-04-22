const { app, BrowserWindow, Menu } = require('electron')
// console.log(process.platform)  // 区分操作系统
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
            label: '角色', submenu: [
                {
                    label: '复制',
                    role: 'copy'
                },
                {
                    label: '剪切', role: 'cut'
                },
                { label: "粘贴", role: 'paste' },
                { label: "最小化", role: 'minimize' },
            ]
        },
        {
            label: '类型',
            submenu: [
                { label: '选项一', type: 'checkbox' },
                { label: '选项二', type: 'checkbox' },
                { label: '选项三', type: 'checkbox' },
                { type: 'separator' },
                { label: 'item1', type: 'radio' },
                { label: 'item2', type: 'radio' },
                { label: 'item3', type: 'radio' },
                { type: 'separator' },
                { label: 'windows', type: 'submenu', role: 'windowMenu' },
            ]
        },
        {
            label: '其他', submenu: [
                {
                    // accelerator 若存在则指向该项的快捷键
                    label: '打开', icon: './chrismas.png', accelerator: 'ctrl+o', click: () => {
                        console.log('打开执行了')
                    }
                }
            ]
        }
    ]

    // 利用上述模板，生成菜单项
    let menu = Menu.buildFromTemplate(menuTemp)

    // 将上述的自定义菜单添加到应用里
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