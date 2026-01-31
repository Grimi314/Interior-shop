"use strict";

console.log("hello");

const selectButton = document.querySelectorAll(".info-dot-button");
const selectBar = document.querySelectorAll(".hint");
const swiperWrapper = document.querySelector(".swiper-wrapper");

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
  selectBar.forEach((bar) => bar.classList.add("hidden"));
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
    319: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    500: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});

const categoryButton = document.querySelectorAll(".choose-products");

categoryButton.forEach((button) => {
  button.addEventListener("click", async () => {
    const category = button.dataset.category;
    try {
      const cards = await fetchDataFurniture(category);
      showCard(cards, category);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });
});

async function fetchDataFurniture(category) {
  const url = `https://api.pexels.com/v1/search?query=${category}&per_page=12`;
  const response = await fetch(url, {
    headers: {
      Authorization: "HXvKfPYK3xsNI7PRMm7TPvg0KVuhcWemuQ0nTsw1cFdjn4PcFaJ29QQg",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = await response.json();
  return data.photos;
}

function showCard(cards, category) {
  swiperWrapper.innerHTML = "";

  const murkup = cards
    .map(
      (card) => `
    <div class="praduct-card swiper-slide">
      <a href="#product-page" class="product-link"></a>
      <div class="div-image">
        <img class="img-section-product" src="${card.src.landscape}" alt="${card.alt}">
      </div>
      <div class="div-description">
        <p class="card-text">${category}</p>
        <h3 class="product-name">${card.alt}</h3>
        <div class="stars-container">
          <svg class="arrow-svg" width="18" height="18"><use href="./images/icons.svg#icon-Star-1"></use></svg>
          <svg class="arrow-svg" width="18" height="18"><use href="./images/icons.svg#icon-Star-1"></use></svg>
          <svg class="arrow-svg" width="18" height="18"><use href="./images/icons.svg#icon-Star-1"></use></svg>
          <svg class="arrow-svg" width="18" height="18"><use href="./images/icons.svg#icon-Star-1"></use></svg>
          <svg class="arrow-svg" width="18" height="18"><use href="./images/icons.svg#icon-Star-1"></use></svg>
        </div>
        <div class="wrapper-card-prise-button">
          <p class="prise"><span class="currency">$</span>${Math.floor(card.id / 10000)}</p>
          <button class="button-card-plus">
            <svg class="button-plus" width="24" height="24">
              <use href="./images/icons.svg#icon-bx_bx-plus"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");

  swiperWrapper.insertAdjacentHTML("afterbegin", murkup);

  swiper.update();
}

const openMobileButtom = document.querySelector(".open-mobile-menu");
const closeMobileButtom = document.querySelector(".close-mobile-menu");
const containerMobileMenu = document.querySelector(".container-mobile-menu");

openMobileButtom.addEventListener("click", () => {
  containerMobileMenu.classList.remove("hidden");
});

closeMobileButtom.addEventListener("click", () => {
  containerMobileMenu.classList.add("hidden");
});
