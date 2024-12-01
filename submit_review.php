<?php
// Define the path to the JSON file
$reviewsFile = "database/reviews/pendingReviews.json";

// Ensure the directory exists
if (!file_exists(dirname($reviewsFile))) {
    mkdir(dirname($reviewsFile), 0777, true);
}

// Check if the form was submitted via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the input values and sanitize them
    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : '';
    $review = isset($_POST['review']) ? htmlspecialchars(trim($_POST['review'])) : '';

    // Validate the inputs
    if (empty($name) || empty($email) || empty($review)) {
        die(json_encode(["status" => "error", "message" => "All fields are required."]));
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die(json_encode(["status" => "error", "message" => "Invalid email address."]));
    }

    // Create a new review entry
    $newReview = [
        "name" => $name,
        "email" => $email,
        "review" => $review,
        "timestamp" => date('Y-m-d H:i:s')
    ];

    // Read the existing data from the JSON file
    $reviewsData = [];
    if (file_exists($reviewsFile)) {
        $fileContents = file_get_contents($reviewsFile);
        $reviewsData = json_decode($fileContents, true);
    }

    // Append the new review to the existing data
    $reviewsData[] = $newReview;

    // Save the updated data back to the JSON file
    if (file_put_contents($reviewsFile, json_encode($reviewsData, JSON_PRETTY_PRINT))) {
        echo json_encode(["status" => "success", "message" => "Review submitted successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to save the review."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
