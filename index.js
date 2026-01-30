"use strict";

console.log("hello");

const selectButton = document.querySelectorAll(".info-dot-button");
const selectBar = document.querySelectorAll(".hint");

selectButton.forEach((button) => {
  button.addEventListener("click", (event) => {
    const sidebar = button.nextElementSibling;
    event.stopPropagation();
    if (sidebar) {
      sidebar.classList.toggle("hidden");
    }
  });
});

document.addEventListener("click", () => {
  selectBar.forEach((bar) => {
    bar.classList.add("hidden");
  });
});

selectBar.forEach((bar) => {
  bar.addEventListener("click", (event) => event.stopPropagation());
});

const swiper = new Swiper(".products-swiper", {
  slidesPerView: 4,
  spaceBetween: 42,
  loop: true,
  freeMode: true,
  navigation: {
    nextEl: ".arrow-svg-sliser.right",
    prevEl: ".arrow-svg-sliser.left",
  },
  breakpoints: {
    320: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1200: { slidesPerView: 4 },
  },
});

const categoryButton = document.querySelectorAll(".choose-products");

categoryButton.forEach((button) => {
  button.addEventListener("click", (Event) => {
    const category = button.dataset.category;
    fetchDataFurnoture(category);
  });
});

async function fetchDataFurnoture(category) {
  const url = `https://api.pexels.com/v1/search?query=${category}&per_page=12`;
  const getData = await fetch(url);
  const data = await getData.json();
  console.log(data);
}
