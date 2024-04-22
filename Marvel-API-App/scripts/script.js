let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");

let publicKey = "8f65e8587b782324af027da5afbed01e";
let privateKey = "769a9580c5d7156e4817f1646ac27b0c6c2bbd04";
let timestamp = Date.now().toString();
let hashValue = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();

function displayWords(value) {
  input.value = value;
  removeElements();
}

function removeElements() {
  listContainer.innerHTML = "";
}

input.addEventListener("keyup", async () => {
  removeElements();
  if (input.value.length < 4) {
    return false;
  }

  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hashValue}&nameStartsWith=${input.value}`;

  const response = await fetch(url);
  const jsonData = await response.json();

  if (jsonData.data && jsonData.data.results) {
    jsonData.data.results.forEach((result) => {
      let name = result.name;
      let div = document.createElement("div");
      div.style.cursor = "pointer";
      div.classList.add("autocomplete-items");
      div.setAttribute("onclick", "displayWords('" + name + "')");
      let word = "<b>" + name.substr(0, input.value.length) + "</b>";
      word += name.substr(input.value.length);
      div.innerHTML = `<p class="item">${word}</p>`;
      listContainer.appendChild(div);
    });
  }
});

button.addEventListener("click", async () => {
  if (input.value.trim().length < 1) {
    alert("Input cannot be blank");
    return;
  }

  showContainer.innerHTML = "";
  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hashValue}&name=${input.value}`;

  const response = await fetch(url);
  const jsonData = await response.json();

  if (jsonData.data && jsonData.data.results) {
    jsonData.data.results.forEach((element) => {
      let characterElement = document.createElement("div");
      characterElement.classList.add("card-container");
      characterElement.innerHTML = `
        <div class="container-character-image">
          <img src="${element.thumbnail.path}.${element.thumbnail.extension}" />
        </div>
        <div class="character-name">${element.name}</div>
        <div class="character-description">${element.description}</div>
      `;
      showContainer.appendChild(characterElement);
    });
  }
});

window.onload = () => {
  button.click(); // Automatically trigger the button click on page load
};
