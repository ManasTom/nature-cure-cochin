document.addEventListener("DOMContentLoaded", () => {
    // Fetch the site settings JSON
    fetch("database/site/siteSettings.json")
        .then((response) => {
            if (!response.ok) throw new Error("Failed to load site settings");
            return response.json();
        })
        .then((data) => {
            // Populate Address
            document.getElementById("contact-address").textContent = data.address;

            // Populate Phone
            const phone1Element = document.getElementById("contact-phone-1");
            phone1Element.textContent = data.phone_1;
            phone1Element.href = `tel:${data.phone_1}`;

            // Populate Email
            const emailElement = document.getElementById("contact-email");
            emailElement.textContent = data.email;
            emailElement.href = `mailto:${data.email}`;

            // Populate Working Time
            document.getElementById("contact-working-time").textContent = data.workingTime;
        })
        .catch((error) => console.error("Error loading site settings:", error));
});
