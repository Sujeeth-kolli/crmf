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
    const posCards = document.getElementById("pos-cards");
    const mfdCards = document.querySelectorAll(".mfd-card"); // Select all MFD cards
    const isBranchSelected = document.getElementById("locate-branch").checked;
    const isMFDSelected = document.getElementById("locate-mfd").checked; // Check if MFD is selected
    const isPOSSelected = document.getElementById("locate-pos").checked;

    // Show or hide the branch cards based on the selected option
    if (isBranchSelected) {
        branchCards.style.display = "grid"; // Use grid display for layout
        posCards.style.display = "none"; // Hide POS cards
        mfdCards.forEach(card => card.style.display = "none"); // Hide all MFD cards
    } else if (isMFDSelected) {
        branchCards.style.display = "none"; // Hide branch cards
        posCards.style.display = "none"; // Hide POS cards
        document.querySelector('.mfd-container').style.display = "grid"; // Show the container
        mfdCards.forEach(card => card.style.display = "block"); // Show all MFD cards
    } else if (isPOSSelected) {
        posCards.style.display = "grid"; // Show POS cards
        branchCards.style.display = "none"; // Hide branch cards
        mfdCards.forEach(card => card.style.display = "none"); // Hide all MFD cards
    } else {
        branchCards.style.display = "none"; // Hide branch cards
        posCards.style.display = "none"; // Hide POS cards
        mfdCards.forEach(card => card.style.display = "none"); // Hide all MFD cards
        document.querySelector('.mfd-container').style.display = "none"; // Hide the container
    }

    // Log the visibility status of the branch, POS, and MFD cards
    console.log(`Branch cards are now ${isBranchSelected ? "visible" : "hidden"}.`);
    console.log(`POS cards are now ${isPOSSelected ? "visible" : "hidden"}.`);
    console.log(`MFD cards are now ${isMFDSelected ? "visible" : "hidden"}.`); // Log MFD card status
}