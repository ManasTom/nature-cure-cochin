<?php
// Define paths
$dataDir = "database/treatments/";
$jsonFile = $dataDir . "treatments.json";

// Get input data
$input = json_decode(file_get_contents("php://input"), true);
$index = $input['index'];
$imageName = $input['imageName'];

// Load existing treatments
if (!file_exists($jsonFile)) {
    http_response_code(400);
    echo json_encode(["error" => "Treatments file not found."]);
    exit;
}
$data = json_decode(file_get_contents($jsonFile), true);

// Validate index
if (!isset($data[$index])) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid index."]);
    exit;
}

// Remove treatment data
array_splice($data, $index, 1);

// Save updated data
file_put_contents($jsonFile, json_encode($data, JSON_PRETTY_PRINT));

// Delete associated image
$imagePath = $dataDir . $imageName;
if (file_exists($imagePath)) {
    unlink($imagePath);
}

// Respond with success
echo json_encode(["success" => true]);
?>
