// **********************************
// load header and footer
// **********************************
async function loadHeaderFooter() {
    // const headerContent = await fetch('header.html').then(res => res.text());
    const footerContent = await fetch('footer.html').then(res => res.text());
    // document.getElementById('header').innerHTML = headerContent;
    document.getElementById('footer').innerHTML = footerContent;
}

loadHeaderFooter();





// **********************************
// Scroll and hamburger menu handling for header
// **********************************
const header = document.querySelector('.header');
const links = header.querySelectorAll('a');
const hamburgerIcon = document.getElementById('hamburger');
const mobileMenu = document.getElementById("mobileMenu");

// Function to update header styles based on scroll position
function updateHeaderStyles() {
    if (window.scrollY === 0 && mobileMenu.style.display !== "block") {
        header.style.backgroundColor = '#ffffff00'; // Transparent
        header.style.boxShadow = 'none'; // No shadow
        hamburgerIcon.style.color = '#fff';
        links.forEach(link => (link.style.color = '#fff')); // White links
    } else {
        header.style.backgroundColor = '#fff'; // White background
        header.style.boxShadow = '0px 11px 20px 6px #00000063'; // Shadow
        hamburgerIcon.style.color = '#000';
        links.forEach(link => (link.style.color = '#000')); // Black links
    }
}

// Function to toggle hamburger menu visibility
function hamburgerToggle() {
    if (mobileMenu.style.display === "block") {
        mobileMenu.style.display = "none";
    } else {
        mobileMenu.style.display = "block";
    }
    // Update header styles to handle the open/close state of the menu
    updateHeaderStyles();
}

// Attach the scroll event listener to update header on scroll
window.addEventListener('scroll', updateHeaderStyles);

// Call updateHeaderStyles on page load to set initial styles
updateHeaderStyles();











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


