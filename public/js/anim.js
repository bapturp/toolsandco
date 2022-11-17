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


// About section animation
const darkBox = document.querySelector('#darkbluebox')
const turquoiseBox = document.querySelector('#turquoisebox')
if (darkBox) {
    window.addEventListener('scroll', () => {
        var element = document.querySelector('.about');
        var position = element.getBoundingClientRect();

        // checking whether fully visible
        if (position.top >= 0 && position.bottom <= window.innerHeight) {
            darkBox.classList.add('arrived')
        }

        // checking for partial visibility
        if (position.top < window.innerHeight && position.bottom >= 0) {
            darkBox.classList.remove('arrived')
        }
    })
}

// Fake lazy load on products