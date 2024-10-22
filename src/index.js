const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";
const dogImageContainer = document.getElementById("dog-image-container");
const dogBreeds = document.getElementById("dog-breeds");
const dropdown = document.getElementById("breed-dropdown");


function fetchAndAppendDogs() {
  fetch(imgUrl)
    .then((response) => response.json())
    .then((dogs) => {
      dogs.message.forEach((dog) => {
        const image = document.createElement("img");
        image.src = dog;
        dogImageContainer.appendChild(image);
      });
    });
}

fetchAndAppendDogs();

function fetchBreeds() {
  fetch(breedUrl)
    .then((res) => res.json())
    .then((breeds) => {
      const data = Object.keys(breeds.message);
      appendBreed(data);
    });
}

function appendBreed(data) {
  dogBreeds.innerHTML = "";
  data.forEach((breed) => {
    const li = document.createElement("li");
    li.textContent = breed;
    dogBreeds.appendChild(li);
li.addEventListener("click", (e) => {
      e.target.style.color = "blue";
    });
  });
}

fetchBreeds();

dropdown.addEventListener("change", (e) => {
  fetch(breedUrl)
    .then((res) => res.json())
    .then((breeds) => {
      const data = Object.keys(breeds.message);
      const filteredData = data.filter((breed) =>
        breed.startsWith(e.target.value)
      );
      appendBreed(filteredData);
    });
});