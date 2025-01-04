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
    // Set the active class for the selected section
    document.querySelector(`.nav-link[onclick="updateContent('${section}')"]`).classList.add('active');
}

function handleLocateOptionChange() {
    const branchCards = document.getElementById("branch-cards");
    const isBranchSelected = document.getElementById("locate-branch").checked;
    // Show or hide the branch cards based on the selected option
    branchCards.style.display = isBranchSelected ? "block" : "none";    
    // Log the visibility status of the branch cards
    console.log(`Branch cards are now ${isBranchSelected ? "visible" : "hidden"}.`);
}