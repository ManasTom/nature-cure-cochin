
document.addEventListener("DOMContentLoaded", function () {
    const teamGrid = document.querySelector(".team_grid");
    const teamDataPath = "database/team/team.json"; // Adjust the path if necessary
    const imageFolderPath = "database/team/";

    async function loadTeam() {
        try {
            const response = await fetch(teamDataPath);
            if (!response.ok) throw new Error("Failed to fetch team data.");

            const teamData = await response.json();

            // Create team cards dynamically
            teamData.forEach(member => {
                const card = document.createElement("div");
                card.classList.add("team_card");

                card.innerHTML = `
                    <img src="${imageFolderPath + member.image}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.designation}</p>
                `;

                teamGrid.appendChild(card);
            });
        } catch (error) {
            console.error("Error loading team data:", error.message);
            teamGrid.innerHTML = `<p>Error loading team data: ${error.message}</p>`;
        }
    }

    loadTeam();
});
