window.addEventListener('DOMContentLoaded', () => {
    const oBtn1=document.getElementById('btn')
    oBtn1.onclick=()=>{
        window.electronAPI.showMessge()
    }
   

    // const oBtn2=document.getElementById('openFloder')
    // oBtn2.onclick=()=>{
    //     window.electronAPI.showFolder()
    // }

    
})