<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve form data
    $firstName = htmlspecialchars($_POST['firstName']);
    $lastName = htmlspecialchars($_POST['lastName']);
    $phone = htmlspecialchars($_POST['phone']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Email configuration
    $to = "cpadiyara@gmail.com"; // Replace with the recipient's email
    $subject = "New Enquiry Received";
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From: " . ($email ? $email : "noreply@cpadiyara.com") . "\r\n";

    // Email content
    $emailMessage = "
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                color: #333;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #e6e6e6;
                border-radius: 8px;
            }
            .header {
                background-color: #04A57F;
                color: white;
                padding: 10px 15px;
                border-radius: 8px 8px 0 0;
                text-align: center;
            }
            .content {
                padding: 15px;
            }
            .content h2 {
                color: #04A57F;
                margin-bottom: 20px;
            }
            .content p {
                line-height: 1.5;
                margin: 10px 0;
            }
            .content p strong {
                color: #04A57F;
            }
            .footer {
                background-color: #f5f5f5;
                padding: 10px;
                border-radius: 0 0 8px 8px;
                text-align: center;
                font-size: 12px;
                color: #888;
            }
        </style>
    </head>
    <body>
        <div class='email-container'>
            <div class='header'>
                <h1>New Enquiry</h1>
            </div>
            <div class='content'>
                <h2>Enquiry Details</h2>
                <p><strong>First Name:</strong> $firstName</p>
                <p><strong>Last Name:</strong> $lastName</p>
                <p><strong>Phone:</strong> $phone</p>
                <p><strong>Email:</strong> $email</p>
                <p><strong>Message:</strong></p>
                <p>$message</p>
            </div>
            <div class='footer'>
                <p>&copy; 2024 Cardinal Padiyara Nature Cure Hospital. All Rights Reserved.</p>
            </div>
        </div>
    </body>
    </html>
    ";

    // Send the email
    if (mail($to, $subject, $emailMessage, $headers)) {
        echo "<script>alert('Your enquiry has been sent successfully!'); window.location.href = 'index.html';</script>";
    } else {
        echo "<script>alert('There was an error sending your enquiry. Please try again later.'); window.history.back();</script>";
    }
} else {
    header("Location: enquiry-page.html");
    exit();
}
?>
