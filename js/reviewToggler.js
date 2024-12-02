
const pendingReviewsSec = document.querySelector(".pending_reviews_table");
const approvedReviewsSec = document.querySelector(".approved_reviews_table");
const pendingButton = document.querySelector(".reviewToggleButton1");
const approvedButton = document.querySelector(".reviewToggleButton2");

function displayPendingReviews() {
    pendingReviewsSec.style.display = "block"
    approvedReviewsSec.style.display = "none"
    pendingButton.style.backgroundColor = "#04A57F"
    pendingButton.style.color = "#fff"
    approvedButton.style.backgroundColor = "#ffffff00"
    approvedButton.style.color = "#000"
}

function displayApprovedReviews() {
    pendingReviewsSec.style.display = "none"
    approvedReviewsSec.style.display = "block"
    pendingButton.style.backgroundColor = "#ffffff00"
    pendingButton.style.color = "#000"
    approvedButton.style.backgroundColor = "#04A57F"
    approvedButton.style.color = "#fff"
}