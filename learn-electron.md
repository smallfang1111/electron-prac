# electron 包含 chromium（es6,es7,html,css） + Node.js(I/O操作) + Native apis (操作系统进行交互) electron 能够制作一个运行在不同桌面应用的一款软件

# Electron 集成了chromium 与 Node.js

# electron 多进程模型 

# 技术架构
## Chromium：支持最新特性的浏览器 支持 es6,es7,html,css
## Node.js：JavaScript运行时，可实现文件读写，本地命令的调用和执行操作等
## Native Apis：提供统一的原生界面能力

# electron 工作流程

# 渲染进程各自运行在自己的沙箱环境当中，但由于各自渲染进程之间需要交互，因此electron 内部提供了ipc（包含ipcMain和ipcRenderer）--进程间相互通信  使用IPC在主进程和渲染进程之间发送序列化的JSON消息

# 主进程
## 可以看做是package.json 中 main 属性对应的文件
## 一个应用只会有一个主进程
## 主进程在Node.js 环境中运行，意味着他能够使用require 模块并使用所有Node.js API
## 只有主进程可以进行GUI(图形用户界面)的API操作
## 主进程的主要目的是使用BrowserWindow 模块创建和管理应用程序




# 渲染器进程
## 每个electron 应用都会为每个打开的BrowerWindow（与每个网页嵌入）生成一个单独的渲染器进程。
## windows 中展示的界面通过渲染器进程渲染
## 一个应用可以有多个渲染进程
## 因此，一个浏览器窗口的所有的用户界面和应用功能，都应该是在网页开发上使用相同的工具和规范来写（如html，css，js，vue，react）----因此这也意味着渲染器无权直接访问require或其他Node.js API.

# electron 生命周期
## ready:app 初始化完成
## window-all-closed：当所有窗口都被关闭时触发
## before-quit：再关闭窗口之前触发。调用 event.preventDefault() 将阻止终止应用程序的默认行为。
## will-quit：当所有窗口被关闭后触发，并且应用程序将退出
## quit：当所有窗口被关闭时触发
