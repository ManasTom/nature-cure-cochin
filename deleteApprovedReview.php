<?php
// File path
$pendingReviewsFile = "database/reviews/approvedReviews.json";

// Ensure the file exists
if (!file_exists($pendingReviewsFile)) {
    die(json_encode(["status" => "error", "message" => "Pending reviews file not found."]));
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

// Remove the review
array_splice($pendingReviews, $index, 1);
file_put_contents($pendingReviewsFile, json_encode($pendingReviews, JSON_PRETTY_PRINT));

echo json_encode(["status" => "success", "message" => "Review deleted successfully."]);
?>
