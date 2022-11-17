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
            whatsThePlan.classList.toggle('opacity-0')
            counter++
            if (counter > 3) { clearInterval(interval) }
        }, 250);
    }
}


// About section & top images animations
const isHome = document.querySelector('.homepage')
if (isHome) {
    const darkBox = document.querySelector('#darkbluebox')
    const turquoiseBox = document.querySelector('#turquoisebox')
    const imgAbout = document.querySelector(".illu img")
    window.addEventListener('scroll', () => {
        const about = document.querySelector('.about');
        const aboutPosition = about.getBoundingClientRect();
        // checking for partial visibility
        if (aboutPosition.top < window.innerHeight && aboutPosition.bottom >= 0) {
            turquoiseBox.classList.add('arrived')
            darkBox.classList.add('arrived')
            imgAbout.classList.add('arrived')
        } else {
            turquoiseBox.classList.remove('arrived')
            darkBox.classList.remove('arrived')
            imgAbout.classList.remove('arrived')
        }
    })
}

// Fake lazy load on products
const tools = document.querySelectorAll('.tool-card')
if (tools) {

    window.addEventListener('load', appear)
    window.addEventListener('scroll', appear)

    function appear() {
        tools.forEach((tool) => {
            const toolPos = tool.getBoundingClientRect()
            console.log(toolPos)
            if (toolPos.top < window.innerHeight && toolPos.bottom >= 0) {
                tool.classList.add("opaque")
            }
        })
    }
}