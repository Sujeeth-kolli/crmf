function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected section
    document.getElementById(sectionId).style.display = 'block';
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
}

function toggleOptionDropdown() {
    document.getElementById('optionDropdown').classList.toggle('show');
}

function selectOption(option) {
    document.getElementById('selectedOption').textContent = option;
    document.getElementById('optionDropdown').classList.remove('show');
}

function searchSchemes() {
    const searchInput = document.getElementById('schemeSearchInput');
    const searchResults = document.getElementById('searchResults');
    const filter = searchInput.value.toLowerCase();
    
    // Clear previous results
    searchResults.innerHTML = '';
    
    if (filter.length === 0) {
        searchResults.style.display = 'none';
        return;
    }

    // Get all scheme names from the table
    const table = document.querySelector('.custom-table');
    const rows = table.getElementsByTagName('tr');
    const matches = [];

    // Start from 2 to skip header rows
    for (let i = 2; i < rows.length; i++) {
        const schemeName = rows[i].getElementsByTagName('td')[0];
        if (schemeName) {
            const textValue = schemeName.textContent || schemeName.innerText;
            if (textValue.toLowerCase().indexOf(filter) > -1) {
                matches.push(textValue);
            }
        }
    }

    // Show matching results
    if (matches.length > 0) {
        matches.forEach(match => {
            const div = document.createElement('div');
            div.textContent = match;
            div.onclick = function() {
                searchInput.value = match;
                searchResults.style.display = 'none';
                filterTable(match);
            };
            searchResults.appendChild(div);
        });
        searchResults.style.display = 'block';
    } else {
        searchResults.style.display = 'none';
    }
}

function filterTable(schemeName) {
    const table = document.querySelector('.custom-table');
    const rows = table.getElementsByTagName('tr');

    // Start from 2 to skip header rows
    for (let i = 2; i < rows.length; i++) {
        const schemeCell = rows[i].getElementsByTagName('td')[0];
        if (schemeCell) {
            const textValue = schemeCell.textContent || schemeCell.innerText;
            if (textValue === schemeName) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }
}

// Close search results when clicking outside
document.addEventListener('click', function(e) {
    const searchResults = document.getElementById('searchResults');
    const searchInput = document.getElementById('schemeSearchInput');
    if (e.target !== searchInput) {
        searchResults.style.display = 'none';
    }
});

// Search functionality for Notice section
function searchNotices() {
    const searchInput = document.querySelector('.search-input');
    const filter = searchInput.value.toLowerCase();
    const noticeItems = document.querySelectorAll('.outlook-item');

    noticeItems.forEach(item => {
        const title = item.querySelector('.outlook-title').textContent;
        if (title.toLowerCase().includes(filter)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// Add event listener to notice search input
document.querySelector('.search-input').addEventListener('keyup', searchNotices); 