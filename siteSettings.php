<?php
// Path to the site settings JSON file
$jsonFilePath = "database/site/siteSettings.json";

// Check if the form is submitted via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect data from the form
    $address = $_POST['address'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone_1 = $_POST['phone_1'] ?? '';
    $phone_2 = $_POST['phone_2'] ?? '';
    $workingTime = $_POST['workingTime'] ?? '';

    // Validate required fields
    if (empty($address) || empty($email) || empty($phone_1) || empty($workingTime)) {
        http_response_code(400);
        echo "All fields are required.";
        exit;
    }

    // Create the data array
    $siteSettings = [
        "address" => $address,
        "email" => $email,
        "phone_1" => $phone_1,
        "phone_2" => $phone_2,
        "workingTime" => $workingTime
    ];

    // Save the data to the JSON file (overwrite the existing data)
    if (file_put_contents($jsonFilePath, json_encode($siteSettings, JSON_PRETTY_PRINT))) {
        echo "Site settings saved successfully.";
    } else {
        http_response_code(500);
        echo "Error saving site settings.";
    }
} else {
    http_response_code(405);
    echo "Method not allowed.";
}
?>
