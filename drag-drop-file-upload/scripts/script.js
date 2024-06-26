let uploadButton = document.getElementById('upload-button');
let choseImage = document.getElementById('chose-image')
let fileName = document.getElementById('file-name')
let container = document.querySelector('.container')
let error = document.getElementById('error')
let imageDisplay = document.getElementById('image-display')

let fileHandler = (file, name, type) => {
  if (type.split('/')[0] !== "image") {
    // file type error
    error.innerText = 'please upload an image file'
    return false
  }
  error.innerText = ''
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = () => {
    //image and file name
    let imageContainer = document.createElement('figure')
    let img = document.createElement('img')
    img.src = reader.result
    imageContainer.appendChild(img)
    imageContainer.innerHTML += `<figcaption>${name}</figcaption>`;
    imageDisplay.appendChild(imageContainer)
  }
}

// Upload Button
uploadButton.addEventListener('change', () => {
  imageDisplay.innerHTML = ''
  Array.from(uploadButton.files).forEach((file) => {
    fileHandler(file, file.name, file.type)
  })
})

container.addEventListener('dragenter', (e) => {
  e.preventDefault()
  e.stopPropagation()
  container.classList.add('active')
}, false)

container.addEventListener('dragleave', (e) => {
  e.preventDefault()
  e.stopPropagation()
  container.classList.add('active')
}, false)

container.addEventListener("dragover", (e) => {
  e.preventDefault()
  e.stopPropagation()
  container.classList.add('active')
}, false)

container.addEventListener('drop', (e)=> {
  e.preventDefault()
  e.stopPropagation()
  container.classList.add('active')
  let draggedData = e.dataTransfer
  let files = draggedData.files
  imageDisplay.innerHTML = ""
  Array.from(files).forEach((file) => {
    fileHandler(file, file.name, file.type)
  })
}, false)

window.onload = () => {
  error.innerHTML = ''
}