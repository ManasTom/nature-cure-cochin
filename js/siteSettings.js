
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const addressInput = document.getElementById("address");
    const emailInput = document.getElementById("email");
    const phone1Input = document.getElementById("phone_1");
    const phone2Input = document.getElementById("phone_2");
    const workingTimeInput = document.getElementById("workingTime");

    const jsonFilePath = "database/site/siteSettings.json";

    // Function to load site settings from JSON file
    async function loadSiteSettings() {
        try {
            const response = await fetch(jsonFilePath);
            if (!response.ok) throw new Error("Failed to load site settings.");

            const data = await response.json();

            // Preload the form fields with the data from the JSON file
            addressInput.value = data.address || "";
            emailInput.value = data.email || "";
            phone1Input.value = data.phone_1 || "";
            phone2Input.value = data.phone_2 || "";
            workingTimeInput.value = data.workingTime || "";
        } catch (error) {
            console.error("Error loading site settings:", error.message);
        }
    }

    // Load the site settings on page load
    loadSiteSettings();
});

