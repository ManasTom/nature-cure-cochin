<?php
$galleryDirectory = "database/gallery/";

// Check if the directory exists
if (!is_dir($galleryDirectory)) {
    echo json_encode([]);
    exit;
}

$images = array_diff(scandir($galleryDirectory), array('..', '.'));  // Get all files, exclude '.' and '..'
echo json_encode(array_values($images));  // Return a JSON array of image filenames
?>
