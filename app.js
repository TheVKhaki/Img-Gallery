const key = "563492ad6f917000010000017e96fbd1428f42508891665795f321a5";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const searchForm = document.querySelector(".search-form");
let searchValue;
const more = document.querySelector(".more-button button");
let page = 1;
let fetchLink;
let currentSearch;
const bgHomeDiv = document.querySelector(".bg-home-div");
const bgHome = document.querySelector(".bg-home");

//Event Listeners
searchInput.addEventListener("input", updateInput);
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhoto(searchValue);
});
more.addEventListener("click", loadMore);

//UpdateInput
function updateInput(e) {
  searchValue = e.target.value;
}

//FETCH API
const fetchApi = async (url) => {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: key,
    },
  });
  const data = await dataFetch.json();
  return data;
};
//Generate Pictures
const generatePictures = (data) => {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
        <div class='itsimg'>
        <img src=${photo.src.large} ></img>
        <a href=${photo.photographer_url}>${photo.photographer}</a>
        <a href=${photo.src.original}><i class="fas fa-arrow-alt-circle-down"></i></a>
        </div> `;
    gallery.appendChild(galleryImg);
  });
};
//Curated Photos
const curatedPhotos = async () => {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);
  generatePictures(data);
};
//bg-home
const bgHomeFunc = async () => {
  fetchLink = "https://api.pexels.com/v1/search?query=sea&per_page=1";
  const data = await fetchApi(fetchLink);
  console.log(data.photos[0]);
  bgHomeDiv.innerHTML = `<img class='bg-home' src='${data.photos[0].src.landscape}' />
  <a href='${data.photos[0].photographer_url}'>Photo By ${data.photos[0].photographer} </a>`;
  // bgHome.setAttribute("src", `${data.photos[0].src.landscape}`);
};

//Search Photos
const searchPhoto = async (search) => {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${search}&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
};
const clear = () => {
  gallery.innerHTML = "";
  searchInput.value = "";
};
//Load More
async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}
bgHomeFunc();
curatedPhotos();
