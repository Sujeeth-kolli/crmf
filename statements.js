// Radio button handler
document.querySelectorAll('input[name="id-type"]').forEach(radio => {
    radio.addEventListener('change', function() {
        document.getElementById('pan-field').style.display = 
            this.value === 'pan' ? 'block' : 'none';
        document.getElementById('folio-field').style.display = 
            this.value === 'folio' ? 'block' : 'none';
    });
});

// Refresh captcha handler
document.querySelector('.soa-refresh-button').addEventListener('click', function(e) {
    e.preventDefault();
    // Add captcha refresh logic here
});

// Generate link handler
document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.querySelector('.soa-generate-button');
    if (generateButton) {
        generateButton.addEventListener('click', function(e) {
            e.preventDefault();
            const linkSection = document.querySelector('.soa-link-section');
            if (linkSection) {
                linkSection.style.display = 'block';
            }
        });
    }
});

// Handle section switching and submit buttons
document.addEventListener('DOMContentLoaded', function() {
    // Account Statement submit handler
    const accountSubmitBtn = document.querySelector('#account-content .soa-button');
    if (accountSubmitBtn) {
        accountSubmitBtn.addEventListener('click', function() {
            document.querySelector('#account-content').style.display = 'none';
            document.querySelector('#account-result').style.display = 'block';
        });
    }

    // Exit Load Statement submit handler
    const exitLoadSubmitBtn = document.querySelector('#exitload-content .soa-button');
    if (exitLoadSubmitBtn) {
        exitLoadSubmitBtn.addEventListener('click', function() {
            // Hide the initial form
            document.querySelector('#exitload-content').style.display = 'none';
            // Show the result view
            document.querySelector('#exitload-result').style.display = 'block';
        });
    }

    // Capital Gain Statement submit handler
    const capitalSubmitBtn = document.querySelector('#capital-content .soa-button');
    if (capitalSubmitBtn) {
        capitalSubmitBtn.addEventListener('click', function() {
            // Add specific handling for Capital Gain Statement if needed
        });
    }
});

