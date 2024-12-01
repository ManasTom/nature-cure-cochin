
document.addEventListener("DOMContentLoaded", function () {
    const treatmentsTableDiv = document.querySelector(".treatments_table");
    const form = document.querySelector("form");
    const treatmentTitleInput = document.getElementById("treatmentTitle");
    const treatmentDescriptionInput = document.getElementById("treatmentDescription");
    const treatmentImageInput = document.getElementById("treatmentImage");
    const currentImageNameDisplay = document.getElementById("currentImageName");
    const saveButton = document.getElementById("saveButton");

    const jsonFilePath = "database/treatments/treatments.json";
    let currentEditIndex = null;
    let currentImageName = null;

    async function loadTreatments() {
        try {
            const response = await fetch(jsonFilePath);
            if (!response.ok) throw new Error("Failed to fetch treatments data.");

            const treatmentsData = await response.json();
            createTable(treatmentsData);
        } catch (error) {
            treatmentsTableDiv.innerHTML = `<p>Error loading treatments: ${error.message}</p>`;
        }
    }

    function createTable(data) {
        const table = document.createElement("table");
        table.innerHTML = `
            <thead>
                <tr>
                    <th>SI No</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
        `;

        const tbody = document.createElement("tbody");

        data.forEach((item, index) => {
            const row = document.createElement("tr");

            // SI No
            const siNoCell = document.createElement("td");
            siNoCell.textContent = index + 1;
            row.appendChild(siNoCell);

            // Title
            const titleCell = document.createElement("td");
            titleCell.textContent = item.title;
            row.appendChild(titleCell);

            // Description with Expand/Collapse
            const descriptionCell = document.createElement("td");
            const shortDescription = item.description.slice(0, 50);
            const isExpandable = item.description.length > 50;

            const descriptionText = document.createElement("span");
            descriptionText.textContent = shortDescription;
            descriptionCell.appendChild(descriptionText);

            if (isExpandable) {
                const ellipsis = document.createElement("span");
                ellipsis.textContent = "... ";
                descriptionCell.appendChild(ellipsis);

                const toggleButton = document.createElement("button");
                toggleButton.textContent = "Expand";
                toggleButton.style.border = "none";
                toggleButton.style.background = "none";
                toggleButton.style.color = "blue";
                toggleButton.style.cursor = "pointer";
                toggleButton.style.padding = "0";
                toggleButton.style.margin = "0";
                toggleButton.style.textDecoration = "underline";

                toggleButton.addEventListener("click", () => {
                    const isExpanded = toggleButton.textContent === "Collapse";
                    descriptionText.textContent = isExpanded
                        ? shortDescription
                        : item.description;
                    ellipsis.style.display = isExpanded ? "inline" : "none";
                    toggleButton.textContent = isExpanded ? "Expand" : "Collapse";
                });

                descriptionCell.appendChild(toggleButton);
            }

            row.appendChild(descriptionCell);

            // Image
            const imageCell = document.createElement("td");
            const img = document.createElement("img");
            img.src = `database/treatments/${item.image}`;
            img.alt = item.title;
            img.style.width = "50px";
            img.style.height = "50px";
            imageCell.appendChild(img);
            row.appendChild(imageCell);

            // Actions
            const actionsCell = document.createElement("td");

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add("editButton");
            editButton.dataset.index = index;
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("deleteButton");
            deleteButton.dataset.index = index;
            actionsCell.appendChild(deleteButton);

            row.appendChild(actionsCell);
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        treatmentsTableDiv.innerHTML = "";
        treatmentsTableDiv.appendChild(table);

        // Attach event listeners for actions
        document.querySelectorAll(".editButton").forEach(button =>
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                loadForEdit(data[index], index);
            })
        );

        document.querySelectorAll(".deleteButton").forEach(button =>
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                deleteTreatment(index, data[index].image);
            })
        );
    }

    function loadForEdit(item, index) {
        currentEditIndex = index;
        treatmentTitleInput.value = item.title;
        treatmentDescriptionInput.value = item.description;
        currentImageName = item.image;
        currentImageNameDisplay.textContent = `Current Image: ${item.image}`;
        form.scrollIntoView({ behavior: "smooth" });
    }

    async function deleteTreatment(index, imageName) {
        try {
            const response = await fetch("deleteTreatment.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ index, imageName }),
            });

            if (!response.ok) throw new Error("Failed to delete treatment.");
            alert("Treatment deleted successfully!");
            loadTreatments();
        } catch (error) {
            alert(`Error deleting treatment: ${error.message}`);
        }
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const title = treatmentTitleInput.value.trim();
        const description = treatmentDescriptionInput.value.trim();
        const image = treatmentImageInput.files[0];

        if (!title || !description || (currentEditIndex === null && !image)) {
            alert("All fields are required.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        if (image) formData.append("image", image);
        if (currentEditIndex !== null) formData.append("index", currentEditIndex);
        if (currentImageName) formData.append("currentImage", currentImageName);

        try {
            const response = await fetch("treatments.php", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to save treatment.");
            alert("Treatment saved successfully!");
            currentEditIndex = null;
            currentImageName = null;
            currentImageNameDisplay.textContent = "";
            form.reset();
            loadTreatments();
        } catch (error) {
            alert(`Error saving treatment: ${error.message}`);
        }
    });

    loadTreatments();
});
