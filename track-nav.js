 // Collapsible container functionality
 const schemeHeaders = document.querySelectorAll('.scheme-header');
 schemeHeaders.forEach((header, index) => {
     const content = header.nextElementSibling;
     const expandBtn = header.querySelector('.expand-btn');
     
     // Expand first container by default
     if (index === 0) {
         content.classList.add('active');
         expandBtn.textContent = '−';
     }
     
     header.addEventListener('click', () => {
         content.classList.toggle('active');
         expandBtn.textContent = content.classList.contains('active') ? '−' : '+';
     });
 });

 // Navigation functionality
 const trackNavSection = document.getElementById('track-nav');
 const idcwDetailsSection = document.getElementById('idcw-details');

 document.getElementById('track-nav-link').addEventListener('click', function(event) {
     event.preventDefault();
     document.getElementById('page-title').innerText = 'TRACK NAV';
     document.getElementById('breadcrumb-title').innerText = 'Track NAV';
     document.getElementById('idcw-details-link').classList.remove('active');
     this.classList.add('active');
     
     // Show Track NAV section and hide IDCW Details
     trackNavSection.style.display = 'block';
     idcwDetailsSection.style.display = 'none';
     
     trackNavSection.scrollIntoView({ behavior: 'smooth' });
 });

 document.getElementById('idcw-details-link').addEventListener('click', function(event) {
     event.preventDefault();
     document.getElementById('page-title').innerText = 'IDCW DETAILS';
     document.getElementById('breadcrumb-title').innerText = 'IDCW Details';
     document.getElementById('track-nav-link').classList.remove('active');
     this.classList.add('active');
     
     // Show IDCW Details section and hide Track NAV
     trackNavSection.style.display = 'none';
     idcwDetailsSection.style.display = 'block';
     
     idcwDetailsSection.scrollIntoView({ behavior: 'smooth' });
 });

 // Toggle option dropdown
 document.querySelector('.option-button').addEventListener('click', function(event) {
     event.preventDefault();
     document.getElementById('optionDropdown').classList.toggle('show');
 });

 // Select option
 function selectOption(option) {
     document.getElementById('selectedOption').textContent = option;
     document.getElementById('optionDropdown').classList.remove('show');
 }

 // Close dropdown when clicking outside
 window.addEventListener('click', function(event) {
     if (!event.target.matches('.option-button') && !event.target.matches('#selectedOption')) {
         const dropdowns = document.getElementsByClassName('dropdown-content');
         for (const dropdown of dropdowns) {
             if (dropdown.classList.contains('show')) {
                 dropdown.classList.remove('show');
             }
         }
     }
 });
 // Pagination setup
 const itemsPerPage = 5;
 let currentPage = 1;
 
 function setupPagination() {
     const schemeContainers = document.querySelectorAll('.scheme-container');
     const totalPages = Math.ceil(schemeContainers.length / itemsPerPage);
     
     // Create pagination container
     const paginationContainer = document.createElement('div');
     paginationContainer.className = 'pagination';
     paginationContainer.style.cssText = `
         display: flex;
         justify-content: center;
         align-items: center;
         gap: 16px;
         margin: 20px 0;
     `;
     
     // Add previous button
     const prevButton = document.createElement('button');
     prevButton.innerHTML = '&lt;';
     prevButton.className = 'pagination-nav';
     prevButton.onclick = () => changePage(currentPage - 1);
     paginationContainer.appendChild(prevButton);
     
     // Add page numbers
     for (let i = 1; i <= totalPages; i++) {
         const pageButton = document.createElement('button');
         pageButton.textContent = i;
         pageButton.className = 'pagination-number';
         if (i === 1) {
             pageButton.classList.add('active');
         }
         pageButton.onclick = () => changePage(i);
         paginationContainer.appendChild(pageButton);
     }
     
     // Add next button
     const nextButton = document.createElement('button');
     nextButton.innerHTML = '&gt;';
     nextButton.className = 'pagination-nav';
     nextButton.onclick = () => changePage(currentPage + 1);
     paginationContainer.appendChild(nextButton);
     
     // Add pagination after the last scheme container
     const trackNavContainer = document.querySelector('.track-nav-container');
     trackNavContainer.appendChild(paginationContainer);
     
     // Add styles to head
     const style = document.createElement('style');
     style.textContent = `
         .pagination-number {
             background: none;
             border: none;
             color: #fff;
             cursor: pointer;
             width: 32px;
             height: 32px;
             font-size: 14px;
             padding: 0;
             display: flex;
             align-items: center;
             justify-content: center;
             border-radius: 50%;
         }
         
         .pagination-number.active {
             background-color: #fff;
             color: #000;
         }
         
         .pagination-nav {
             background: none;
             border: none;
             cursor: pointer;
             padding: 0;
             color: #666;
             font-size: 16px;
         }
         
         .pagination-nav:not([disabled]):hover {
             color: #fff;
         }
         
         .pagination-nav[disabled] {
             color: #666;
             cursor: default;
         }
     `;
     document.head.appendChild(style);
     
     // Show first page
     changePage(1);
 }
 
 function changePage(page) {
     const schemeContainers = document.querySelectorAll('.scheme-container');
     const totalPages = Math.ceil(schemeContainers.length / itemsPerPage);
     
     if (page < 1 || page > totalPages) return;
     
     currentPage = page;
     
     // Update active page button and navigation buttons
     const pageButtons = document.querySelectorAll('.pagination-number');
     const prevButton = document.querySelector('.pagination-nav:first-child');
     const nextButton = document.querySelector('.pagination-nav:last-child');
     
     // Update page numbers
     pageButtons.forEach(button => {
         button.classList.remove('active');
         if (button.textContent === page.toString()) {
             button.classList.add('active');
         }
     });
     
     // Update navigation buttons
     prevButton.disabled = page === 1;
     nextButton.disabled = page === totalPages;
     
     // Show/hide scheme containers
     schemeContainers.forEach((container, index) => {
         container.style.display = 
             index >= (page - 1) * itemsPerPage && index < page * itemsPerPage 
             ? 'block' 
             : 'none';
     });
 }

 // Initialize pagination when the page loads
 document.addEventListener('DOMContentLoaded', setupPagination);