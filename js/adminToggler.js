
const adminPannelSiteSettings = document.querySelector('.admin_pannel_site_settings');
const adminPannelTreatments = document.querySelector('.admin_pannel_treatments');
const adminPannelReviews = document.querySelector('.admin_pannel_reviews');
const adminPannelGallery = document.querySelector('.admin_pannel_gallery');
const adminPannelTeam = document.querySelector('.admin_pannel_team');

adminPannelReviews.style.display = "none";
adminPannelGallery.style.display = "none";
adminPannelTeam.style.display = "none";
adminPannelSiteSettings.style.display = "none";

function adminPannelTreatmentsToggle() {
    adminPannelTreatments.style.display = "block";
    adminPannelReviews.style.display = "none";
    adminPannelGallery.style.display = "none";
    adminPannelTeam.style.display = "none";
    adminPannelSiteSettings.style.display = "none";
}
function adminPannelReviewsToggle() {
    adminPannelTreatments.style.display = "none";
    adminPannelReviews.style.display = "block";
    adminPannelGallery.style.display = "none";
    adminPannelTeam.style.display = "none";
    adminPannelSiteSettings.style.display = "none";
}
function adminPannelGalleryToggle() {
    adminPannelTreatments.style.display = "none"; adminPannelReviews.style.display = "none";
    adminPannelGallery.style.display = "block";
    adminPannelTeam.style.display = "none";
    adminPannelSiteSettings.style.display = "none";
}
function adminPannelTeamToggle() {
    adminPannelTreatments.style.display = "none";
    adminPannelReviews.style.display = "none";
    adminPannelGallery.style.display = "none";
    adminPannelTeam.style.display = "block";
    adminPannelSiteSettings.style.display = "none";
}
function adminPannelSiteSettingsToggle() {
    adminPannelTreatments.style.display = "none";
    adminPannelReviews.style.display = "none";
    adminPannelGallery.style.display = "none";
    adminPannelTeam.style.display = "none";
    adminPannelSiteSettings.style.display = "block";
}