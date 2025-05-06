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
    mainWin.loadFile('./dynamicCreateMenu/indexMenuMain.html')
    mainWin.on('closed', () => {
        mainWin = null
    })

    let temp = [
        {
            label: 'send', click: () => {
                // console.log(BrowserWindow.getFocusedWindow().webContents)
                BrowserWindow.getFocusedWindow().webContents.send('mtp','来自于主进程的消息')
            }
        }
    ]


    let menu = Menu.buildFromTemplate(temp)
    Menu.setApplicationMenu(menu)
    mainWin.webContents.openDevTools()
}
// 控制ready事件
// ready事件是：当 Electron 完成初始化时，发出一次。
app.on('ready', () => {
    // 自定义全局变量存放菜单项
    ipcMain.on('create-menu', () => {
        // 创建菜单
        const menuFile = new MenuItem({
            label: '文件',
            type: 'normal'
        })
        const menuEdit = new MenuItem({
            label: '编辑',
            type: 'normal'
        })

        const customMenu = new MenuItem({
            label: '自定义菜单项',
            submenu: new Menu()
        })
        if (!appMenu.items.length) {
            appMenu.append(menuFile)
            appMenu.append(menuEdit)
            appMenu.append(customMenu)
            Menu.setApplicationMenu(appMenu)
        }
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
                if (val) {
                    const newItem = new MenuItem({
                        label: val,
                        click: () => {
                            console.log('点击了嘿嘿嘿')
                        }
                    })
                    // 回送消息
                    event.sender.send('back-msg', '这是一条来自主进程的异步消息')
                    // 添加到子菜单
                    fileMenu.submenu.append(newItem)

                    // 更新应用菜单
                    Menu.setApplicationMenu(appMenu)
                }

            }
        }
    })

    ipcMain.on('add-menu-item-sync', (event, val) => {
        event.returnValue = '来自于主进程的同步消息'
    })

    ipcMain.on('right-click', () => {
        let contextTemp = [
            { label: 'run code' },
            { label: '转到定义' },
            { label: 'seperator' },
            {
                label: '其他功能',
                click: () => {
                    console.log('1-2-3ssasasdasDASDAS撒- ')
                }
            }
        ]
        let menu = Menu.buildFromTemplate(contextTemp)
        menu.popup()
    })
    // 监听消息
    app.on('activate', () => {
        // 在 macOS 系统内, 如果没有已开启的应用窗口
        // 点击托盘图标时通常会重新创建一个新窗口 
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    createWindow()

})

