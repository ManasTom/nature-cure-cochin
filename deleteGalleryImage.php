<?php
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['imageName'])) {
    $imageName = $data['imageName'];
    $imagePath = "database/gallery/" . $imageName;

    // Check if the file exists and delete it
    if (file_exists($imagePath)) {
        if (unlink($imagePath)) {
            echo json_encode(["status" => "success"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to delete the image."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Image not found."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request."]);
}
?>
