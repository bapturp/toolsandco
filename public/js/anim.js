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
        setTimeout(typeWriter, 50)
    } else {
        let counter = 0
        const interval = setInterval(() => {
            whatsThePlan.classList.toggle('d-none')
            counter++
            if (counter > 3) { clearInterval(interval) }
        }, 250);
    }
}