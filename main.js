// Modules to control application life and create native browser window
const { app, BrowserWindow, dialog, Menu, ipcMain, webContents } = require('electron/main')
// 在你文件顶部导入 Node.js 的 path 模块
const path = require('node:path')

const createWindow = () => {
  // 新建窗口
  //  让窗口加载了一个界面，这个界面就是用web 技术实现 ，这个界面是运行在渲染进程中的 
  let mainWindow = new BrowserWindow({
    width: 1000,
    height: 900,
    title: 'alita learn',
    backgroundColor: '#fff',
    frame: false, // 用于自定义menu 设置为false 可以将默认的菜单栏隐藏
    autoHideMenuBar: true, // 
    icon: 'chrismas.png',// 设置一个图片路径，可以自定义当前应用的显示图标
    webPreferences: { // 网页功能设置
      preload: path.join(__dirname, 'preload.js'),//在页面运行其他脚本之前预先加载指定的脚本 无论页面是否集成Node, 此脚本都可以访问所有Node API 脚本路径为文件的绝对路径
      nodeIntegration: true,//是否启用Node integration.  默认false
      contextIsolation: false,//是否在独立 JavaScript 环境中运行 Electron API和指定的preload 脚本. 默认为 true。
    }
  })
  mainWindow.loadURL('https://github.com')
  // 解决闪烁问题
  // mainWindow.once('ready-to-show', () => {
  //   mainWindow.show()
  // })

  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
  // 让主窗口加载文件 html文件，显示具体内容
  mainWindow.loadFile('index.html')

  // 监听窗口关闭事件
  mainWindow.on('close', () => {
    console.log('8888----close window')
    mainWindow = null
  })
  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // 监听窗口最小化事件
  ipcMain.on('minimise-window',()=>{
    console.log('ssss')
    mainWindow.minimize()
  })

  // 监听窗口全屏事件
  ipcMain.on('fullScreen-window',()=>{
    if(mainWindow.isMaximized()){
      mainWindow.restore()
    }else{
      mainWindow.maximize()
    }
  })

  ipcMain.on('close-window',()=>{
    mainWindow.close()
  })
}




// 控制ready事件
// ready事件是：当 Electron 完成初始化时，发出一次。
app.on('ready', () => {
  // 监听消息

  ipcMain.on('create-new-window', () => {
    const newWindow = new BrowserWindow({
      width: 400,
      height: 300,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });
    newWindow.loadFile('indexMin.html');
    newWindow.on('close',()=>{
      newWindow=null
    })
  });
  
  app.on('activate', () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口 
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  createWindow()

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