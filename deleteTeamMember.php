<?php
// Set the file paths
$jsonFilePath = "database/team/team.json";
$imageDirectory = "database/team/";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the POST data
    $input = json_decode(file_get_contents('php://input'), true);
    $index = $input['index'] ?? null;
    $imageName = $input['imageName'] ?? null;

    if ($index === null || $imageName === null) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid input data."]);
        exit;
    }

    // Load the JSON file
    if (!file_exists($jsonFilePath)) {
        http_response_code(500);
        echo json_encode(["error" => "Team data file not found."]);
        exit;
    }

    $teamData = json_decode(file_get_contents($jsonFilePath), true);
    if ($teamData === null) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to decode team data file."]);
        exit;
    }

    // Validate the index
    if (!isset($teamData[$index])) {
        http_response_code(404);
        echo json_encode(["error" => "Team member not found."]);
        exit;
    }

    // Remove the image file
    $imagePath = $imageDirectory . $imageName;
    if (file_exists($imagePath)) {
        if (!unlink($imagePath)) {
            http_response_code(500);
            echo json_encode(["error" => "Failed to delete the image file."]);
            exit;
        }
    }

    // Remove the JSON entry
    array_splice($teamData, $index, 1);

    // Save the updated JSON file
    if (file_put_contents($jsonFilePath, json_encode($teamData, JSON_PRETTY_PRINT)) === false) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to update team data file."]);
        exit;
    }

    // Success
    echo json_encode(["success" => true]);
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed."]);
}
?>
