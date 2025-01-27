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
            
            // Check if PAN is selected and hide schemes accordingly
            const selectedValue = document.querySelector('.statement-filters .select-selected')?.textContent.toLowerCase();
            const schemesSection = document.querySelector('#account-result .schemes-section');
            if (selectedValue === 'pan' && schemesSection) {
                schemesSection.style.display = 'none';
            }
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
            // Hide the form view
            if (capitalGainForm) {
                capitalGainForm.style.display = 'none';
            }
            
            // Show the result view
            if (capitalGainResult) {
                capitalGainResult.style.display = 'block';
                
                // Initialize frequency dropdown in Capital Gain result view
                const resultFrequencySelect = capitalGainResult.querySelector('.custom-select[data-type="frequency"]');
                if (resultFrequencySelect) {
                    const selectItems = resultFrequencySelect.querySelector('.select-items');
                    const selectedDisplay = resultFrequencySelect.querySelector('.select-selected');
                    
                    
                    // Use the same general options
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
                    initializeDropdown(resultFrequencySelect);
                }
            }
        });
    }
});

// Function to show sections
function showSection(sectionId) {
    // Hide all content sections
    const sections = ['interactive', 'account', 'exitload', 'capital'];
    sections.forEach(section => {
        const contentElement = document.getElementById(`${section}-content`);
        const resultElement = document.getElementById(`${section}-result`);
        if (contentElement) contentElement.style.display = 'none';
        if (resultElement) resultElement.style.display = 'none';
    });

    // Show the selected content section
    const selectedContent = document.getElementById(`${sectionId}-content`);
    if (selectedContent) {
        selectedContent.style.display = 'block';
    }

    // Update active nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick').includes(sectionId)) {
            link.classList.add('active');
        }
    });
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

    // Get all custom select elements and date range fields
    const customSelects = document.querySelectorAll('.custom-select');
    const dateRangeFields = document.querySelectorAll('.date-range-fields');

    // Initially hide all date range fields
    dateRangeFields.forEach(field => {
        field.style.display = 'none';
    });

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

                    // Find the closest date range fields to this select
                    const closestDateFields = this.closest('.statement-section')
                        ?.querySelector('.date-range-fields');

                    // Show/hide date range fields if "Custom Date" is selected
                    if (closestDateFields) {
                        closestDateFields.style.display = 
                            this.textContent === 'Custom Date' ? 'block' : 'none';
                    }
                });
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.custom-select')) {
            customSelects.forEach(select => {
                const items = select.querySelector('.select-items');
                if (items) {
                    items.classList.remove('show');
                }
            });
        }
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
    const folioInfo = document.querySelector('#account-result .folio-info');
    const schemesSection = document.querySelector('#account-result .schemes-section');
    
    if (statementForSelect) {
        const items = statementForSelect.querySelector('.select-items');
        
        // Handle item selection
        items?.querySelectorAll('.select-item').forEach(item => {
            item.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                
                // Toggle visibility based on selection
                if (value === 'pan') {
                    panDetails.style.display = 'block';
                    folioInfo.style.display = 'none';
                    if (schemesSection) {
                        schemesSection.style.display = 'none';
                    }
                } else {
                    panDetails.style.display = 'none';
                    folioInfo.style.display = 'block';
                    if (schemesSection) {
                        schemesSection.style.display = 'block';
                    }
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

// Function to initialize frequency dropdown with date range handling
function initializeDropdown(select) {
    const selected = select.querySelector('.select-selected');
    const items = select.querySelector('.select-items');
    const container = select.closest('.soa-form-container');

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
                const dateRangeFields = container.querySelector('.date-range-fields');
                if (dateRangeFields) {
                    if (this.textContent === 'Custom Date') {
                        dateRangeFields.style.display = 'flex';
                        // Initialize flatpickr for date inputs
                        initializeDatePickers(dateRangeFields);
                    } else {
                        dateRangeFields.style.display = 'none';
                    }
                }
            });
        });
    }
}

// Function to initialize date pickers
function initializeDatePickers(container) {
    const dateInputs = container.querySelectorAll('.date-input');
    dateInputs.forEach(input => {
        if (!input._flatpickr) {
            flatpickr(input, {
                dateFormat: "d/m/Y",
                allowInput: true,
                monthSelectorType: "dropdown",
                onOpen: function(selectedDates, dateStr, instance) {
                    // Ensure the calendar opens above the input if there's not enough space below
                    const inputBottom = instance.element.getBoundingClientRect().bottom;
                    const windowHeight = window.innerHeight;
                    if (windowHeight - inputBottom < 300) { // 300px is approximate calendar height
                        instance.config.position = 'above';
                    } else {
                        instance.config.position = 'below';
                    }
                }
            });
        }
    });
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

// Add search functionality for schemes
document.querySelector('#exitload-result .search-box input')?.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const schemes = document.querySelectorAll('#exitload-result .scheme-item');
    
    schemes.forEach(scheme => {
        const text = scheme.querySelector('span').textContent.toLowerCase();
        scheme.style.display = text.includes(searchTerm) ? 'flex' : 'none';
    });
});

// Handle hide zero balance checkbox
document.querySelector('#exitload-result #hideZeroBalance')?.addEventListener('change', function() {
    // Add your zero balance hiding logic here
});

// Get all the necessary elements
const capitalGainForm = document.querySelector('#capital-content');
const capitalGainResult = document.querySelector('#capital-result');
const capitalGainSubmitBtn = document.querySelector('#capital-content .soa-button');

// Add click event listener to the Capital Gain submit button
if (capitalGainSubmitBtn) {
    capitalGainSubmitBtn.addEventListener('click', function() {
        const capitalGainForm = document.querySelector('#capital-content');
        const capitalGainResult = document.querySelector('#capital-result');
        
        if (capitalGainForm) capitalGainForm.style.display = 'none';
        if (capitalGainResult) {
            capitalGainResult.style.display = 'block';
            
            // Initialize frequency dropdown in Capital Gain result view
            const resultFrequencySelect = capitalGainResult.querySelector('.custom-select[data-type="frequency"]');
            if (resultFrequencySelect) {
                const selectItems = resultFrequencySelect.querySelector('.select-items');
                const selectedDisplay = resultFrequencySelect.querySelector('.select-selected');
                
                // Use the same general options
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
                initializeDropdown(resultFrequencySelect);
            }
        }
    });
    const statementPeriodRadios = document.querySelectorAll('input[name="statement-period"]');
    const dateRangeFields = document.querySelector('.date-range-fields');

    statementPeriodRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'custom-range') {
                dateRangeFields.style.display = 'block';
            } else {
                dateRangeFields.style.display = 'none';
            }
        });
    });

    // Initialize Flatpickr for date inputs
    const dateInputs = document.querySelectorAll('.date-input');
    dateInputs.forEach(input => {
        const wrapper = input.closest('.date-wrapper');
        const calendarIcon = wrapper.querySelector('.calendar-icon');
        
        const fp = flatpickr(input, {
            dateFormat: "d/m/Y",
            allowInput: true,
            disableMobile: true,
            theme: "dark",
            position: "auto",
            monthSelectorType: "dropdown",
            nextArrow: '<i class="fas fa-chevron-right"></i>',
            prevArrow: '<i class="fas fa-chevron-left"></i>',
            clickOpens: false, // Prevent opening on input click
            onChange: function(selectedDates, dateStr, instance) {
                input.value = dateStr;
            }
        });

        // Open calendar only when clicking the calendar icon
        calendarIcon.addEventListener('click', () => {
            fp.open();
        });
    });
} 