const { app, BrowserWindow, ipcMain, dialog, } = require('electron')
const path = require('node:path')

// 定义全局变量存放主窗口 ID
let mainWinId = null

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
    mainWinId = mainWin.id
    mainWin.loadFile('./dialogModule/index.html')
    mainWin.on('closed', () => {
        mainWin = null
    })
    mainWin.webContents.openDevTools()
}

ipcMain.on('openDialogFun',()=>{
    dialog.showOpenDialog({
        defaultPath:__dirname,
        buttonLabel:'请选择',
        title:'小芳芳有钱',
        properties:['openFile','multiSelections'],
        filters:[
            {name:'代码文件',extensions:['js','json','html']},
            {name:'图片文件',extensions:['ico','png','jpeg']},
            {name:'媒体类型',extensions:['avi','mp4','mp3']}
        ]
    }).then(ret=>{
        console.log(ret)
    })
})

ipcMain.on('getErrorFile',()=>{
    dialog.showErrorBox('自定义标题','当前错误内容')
})

// 接收其他进程发送的数据
// ipcMain.on('openWin1', (ev,data) => {
//     // 接收到渲染进程中按钮点击信息之后完成窗口2的打开
//     let subWin1 = new BrowserWindow({
//         backgroundColor: '#fff',
//         width: 500,
//         height: 500,
//         parent: BrowserWindow.fromId(mainWinId),
//         webPreferences: {
//             preload: path.join(__dirname, 'subPreload.js'),
//             nodeIntegration: true,
//             enableRemoteModule: true
//         }
//     })
//     subWin1.loadFile('./dialogModule/subIndex.html')
//     subWin1.on('closed', () => {
//         subWin1 = null
//     })

//     // 此时我们是可以直接拿到sub进程的窗口对象，因此我们需要考虑的是等到它里面的所有内容加载完成之后再执行数据发送
//     subWin1.webContents.on('did-finish-load',()=>{
//         subWin1.webContents.send('its', data)
//     })
// })

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

