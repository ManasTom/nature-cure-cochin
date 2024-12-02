<?php

// Directory where profile pictures will be uploaded
$uploadDir = "database/team/";

// Ensure the upload directory exists
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if all fields are filled
    if (isset($_POST['name']) && isset($_POST['designation']) && isset($_FILES['dp']) && !empty($_POST['name']) && !empty($_POST['designation']) && !empty($_FILES['dp']['name'])) {
        
        $name = htmlspecialchars($_POST['name']);
        $designation = htmlspecialchars($_POST['designation']);
        
        // Handle file upload
        $imageFile = $_FILES['dp'];
        $imageFileName = time() . "_" . basename($imageFile['name']);
        $targetPath = $uploadDir . $imageFileName;
        
        // Validate and upload the file
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        $imageExtension = strtolower(pathinfo($imageFileName, PATHINFO_EXTENSION));

        if (!in_array($imageExtension, $allowedExtensions)) {
            echo "Invalid file type. Only JPG, JPEG, PNG, and GIF are allowed.";
            exit;
        }

        if (move_uploaded_file($imageFile['tmp_name'], $targetPath)) {
            // If file upload is successful, proceed with saving team member data

            // Check if team.json exists, if not, create it
            $jsonFile = "database/team/team.json";
            if (!file_exists($jsonFile)) {
                file_put_contents($jsonFile, json_encode([]));  // Create an empty array if file does not exist
            }

            // Read existing team data from the JSON file
            $teamData = json_decode(file_get_contents($jsonFile), true);

            // Create new team member entry
            $newTeamMember = [
                'name' => $name,
                'designation' => $designation,
                'image' => $imageFileName
            ];

            // Add the new team member to the array
            $teamData[] = $newTeamMember;

            // Save the updated data back to team.json
            if (file_put_contents($jsonFile, json_encode($teamData, JSON_PRETTY_PRINT))) {
                echo "Team member added successfully!";
            } else {
                echo "Error saving team member data.";
            }
        } else {
            echo "Error uploading the file. Please try again.";
        }
    } else {
        echo "All fields are required, including the profile picture.";
    }
}

?>
