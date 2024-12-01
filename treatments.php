<?php
$dataDir = "database/treatments/";
$jsonFile = $dataDir . "treatments.json";

$title = $_POST['title'];
$description = $_POST['description'];
$index = isset($_POST['index']) ? (int) $_POST['index'] : null;
$currentImage = $_POST['currentImage'] ?? null;

if (empty($title) || empty($description)) {
    http_response_code(400);
    echo "Title and description are required.";
    exit;
}

if (!file_exists($jsonFile)) {
    file_put_contents($jsonFile, json_encode([]));
}

$data = json_decode(file_get_contents($jsonFile), true);

$imageName = $currentImage;
if (!empty($_FILES['image']['name'])) {
    $imageName = time() . "_" . basename($_FILES['image']['name']);
    move_uploaded_file($_FILES['image']['tmp_name'], $dataDir . $imageName);

    if ($currentImage && file_exists($dataDir . $currentImage)) {
        unlink($dataDir . $currentImage);
    }
}

$newData = ['title' => $title, 'description' => $description, 'image' => $imageName];

if ($index !== null) {
    $data[$index] = $newData;
} else {
    $data[] = $newData;
}

file_put_contents($jsonFile, json_encode($data, JSON_PRETTY_PRINT));
echo "Success";
?>
