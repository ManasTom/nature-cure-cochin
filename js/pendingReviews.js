
document.addEventListener("DOMContentLoaded", function () {
    const pendingReviewsDiv = document.querySelector(".pending_reviews_table");
    const pendingReviewsFilePath = "database/reviews/pendingReviews.json";

    // Load the pending reviews and create the table
    async function loadPendingReviews() {
        try {
            const response = await fetch(pendingReviewsFilePath);
            if (!response.ok) throw new Error("Failed to fetch pending reviews data.");

            const pendingReviews = await response.json();
            createPendingReviewsTable(pendingReviews);
        } catch (error) {
            pendingReviewsDiv.innerHTML = `<p>Error loading reviews: ${error.message}</p>`;
        }
    }

    function createPendingReviewsTable(data) {
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

            // Approve button
            const approveButton = document.createElement("button");
            approveButton.textContent = "Approve";
            approveButton.className = "editButton"
            approveButton.style.marginRight = "5px";
            approveButton.dataset.index = index;
            approveButton.addEventListener("click", () => approveReview(index));
            actionsCell.appendChild(approveButton);

            // Delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "deleteButton";
            deleteButton.dataset.index = index;
            deleteButton.addEventListener("click", () => deleteReview(index));
            actionsCell.appendChild(deleteButton);

            row.appendChild(actionsCell);
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        pendingReviewsDiv.innerHTML = ""; // Clear any existing content
        pendingReviewsDiv.appendChild(table);
    }

    // Approve a review
    async function approveReview(index) {
        try {
            const response = await fetch("approveReview.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ index }),
            });

            if (!response.ok) throw new Error("Failed to approve the review.");
            alert("Review approved successfully!");
            loadPendingReviews();
        } catch (error) {
            alert(`Error approving review: ${error.message}`);
        }
    }

    // Delete a review
    async function deleteReview(index) {
        try {
            const response = await fetch("deleteReview.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ index }),
            });

            if (!response.ok) throw new Error("Failed to delete the review.");
            alert("Review deleted successfully!");
            loadPendingReviews();
        } catch (error) {
            alert(`Error deleting review: ${error.message}`);
        }
    }

    loadPendingReviews();
});
