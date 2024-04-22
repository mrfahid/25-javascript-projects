const accessKey = 'LGkl9Qcn-NFeP2VFaEAHZWs6XnpWtVN-4dIoivnfR00'; // Replace with your actual Unsplash Access Key

async function fetchImages(query) {
  try {
      const response = await fetch(`https://api.unsplash.com/photos/random?query=${query}&client_id=${accessKey}`);
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Fetched data:', data);
      return data;
  } catch (error) {
      console.error('Error fetching data:', error);
      return [];
  }
}

function showTheCard(arr) {
    let clutter = ''
    arr.forEach((obj) => {
        clutter += `<div class="box">
            <img class="cursor-pointer" src=${obj.image} alt="${obj.name}">
            <div class="caption">${obj.name}</div>
        </div>`;
    });

    document.querySelector('.container').innerHTML = clutter
}

async function handleSearchFunctionality() {
    const input = document.getElementById('searchinput')

    input.addEventListener('input', async () => {
        const searchValue = input.value.trim().toLowerCase();
        const filteredArray = await fetchImages(searchValue);
        showTheCard([filteredArray]);
    });

    input.addEventListener('focus', () => {
        document.querySelector('.overlay').style.display = "block"
    })

    input.addEventListener('blur', () => {
        document.querySelector('.overlay').style.display = "none"
    })

    input.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            const searchValue = input.value.trim().toLowerCase();
            const filteredArray = await fetchImages(searchValue);
            document.querySelector('.overlay').style.display = "none"
            showTheCard([filteredArray]);
        }
    });
}

handleSearchFunctionality();
