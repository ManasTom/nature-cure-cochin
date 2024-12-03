
document.addEventListener("DOMContentLoaded", function () {
    const treatmentsSec = document.querySelector(".treatments_sec");
    const jsonFilePath = "database/treatments/treatments.json";

    // Function to load and display treatments dynamically
    async function loadTreatments() {
        try {
            const response = await fetch(jsonFilePath);
            if (!response.ok) throw new Error("Failed to fetch treatments data.");

            const treatmentsData = await response.json();
            createTreatmentCards(treatmentsData);
        } catch (error) {
            treatmentsSec.innerHTML = `<p>Error loading treatments: ${error.message}</p>`;
        }
    }

    // Function to create cards for each treatment
    function createTreatmentCards(data) {
        treatmentsSec.innerHTML = ""; // Clear any existing content

        const gridContainer = document.createElement("div");
        gridContainer.classList.add("treatment-cards-grid");

        data.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("treatment-card");

            card.innerHTML = `
        <div class="treatment-image-container">
            <img src="database/treatments/${item.image}" alt="${item.title}" class="treatment-image">
        </div>
        <h3 class="treatment-title">${item.title}</h3>
        <p class="treatment-description">${item.description}</p>
        <h5><a href="contact.html#contact_form">Learn more</a></h5>
    `;

            gridContainer.appendChild(card);
        });

        treatmentsSec.appendChild(gridContainer);
    }

    // Load the treatments data on page load
    loadTreatments();
});

