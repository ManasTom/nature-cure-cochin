
document.addEventListener("DOMContentLoaded", function () {
    const reviewsSlideshow = document.querySelector(".reviews_slideshow");
    const jsonFilePath = "database/reviews/approvedReviews.json";

    async function loadReviews() {
        try {
            const response = await fetch(jsonFilePath);
            if (!response.ok) throw new Error("Failed to fetch reviews data.");

            const reviewsData = await response.json();
            const sortedReviews = reviewsData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            const latestReviews = sortedReviews.slice(0, 5); // Get the latest 5 reviews
            displayReviews(latestReviews);
        } catch (error) {
            reviewsSlideshow.innerHTML = `<p>Error loading reviews: ${error.message}</p>`;
        }
    }

    function displayReviews(reviews) {
        reviewsSlideshow.innerHTML = reviews.map(review => `
            <div class="review_card">
                <p class="review_text">"${review.review}"</p>
                <p class="review_author">- ${review.name}</p>
            </div>
        `).join("");

        // Add slideshow functionality
        startSlideshow();
    }

    function startSlideshow() {
        const reviewCards = document.querySelectorAll(".review_card");
        let currentIndex = 0;

        // Hide all reviews initially
        reviewCards.forEach(card => (card.style.display = "none"));

        // Function to show a specific review
        function showReview(index) {
            reviewCards.forEach(card => (card.style.display = "none"));
            reviewCards[index].style.display = "block";
        }

        // Show the first review and start the slideshow
        showReview(currentIndex);
        setInterval(() => {
            currentIndex = (currentIndex + 1) % reviewCards.length; // Loop back to the start
            showReview(currentIndex);
        }, 5000); // 5 seconds per review
    }

    loadReviews();
});
