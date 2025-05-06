window.onload=()=>{
    const oBtn=document.getElementById('btn')
    oBtn.onclick=()=>{
        window.electronAPI.openDialogFun()
    }

    const errorBtn=document.getElementById('btnError')
    errorBtn.onclick=()=>{
        window.electronAPI.getErrorFile()
    }
}