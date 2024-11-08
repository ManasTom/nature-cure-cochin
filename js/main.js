// **********************************
// scroll-color handling for header
// **********************************
const header = document.querySelector('.header');
const links = header.querySelectorAll('a');

window.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
        header.style.backgroundColor = '#ffffff00'; // Transparent
        links.forEach(link => (link.style.color = '#fff')); // White links
    } else {
        header.style.backgroundColor = '#fff'; // White background
        links.forEach(link => (link.style.color = '#000')); // Black links
    }
});




// **********************************
// hamburger MENU FOR MOBILE VIEW
// **********************************
function hamburgerToggle() {
    var menu = document.getElementById("mobileMenu");
    var header = document.getElementById("header");
    var hamburger = document.getElementById("hamburger");

    if (menu.style.display === "block") {
        menu.style.display = "none";
        header.style.backgroundColor = "#00000000";
        hamburger.style.color = "#fff";
    } else {
        menu.style.display = "block";
        header.style.backgroundColor = "#fff";
        hamburger.style.color = "#000";

    }
}











document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter_card h4");
    const speed = 200; // Adjust this value to control the animation speed

    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute("data-target");
                const increment = target / speed;

                const updateCounter = () => {
                    const currentValue = +counter.textContent;
                    if (currentValue < target) {
                        counter.textContent = Math.ceil(currentValue + increment);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target; // Ensure it stops at the target
                    }
                };

                updateCounter();
                observer.unobserve(counter); // Stop observing after animation
            }
        });
    };

    const observer = new IntersectionObserver(animateCounters, {
        threshold: 0.5, // Adjust the visibility threshold as needed
    });

    counters.forEach(counter => observer.observe(counter));
});


