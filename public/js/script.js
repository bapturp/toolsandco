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
// document.addEventListener("DOMContentLoaded", () => {
//   alert("app JS imported successfully!");
// });

// const api_url = "http://localhost:3000/"

// const searchForm = document.getElementById('search-form')
// searchForm.addEventListener("submit", async (event) => {
//   event.preventDefault()
//   const tooltypeSelect = document.querySelector('[name="tool_type"]')
//   const usecaseSelect = document.querySelector('[name="use_case"]')
//   const tooltypeSelectValue = tooltypeSelect.value
//   const usecaseSelectValue = usecaseSelect.value
//   const { data } = await axios({
//     method: "get",
//     baseURL: api_url + "search?tool_type=" + tooltypeSelectValue + "&use_case=" + usecaseSelectValue
//   })
//   console.log(data)
// })
