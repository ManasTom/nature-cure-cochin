document.addEventListener("DOMContentLoaded", () => {
    fetch("database/site/siteSettings.json")
        .then((response) => {
            if (!response.ok) throw new Error("Failed to load site settings");
            return response.json();
        })
        .then((data) => {
            // Populate Address
            document.getElementById("footer-address").textContent = data.address;

            // Populate Email
            const emailElement = document.getElementById("footer-email");
            emailElement.textContent = data.email;
            emailElement.href = `mailto:${data.email}`;

            // Populate Primary Phone
            const phone1Element = document.getElementById("footer-phone-1");
            phone1Element.textContent = data.phone_1;
            phone1Element.href = `tel:${data.phone_1}`;

            // Populate Alternate Phone
            const phone2Element = document.getElementById("footer-phone-2");
            if (data.phone_2) {
                phone2Element.textContent = data.phone_2;
                phone2Element.href = `tel:${data.phone_2}`;
            } else {
                phone2Element.style.display = "none"; // Hide if no alternate phone
            }
        })
        .catch((error) => console.error("Error loading site settings:", error));
});
