<?php
$galleryDir = 'database/gallery';
$imageFiles = [];

if (is_dir($galleryDir)) {
    if ($dh = opendir($galleryDir)) {
        while (($file = readdir($dh)) !== false) {
            $filePath = $galleryDir . '/' . $file;
            if (is_file($filePath) && preg_match('/\.(jpg|jpeg|png|gif)$/i', $file)) {
                $imageFiles[] = $file;
            }
        }
        closedir($dh);
    }
}

header('Content-Type: application/json');
echo json_encode($imageFiles);
?>
