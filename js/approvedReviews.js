
document.addEventListener("DOMContentLoaded", function () {
    const approvedReviewsDiv = document.querySelector(".approved_reviews_table");
    const approvedReviewsFilePath = "database/reviews/approvedReviews.json";

    // Load the approved reviews and create the table
    async function loadApprovedReviews() {
        try {
            const response = await fetch(approvedReviewsFilePath);
            if (!response.ok) throw new Error("Failed to fetch approved reviews data.");

            const approvedReviews = await response.json();
            createApprovedReviewsTable(approvedReviews);
        } catch (error) {
            approvedReviewsDiv.innerHTML = `<p>Error loading approved reviews: ${error.message}</p>`;
        }
    }

    function createApprovedReviewsTable(data) {
        // Create the table structure
        const table = document.createElement("table");
        table.innerHTML = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Review</th>
                <th>Actions</th>
            </tr>
        </thead>
    `;

        const tbody = document.createElement("tbody");

        data.forEach((item, index) => {
            const row = document.createElement("tr");

            // Name column
            const nameCell = document.createElement("td");
            nameCell.textContent = item.name;
            row.appendChild(nameCell);

            // Email column
            const emailCell = document.createElement("td");
            emailCell.textContent = item.email;
            row.appendChild(emailCell);

            // Review column
            const reviewCell = document.createElement("td");
            reviewCell.textContent = item.review;
            row.appendChild(reviewCell);

            // Actions column
            const actionsCell = document.createElement("td");

            // Delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "deleteButton";
            deleteButton.dataset.index = index;
            deleteButton.addEventListener("click", () => deleteApprovedReview(index));
            actionsCell.appendChild(deleteButton);

            row.appendChild(actionsCell);
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        approvedReviewsDiv.innerHTML = ""; // Clear any existing content
        approvedReviewsDiv.appendChild(table);
    }

    // Delete an approved review
    async function deleteApprovedReview(index) {
        try {
            const response = await fetch("deleteApprovedReview.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ index }),
            });

            if (!response.ok) throw new Error("Failed to delete review.");
            alert("Review deleted successfully!");
            loadApprovedReviews();
        } catch (error) {
            alert(`Error deleting review: ${error.message}`);
        }
    }

    loadApprovedReviews();
});
