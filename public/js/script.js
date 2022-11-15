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

// Handles calendar default dates and forbidden dates
const startCalendar = document.querySelector("#start_date")
const endCalendar = document.querySelector("#end_date")
var today = new Date().toISOString().split('T')[0];
const todayPlusTwo = addDays(Date(), 2).toISOString().split('T')[0];

startCalendar.setAttribute('min', today);
startCalendar.setAttribute('value', today)
endCalendar.setAttribute('value', todayPlusTwo)

startCalendar.addEventListener('change', () => {
  const selectedStartDate = startCalendar.value
  const selectedStartDateBla = new Date(selectedStartDate)
  const inTwoDays = addDays(selectedStartDateBla, 2).toISOString().split('T')[0];
  endCalendar.setAttribute('min', inTwoDays)
  endCalendar.setAttribute('value', inTwoDays)
  endCalendar.showPicker()
})

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// Handles profile menu dropdown
document.querySelector("#btn-profile").addEventListener('click', () => {
  document.querySelector("#profile-dropdown").classList.toggle('d-none')
})
