let pianoContainer = document.getElementsByClassName("piano-container");
const base = "./audio/";
window.onload = () => {
  for (let index = 1; index <= 24; index++) {
    let div = document.createElement("div");
    div.classList.add("key", index <= 10 ? "black-key" : "white-key");
    // for playing on audio onclick
    const number = index <= 9 ? "0" + index : index;
    div.addEventListener("click", () => {
      new Audio(`${base}key${number}.mp3`).play();
    });
    div.addEventListener("keydown", (e) => {
      new Audio(`${base} key ${e.keyCode == "enter"} ${number}.mp3`).play()
    })
    pianoContainer[0].appendChild(div);
  }
};
