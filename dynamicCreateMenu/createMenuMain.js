const { app, BrowserWindow, Menu, ipcMain, MenuItem } = require('electron')
const path = require('node:path')

let appMenu = new Menu()
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
    mainWin.loadFile('indexMenuMain.html')
    mainWin.on('closed', () => {
        mainWin = null
    })
}
// 控制ready事件
// ready事件是：当 Electron 完成初始化时，发出一次。
app.on('ready', () => {
    // 自定义全局变量存放菜单项
    ipcMain.on('create-menu', () => {
        // 创建菜单
        let menuFile = new MenuItem({
            label: '文件',
            type: 'normal'
        })
        let menuEdit = new MenuItem({
            label: '编辑',
            type: 'normal'
        })

        let customMenu = new MenuItem({
            label: '自定义菜单项',
            submenu: new Menu(),
            type: 'normal'
        })
        appMenu.append(menuFile)
        appMenu.append(menuEdit)
        appMenu.append(customMenu)
        Menu.setApplicationMenu(appMenu)

    })

    ipcMain.on('add-menu-item', (event, val) => {
        if (val) {
            // 查找文件菜单
            const fileMenuIndex = appMenu.items.findIndex(item => item.label === '自定义菜单项')
            if (fileMenuIndex !== -1) {
                const fileMenu = appMenu.items[fileMenuIndex]
                // 确保子菜单存在
                if (!fileMenu.submenu) {
                    fileMenu.submenu = new Menu()
                }
                const newItem = new MenuItem({
                    label: val,
                    click: () => {
                        console.log('点击了嘿嘿嘿')
                    }
                })
                // 添加到子菜单
                fileMenu.submenu.append(newItem)
                console.log(fileMenu, '111')
                // 更新应用菜单
                Menu.setApplicationMenu(appMenu)
            }
        }
    })
    // 监听消息
    app.on('activate', () => {
        // 在 macOS 系统内, 如果没有已开启的应用窗口
        // 点击托盘图标时通常会重新创建一个新窗口 
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    createWindow()

})