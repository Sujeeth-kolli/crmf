function updateContent(section) {
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => {
        content.style.display = 'none'; // Hide all content
    });

    document.getElementById(section).style.display = 'block'; // Show selected content

    // Update active class for navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`.nav-link[onclick="updateContent('${section}')"]`).classList.add('active');
}
// Add event listeners to toggle visibility based on selection
function handleLocateOptionChange() {
    // Get all cards
    const branchCard = document.getElementById("branch-card");
    const mfdCard = document.getElementById("mfd-card");
    const posCard = document.getElementById("pos-card");

    // Hide all cards by default
    branchCard.style.display = "none";
    mfdCard.style.display = "none";
    posCard.style.display = "none";

    // Add event listeners to the radio buttons
    document.querySelectorAll('input[name="locate-option"]').forEach((radio) => {
        radio.addEventListener("change", function () {
            // Show the appropriate card based on the selected option
            if (this.id === "locate-branch") {
                branchCard.style.display = "block";
            } else if (this.id === "locate-mfd") {
                mfdCard.style.display = "block";
            } else if (this.id === "locate-pos") {
                posCard.style.display = "block";
            }
        });
    });
}

// Call the function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", handleLocateOptionChange);
