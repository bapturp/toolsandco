const addToCartBtns = document.querySelectorAll(".add-to-cart");
const navBar = document.querySelector("nav");

// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("app JS imported successfully!");
});

addToCartBtns.forEach((addToCartBtn) => {
  addToCartBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    console.log(addToCartBtn.innerHTML);
    const route = event.target.closest("form").action;
    console.log(route);
    const { data } = await axios.get(route);
    console.log("=======", data);
  });
});
