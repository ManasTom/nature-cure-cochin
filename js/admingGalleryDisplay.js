
document.addEventListener("DOMContentLoaded", function() {
    const galleryGrid = document.querySelector(".admin_gallery_grid");

    async function loadGalleryImages() {
        try {
            const response = await fetch("getGalleryImages.php");  // PHP script to fetch image names
            const images = await response.json();  // Expecting a JSON array of image file names

            galleryGrid.innerHTML = "";  // Clear the grid before adding new images

            images.forEach(image => {
                const imageContainer = document.createElement("div");
                imageContainer.classList.add("image-container");

                const imgElement = document.createElement("img");
                imgElement.src = `database/gallery/${image}`;
                imgElement.alt = image;

                const deleteIcon = document.createElement("span");
                deleteIcon.classList.add("delete-icon");
                deleteIcon.innerHTML = "🗑";  // Bin icon

                deleteIcon.addEventListener("click", function() {
                    deleteImage(image);
                });

                imageContainer.appendChild(imgElement);
                imageContainer.appendChild(deleteIcon);
                galleryGrid.appendChild(imageContainer);
            });
        } catch (error) {
            console.error("Error loading gallery images:", error);
        }
    }

    async function deleteImage(image) {
        const confirmation = confirm("Are you sure you want to delete this image?");
        if (!confirmation) return;

        try {
            const response = await fetch("deleteGalleryImage.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ imageName: image })
            });

            const result = await response.json();
            if (result.status === "success") {
                alert("Image deleted successfully!");
                loadGalleryImages();  // Reload the gallery after deletion
            } else {
                alert("Failed to delete image.");
            }
        } catch (error) {
            alert("Error deleting image:", error);
        }
    }

    loadGalleryImages();  // Load images when the page is loaded
});

