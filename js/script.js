const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let page = 1;

async function searchImages() {
  const accesskey = "C3z5xjxhjYu71jBAF6lZRkpDYp0gYf5EKwwYbCj0ipE";
  const inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page == 1) {
      searchResults.innerHTML = "";
    }

    results.map((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("search-result");
      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description;
      const imagelink = document.createElement("a");
      imagelink.href = result.links.html;
      imagelink.target = "_blank";
      imagelink.textContent = result.alt_description;

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imagelink);
      searchResults.appendChild(imageWrapper);
    });

    page++;
    if (page > 1) {
      showMore.style.display = "block";
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch images from the Unsplash API.");
  }
}

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  page = 1;
  await searchImages();
});

showMore.addEventListener("click", async () => {
  await searchImages();
});
