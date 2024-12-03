
        document.addEventListener("DOMContentLoaded", function () {
            const teamTableDiv = document.querySelector(".team_table");
            const form = document.querySelector("form");
            const nameInput = document.getElementById("name");
            const designationInput = document.getElementById("designation");
            const dpInput = document.getElementById("dp");
            let currentEditIndex = null;
            const jsonFilePath = "database/team/team.json";
    
            async function loadTeamData() {
                try {
                    const response = await fetch(jsonFilePath);
                    if (!response.ok) throw new Error("Failed to load team data.");
                    const teamData = await response.json();
                    createTable(teamData);
                } catch (error) {
                    teamTableDiv.innerHTML = `<p>Error loading team data: ${error.message}</p>`;
                }
            }
    
            function createTable(data) {
                const table = document.createElement("table");
                table.innerHTML = `
                    <thead>
                        <tr>
                            <th>SI No</th>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                `;
                const tbody = document.createElement("tbody");
    
                data.forEach((item, index) => {
                    const row = document.createElement("tr");
    
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${item.name}</td>
                        <td>${item.designation}</td>
                        <td>
                            <img src="database/team/${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
                        </td>
                        <td>
                            
                            <button class="deleteMemberButton" data-index="${index}">Delete</button>
                        </td>
                    `;
    
                    tbody.appendChild(row);
                });
    
                table.appendChild(tbody);
                teamTableDiv.innerHTML = "";
                teamTableDiv.appendChild(table);
    
                // Attach event listeners to edit and delete buttons
                document.querySelectorAll(".editButton").forEach(button =>
                    button.addEventListener("click", (e) => {
                        const index = e.target.getAttribute("data-index");
                        loadForEdit(data[index], index);
                    })
                );
    
                document.querySelectorAll(".deleteMemberButton").forEach(button =>
                    button.addEventListener("click", (e) => {
                        const index = e.target.getAttribute("data-index");
                        deleteTeamMember(index, data[index].image);
                    })
                );
            }
    
            function loadForEdit(item, index) {
                currentEditIndex = index;
                nameInput.value = item.name;
                designationInput.value = item.designation;
                dpInput.value = ""; // Clear file input since we can't preload a file
                form.scrollIntoView({ behavior: "smooth" });
            }
    
            async function deleteTeamMember(index, imageName) {
                try {
                    const response = await fetch("deleteTeamMember.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ index, imageName }),
                    });
    
                    if (!response.ok) throw new Error("Failed to delete team member.");
                    alert("Team member deleted successfully!");
                    loadTeamData();
                } catch (error) {
                    alert(`Error deleting team member: ${error.message}`);
                }
            }
    
            form.addEventListener("submit", async function (e) {
                e.preventDefault();
    
                const name = nameInput.value.trim();
                const designation = designationInput.value.trim();
                const dp = dpInput.files[0];
    
                if (!name || !designation || (currentEditIndex === null && !dp)) {
                    alert("All fields are required.");
                    return;
                }
    
                const formData = new FormData();
                formData.append("name", name);
                formData.append("designation", designation);
                if (dp) formData.append("dp", dp);
                if (currentEditIndex !== null) formData.append("index", currentEditIndex);
    
                try {
                    const response = await fetch("uploadTeamMember.php", {
                        method: "POST",
                        body: formData,
                    });
    
                    if (!response.ok) throw new Error("Failed to save team member.");
                    alert("Team member saved successfully!");
                    currentEditIndex = null;
                    form.reset();
                    loadTeamData();
                } catch (error) {
                    alert(`Error saving team member: ${error.message}`);
                }
            });
    
            loadTeamData();
        });
    