window.addEventListener('DOMContentLoaded', () => {
    // const oBtn1=document.getElementById('openUrl')
    // oBtn1.onclick=(ev)=>{
    //     ev.preventDefault()
    //    const urlPath=  oBtn1.getAttribute('href')
    //     window.electronAPI.openExternalShell(urlPath)
    // }

    // const oBtn2=document.getElementById('openFloder')
    // oBtn2.onclick=()=>{
    //     window.electronAPI.showFolder()
    // }

    window.electronAPI.openUrl(()=>{
        let iframe=document.getElementById('webView')
        iframe.src='https://zh.wikipedia.org/wiki/123'
    })
})