// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron/main')
// 在你文件顶部导入 Node.js 的 path 模块
const path = require('node:path')

const createWindow = () => {
  // 新建窗口
  //  让窗口加载了一个界面，这个界面就是用web 技术实现 ，这个界面是运行在渲染进程中的 
  const mainWindow = new BrowserWindow({
    x:50,
    y:50, // 设置窗口显示的位置，相对于当前屏幕的左上角
    // show: false, // 窗口初始化时不显示窗口，而是在加载完成后在显示
    width: 1000,
    height: 900,
    maxHeight:900,
    maxWidth:1000,
    minHeight:400,
    minWidth:500, // 可以通过min max 来设置当前应用窗口的最大和最小窗口尺寸
    resizable:false, // 是否允许窗口的缩放
    backgroundColor:'#fff',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadURL('https://github.com')
  // 解决闪烁问题
  // mainWindow.once('ready-to-show', () => {
  //   mainWindow.show()
  // })

  // 让主窗口加载文件 html文件，显示具体内容
  mainWindow.loadFile('index.html')



  mainWindow.on('close', () => {
    console.log('8888----close window')
    mainWindow = null
  })
  // Open the DevTools.
  //  mainWindow.webContents.openDevTools()
}


// 控制ready事件
// ready事件是：当 Electron 完成初始化时，发出一次。
app.on('ready', () => {

  createWindow()
  app.on('activate', () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口 
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
  console.log('44444----window-all-closed')
  if (process.platform !== 'darwin') app.quit()
})


// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。


// 开启热加载
const reloader = require('electron-reloader')
reloader(module)