// Function to show sections
function showSection(sectionId) {
    event.preventDefault();
    
    // Hide all sections and results
    document.querySelectorAll([
        '.ncd-main-container', 
        '#account-result', 
        '#exitload-result'
    ].join(',')).forEach(container => {
        container.style.display = 'none';
    });
    
    // Show selected section's initial form
    document.getElementById(sectionId + '-content').style.display = 'block';
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

// Add event listeners for the new sections
document.querySelectorAll('.soa-button').forEach(button => {
    button.addEventListener('click', function() {
        if (this.closest('#account-content')) {
            document.querySelector('#account-content').style.display = 'none';
            document.querySelector('#account-result').style.display = 'block';
        }
    });
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set Interactive SOA as default
    document.getElementById('interactive-content').style.display = 'block';
    document.querySelector('.nav-link').classList.add('active');

    // Get all custom select elements
    const customSelects = document.querySelectorAll('.custom-select');
    const dateRangeFields = document.querySelector('.date-range-fields');

    customSelects.forEach(select => {
        const selected = select.querySelector('.select-selected');
        const items = select.querySelector('.select-items');

        if (selected && items) {
            // Toggle dropdown
            selected.addEventListener('click', function() {
                items.classList.toggle('show');
            });

            // Handle item selection
            const selectItems = select.querySelectorAll('.select-item');
            selectItems.forEach(item => {
                item.addEventListener('click', function() {
                    selected.textContent = this.textContent;
                    items.classList.remove('show');

                    // Show/hide date range fields if "Custom Date" is selected
                    if (this.textContent === 'Custom Date') {
                        dateRangeFields.style.display = 'block';
                    } else {
                        dateRangeFields.style.display = 'none';
                    }
                });
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        customSelects.forEach(select => {
            if (!select.contains(e.target)) {
                const items = select.querySelector('.select-items');
                if (items) {
                    items.classList.remove('show');
                }
            }
        });
    });

    // Initialize Flatpickr for date inputs
    const dateInputs = document.querySelectorAll('.datepicker');
    dateInputs.forEach(input => {
        flatpickr(input, {
            dateFormat: "d/m/Y",
            allowInput: true,
            monthSelectorType: "dropdown"
        });
    });

    // Handle Statement For selection (PAN/Folio toggle)
    const statementForSelect = document.querySelector('.statement-filters .custom-select');
    const panDetails = document.querySelector('.pan-details');
    const folioDetails = document.querySelector('.info-card .folio-info').closest('.info-card');
    const schemesSection = document.querySelector('.schemes-section');
    
    if (statementForSelect) {
        const selectItems = statementForSelect.querySelectorAll('.select-item');
        selectItems.forEach(item => {
            item.addEventListener('click', function() {
                const selectedValue = this.getAttribute('data-value');
                
                // Update the select display
                const selectedDisplay = statementForSelect.querySelector('.select-selected');
                if (selectedDisplay) {
                    selectedDisplay.textContent = this.textContent;
                }

                // Show/hide appropriate sections
                if (selectedValue === 'pan') {
                    panDetails.style.display = 'block';
                    folioDetails.style.display = 'none';
                    schemesSection.style.display = 'none';
                } else if (selectedValue === 'folio') {
                    panDetails.style.display = 'none';
                    folioDetails.style.display = 'block';
                    schemesSection.style.display = 'block';
                }
                
                // Close the dropdown
                const selectItems = statementForSelect.querySelector('.select-items');
                if (selectItems) {
                    selectItems.classList.remove('show');
                }
            });
        });
    }

    // Initialize frequency dropdown for General Statements
    const frequencySelect = document.querySelector('.statement-filters .custom-select[data-type="frequency"]');
    if (frequencySelect) {
        const selectItems = frequencySelect.querySelector('.select-items');
        const selectedDisplay = frequencySelect.querySelector('.select-selected');
        
        // Set initial options for General Statements
        const generalOptions = [
            'As on Date',
            'Current Financial Year',
            'Last Financial Year',
            'Custom Date'
        ];
        
        // Clear and populate options
        selectItems.innerHTML = '';
        generalOptions.forEach(option => {
            const div = document.createElement('div');
            div.className = 'select-item';
            div.textContent = option;
            div.setAttribute('data-value', option.toLowerCase().replace(/\s+/g, '-'));
            selectItems.appendChild(div);
        });
        
        // Set initial selected value
        selectedDisplay.textContent = generalOptions[0];
        
        // Initialize the dropdown
        initializeDropdown(frequencySelect);
    }
});

// Handle statement type radio button changes
const statementTypeRadios = document.querySelectorAll('input[name="statement-type"]');
const frequencySelect = document.querySelector('.statement-filters .custom-select[data-type="frequency"]');

// Define frequency options for each statement type
const frequencyOptions = {
    general: [
        'As on Date',
        'Current Financial Year',
        'Last Financial Year',
        'Custom Date'
    ],
    schedule: [
        'Weekly',
        'Monthly',
        'Quarterly'
    ]
};

statementTypeRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        const options = frequencyOptions[this.value];
        const selectItems = frequencySelect.querySelector('.select-items');
        const selectedDisplay = frequencySelect.querySelector('.select-selected');
        
        // Clear existing options
        selectItems.innerHTML = '';
        
        // Add new options
        options.forEach(option => {
            const div = document.createElement('div');
            div.className = 'select-item';
            div.textContent = option;
            div.setAttribute('data-value', option.toLowerCase().replace(/\s+/g, '-'));
            selectItems.appendChild(div);
        });
        
        // Reset selected value to first option
        selectedDisplay.textContent = options[0];
        
        // Hide date range fields if they were visible
        const dateRangeFields = document.querySelector('.date-range-fields');
        if (dateRangeFields) {
            dateRangeFields.style.display = 'none';
        }
        
        // Reattach click handlers for new options
        const newSelectItems = selectItems.querySelectorAll('.select-item');
        newSelectItems.forEach(item => {
            item.addEventListener('click', function() {
                selectedDisplay.textContent = this.textContent;
                selectItems.classList.remove('show');
                
                // Show date range only for Custom Date in general statements
                if (this.textContent === 'Custom Date') {
                    dateRangeFields.style.display = 'block';
                } else {
                    dateRangeFields.style.display = 'none';
                }
            });
        });
    });
});

// Initialize dropdowns
function initializeDropdown(select) {
    const selected = select.querySelector('.select-selected');
    const items = select.querySelector('.select-items');

    if (selected && items) {
        // Toggle dropdown
        selected.addEventListener('click', function(e) {
            e.stopPropagation();
            items.classList.toggle('show');
        });

        // Handle item selection
        items.querySelectorAll('.select-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                selected.textContent = this.textContent;
                items.classList.remove('show');
                
                // Handle date range fields visibility
                const dateRangeFields = document.querySelector('.date-range-fields');
                if (dateRangeFields) {
                    dateRangeFields.style.display = 
                        this.textContent === 'Custom Date' ? 'block' : 'none';
                }
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize frequency dropdown for General Statements
    const frequencySelect = document.querySelector('.statement-filters .custom-select[data-type="frequency"]');
    if (frequencySelect) {
        const selectItems = frequencySelect.querySelector('.select-items');
        const selectedDisplay = frequencySelect.querySelector('.select-selected');
        
        // Set initial options for General Statements
        const generalOptions = [
            'As on Date',
            'Current Financial Year',
            'Last Financial Year',
            'Custom Date'
        ];
        
        // Clear and populate options
        selectItems.innerHTML = '';
        generalOptions.forEach(option => {
            const div = document.createElement('div');
            div.className = 'select-item';
            div.textContent = option;
            div.setAttribute('data-value', option.toLowerCase().replace(/\s+/g, '-'));
            selectItems.appendChild(div);
        });
        
        // Set initial selected value
        selectedDisplay.textContent = generalOptions[0];
        
        // Initialize the dropdown
        initializeDropdown(frequencySelect);
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.custom-select')) {
            document.querySelectorAll('.select-items').forEach(items => {
                items.classList.remove('show');
            });
        }
    });
}); 