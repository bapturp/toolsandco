const addToCartBtns = document.querySelectorAll(".add-to-cart");
const navBar = document.querySelector("nav");

// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", (event) => {
  console.log("app JS imported successfully!");
});

addToCartBtns.forEach((addToCartBtn) => {
  addToCartBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    const cartQuantity = document.getElementById("cart-quantity");
    const route = event.target.closest("form").action;
    const { data } = await axios.get(route);
    cartQuantity.textContent = data.length;
  });
});

const startCalendar = document.querySelector("#start_date")
const endCalendar = document.querySelector("#end_date")
var today = new Date().toISOString().split('T')[0];
startCalendar.setAttribute('min', today);

startCalendar.addEventListener('change', () => {
  const selectedStartDate = startCalendar.value
  endCalendar.setAttribute('min', selectedStartDate)
})
