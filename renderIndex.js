

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('contextmenu',(ev)=>{
ev.preventDefault()
window.electronAPI.popupMenu()
  },false)

})