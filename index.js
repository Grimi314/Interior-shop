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
