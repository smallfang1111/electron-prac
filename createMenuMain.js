const { app, BrowserWindow, Menu, ipcMain, MenuItem } = require('electron')
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



    mainWin.loadFile('indexMenuMain.html')
    mainWin.on('closed', () => {
        mainWin = null
    })
}
// 控制ready事件
// ready事件是：当 Electron 完成初始化时，发出一次。
app.on('ready', () => {
    // 自定义全局变量存放菜单项
    let menuItem=new Menu()
    ipcMain.on('create-menu',()=>{
        console.log('3223')
        // 创建菜单
        let menuFile=new MenuItem({
            label:'文件',
            type:'normal'
        })
        let menuEdit=new MenuItem({
            label:'编辑',
            type:'normal'
        })

        let customMenu=new MenuItem({
            label:'自定义菜单项',
            submenu:menuItem,
            type:'normal'
        })
        
        let menu=new Menu()
        menu.append(menuFile)
        menu.append(menuEdit)
        menu.append(customMenu)
        
        Menu.setApplicationMenu(menu)
    })

    ipcMain.on('add-menu-item',(event,val)=>{
        console.log('322311',val)
    })
    // 监听消息
    app.on('activate', () => {
        // 在 macOS 系统内, 如果没有已开启的应用窗口
        // 点击托盘图标时通常会重新创建一个新窗口 
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    createWindow()

})