<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Directory to store gallery images
$galleryDirectory = "database/gallery/";

// Ensure the gallery directory exists
if (!is_dir($galleryDirectory)) {
    mkdir($galleryDirectory, 0777, true);
}

// Check if files were uploaded
if (!isset($_FILES['images']) || empty($_FILES['images']['name'][0])) {
    die("No files uploaded.");
}

$uploadedFiles = $_FILES['images'];
$totalFiles = count($uploadedFiles['name']);
$uploadedFilePaths = [];
$errors = [];

for ($i = 0; $i < $totalFiles; $i++) {
    // Get file details
    $fileName = $uploadedFiles['name'][$i];
    $fileTmpName = $uploadedFiles['tmp_name'][$i];
    $fileError = $uploadedFiles['error'][$i];
    $fileSize = $uploadedFiles['size'][$i];
    $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

    // Validate file type
    $validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    if (!in_array($fileExt, $validExtensions)) {
        $errors[] = "File '$fileName' has an invalid file type.";
        continue;
    }

    // Check for upload errors
    if ($fileError !== UPLOAD_ERR_OK) {
        $errors[] = "File '$fileName' encountered an upload error.";
        continue;
    }

    // Check file size (limit to 5MB)
    if ($fileSize > 1000 * 1024 * 1024) {
        $errors[] = "File '$fileName' exceeds the 5MB size limit.";
        continue;
    }

    // Generate unique file name to avoid overwriting
    $uniqueFileName = uniqid("gallery_", true) . "." . $fileExt;
    $destination = $galleryDirectory . $uniqueFileName;

    // Move the file to the gallery directory
    if (move_uploaded_file($fileTmpName, $destination)) {
        $uploadedFilePaths[] = $destination;
    } else {
        $errors[] = "Failed to upload file '$fileName'.";
    }
}

// Output results
if (empty($errors)) {
    echo "Images uploaded successfully! Files: <br>";
    echo implode("<br>", $uploadedFilePaths);
} else {
    echo "Some files could not be uploaded:<br>";
    echo implode("<br>", $errors);
}
?>
