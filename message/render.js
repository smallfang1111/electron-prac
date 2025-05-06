window.addEventListener('DOMContentLoaded', () => {
    const oBtn1=document.getElementById('btn')
    oBtn1.onclick=()=>{
        window.electronAPI.showMessge()
    }
})