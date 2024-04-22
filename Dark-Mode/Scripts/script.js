let toggle = document.getElementById('toggle') 
let body = document.getElementsByTagName('body')

toggle.addEventListener("click", () => {
  body[0].classList.toggle("dark-theme")
})