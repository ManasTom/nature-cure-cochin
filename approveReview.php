<?php
// File paths
$pendingReviewsFile = "database/reviews/pendingReviews.json";
$approvedReviewsFile = "database/reviews/approvedReviews.json";

// Ensure the directories and files exist
if (!file_exists($pendingReviewsFile)) {
    die(json_encode(["status" => "error", "message" => "Pending reviews file not found."]));
}
if (!file_exists($approvedReviewsFile)) {
    file_put_contents($approvedReviewsFile, json_encode([])); // Create empty approvedReviews.json
}

// Get the input index from the request
$input = json_decode(file_get_contents("php://input"), true);
$index = isset($input['index']) ? intval($input['index']) : null;

if ($index === null) {
    die(json_encode(["status" => "error", "message" => "Invalid index."]));
}

// Load the reviews data
$pendingReviews = json_decode(file_get_contents($pendingReviewsFile), true);

if (!isset($pendingReviews[$index])) {
    die(json_encode(["status" => "error", "message" => "Review not found."]));
}

// Move the review to the approved list
$reviewToApprove = $pendingReviews[$index];
$approvedReviews = json_decode(file_get_contents($approvedReviewsFile), true);
$approvedReviews[] = $reviewToApprove;

// Save the updated approved reviews
file_put_contents($approvedReviewsFile, json_encode($approvedReviews, JSON_PRETTY_PRINT));

// Remove the review from the pending list
array_splice($pendingReviews, $index, 1);
file_put_contents($pendingReviewsFile, json_encode($pendingReviews, JSON_PRETTY_PRINT));

echo json_encode(["status" => "success", "message" => "Review approved successfully."]);
?>
