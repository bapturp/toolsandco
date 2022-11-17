const addToCartBtns = document.querySelectorAll(".add-to-cart");
const navBar = document.querySelector("nav");

// Add to cart button
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
if (startCalendar) {
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
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// Handles profile menu dropdown
const profileBtn = document.querySelector("#btn-profile")
if (profileBtn) {
  profileBtn.addEventListener('click', () => {
    document.querySelector("#profile-dropdown").classList.toggle('d-none')
  })
}

// Show add tool form on admin 
const addToolBtn = document.querySelector("#add-tool-btn")
if (addToolBtn) {
  addToolBtn.addEventListener('click', () => {
    document.querySelector(".add-tool").classList.toggle('d-none')
  })
}

// Couper l'affichage des dates (!!! crado)
const trimDate = document.querySelectorAll(".trim-date")
if (trimDate) {
  trimDate.forEach((date) => {
    const trimmed = date.textContent
    date.textContent = trimmed.substring(0, 15)
  })
}

// Slide in effect on page load for menu
const nav = document.querySelector(".reg-nav")
if (nav) {
  window.addEventListener('load', () => {
    nav.classList.add('slide-from-top')

  })
}

// Type effect of "What's the plan"
let whatsThePlan = document.getElementById("whats-the-plan")
if (whatsThePlan) {
  window.addEventListener('load', () => {
    typeWriter()
  })
}

let i = 0;
function typeWriter() {
  let txt = "What's the plan?";

  if (i < txt.length) {
    whatsThePlan.innerHTML += txt.charAt(i)
    i++
    setTimeout(typeWriter, 30)
  } else {
    let counter = 0
    const interval = setInterval(() => {
      whatsThePlan.classList.toggle('d-none')
      counter++
      if (counter > 3) { clearInterval(interval) }
    }, 200);

  }

}


