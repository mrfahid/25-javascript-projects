let api_key = "IXziX4I5EdugziYW4RXqewUYULdElj58";
let submitBtn = document.getElementById("submit-btn");

let generateGif = () => {
  let loader = document.querySelector(".loader");
  loader.style.display = "block";
  document.querySelector(".wrapper").style.display = "none";

  let q = document.getElementById("search-box").value;
  let gifCount = 10;
  let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;

  fetch(finalURL)
    .then((response) => response.json())
    .then((info) => {
      let gifsData = info.data;
      gifsData.forEach((gif) => {
        let container = document.createElement("div");
        container.classList.add("container");
        let img = document.createElement("img");
        img.src = gif.images.fixed_height.url; 
        container.append(img);

        let copyBtn = document.createElement("button");
        copyBtn.innerText = "Copy Link";
        copyBtn.onclick = () => {
          let copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;
          navigator.clipboard.writeText(copyLink)
            .then(() => alert("GIF link copied to clipboard"))
            .catch(() => {
              let tempInput = document.createElement("input");
              tempInput.setAttribute("type", "text");
              document.body.appendChild(tempInput);
              tempInput.value = copyLink;
              tempInput.select();
              document.execCommand("copy");
              document.body.removeChild(tempInput);
              alert("GIF link copied to clipboard");
            });
        };
        container.append(copyBtn);
        document.querySelector(".wrapper").append(container);
      });

      loader.style.display = "none";
      document.querySelector(".wrapper").style.display = "grid";
    })
    .catch((error) => {
      console.error("Error fetching GIFs:", error);
      loader.style.display = "none"; 
    });
};

submitBtn.addEventListener('click', generateGif);
