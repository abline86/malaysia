document.addEventListener('DOMContentLoaded', function() {
    try {
        // Parse XML data
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(attractionsData.trim(), "text/xml");
        
        // Check for parsing errors
        const parserError = xmlDoc.querySelector('parsererror');
        if (parserError) {
            console.error('XML parsing error:', parserError);
            return;
        }

        const attractions = Array.from(xmlDoc.getElementsByTagName("attraction"));

        // Get unique categories
        const categories = [...new Set(attractions.map(
            attraction => attraction.getElementsByTagName("Category")[0].textContent
        ))].sort();

        // Initialize category filter
        function initializeCategoryFilter() {
            const categoryFilter = document.getElementById('categoryFilter');
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categoryFilter.appendChild(option);
            });
        }

        // Get element text helper function
        function getElementText(attraction, tagName) {
            try {
                const element = attraction.getElementsByTagName(tagName)[0];
                return element ? element.textContent : '';
            } catch (error) {
                console.error(`Error getting ${tagName}:`, error);
                return '';
            }
        }

        // Create attraction list item
        function createAttractionItem(attraction) {
            const item = document.createElement('div');
            item.className = 'attraction-item';
            
            const placeId = getElementText(attraction, "PlaceID");
            const name = getElementText(attraction, "Name");

            item.innerHTML = `
                <div class="attraction-info">
                    <span><strong>ID:</strong> ${placeId}</span>
                    <span><strong>Name:</strong> ${name}</span>
                </div>
                <button class="view-details-btn" data-id="${placeId}">View Details</button>
            `;

            // Add click event for view details button
            item.querySelector('.view-details-btn').addEventListener('click', () => {
                showDetails(attraction);
            });

            return item;
        }

        // Show attraction details in modal
        function showDetails(attraction) {
            const modal = document.getElementById('detailsModal');
            const modalContent = document.getElementById('modalContent');

            const imagePath = getElementText(attraction, "Image");
            const name = getElementText(attraction, "Name");
            const city = getElementText(attraction, "City");
            const state = getElementText(attraction, "State");
            const description = getElementText(attraction, "Description");
            const openingHours = getElementText(attraction, "OpeningHours");
            const category = getElementText(attraction, "Category");
            const price = getElementText(attraction, "Price");
            const websiteLink = getElementText(attraction, "WebsiteLink");

            modalContent.innerHTML = `
                <div class="details-content">
                    <img src="${imagePath}" alt="${name}" onerror="this.src='images/placeholder.jpg'">
                    <div class="details-info">
                        <h3>${name}</h3>
                        <p><strong>Location:</strong> ${city}, ${state}</p>
                        <p><strong>Category:</strong> ${category}</p>
                        <p><strong>Opening Hours:</strong> ${openingHours}</p>
                        <p><strong>Price:</strong> ${price}</p>
                        <p><strong>Description:</strong> ${description}</p>
                        <a href="${websiteLink}" class="website-link" target="_blank">Visit Website</a>
                    </div>
                </div>
            `;

            modal.classList.add('show');
        }

        // Display attractions
        function displayAttractions(attractionsToShow) {
            const container = document.getElementById('mainAttractionsList');
            container.innerHTML = '';
            
            if (attractionsToShow.length === 0) {
                container.innerHTML = '<div class="no-results">No attractions found for selected category.</div>';
                return;
            }

            // Sort attractions by PlaceID
            const sortedAttractions = [...attractionsToShow].sort((a, b) => {
                const idA = getElementText(a, "PlaceID");
                const idB = getElementText(b, "PlaceID");
                return idA.localeCompare(idB);
            });

            sortedAttractions.forEach(attraction => {
                container.appendChild(createAttractionItem(attraction));
            });
        }

        // Filter attractions
        function filterAttractions() {
            const selectedCategory = document.getElementById('categoryFilter').value;
            const filteredAttractions = selectedCategory === 'all' 
                ? attractions 
                : attractions.filter(attraction => 
                    getElementText(attraction, "Category") === selectedCategory
                );
            displayAttractions(filteredAttractions);
        }

        // Setup event listeners
        function setupEventListeners() {
            // Filter button click
            document.getElementById('filterButton').addEventListener('click', filterAttractions);

            // Reset filter button click
            document.getElementById('resetFilter').addEventListener('click', () => {
                document.getElementById('categoryFilter').value = 'all';
                displayAttractions(attractions);
            });

            // Close modal when clicking close button
            document.querySelector('.close-button').addEventListener('click', () => {
                document.getElementById('detailsModal').classList.remove('show');
            });

            // Close modal when clicking outside
            document.getElementById('detailsModal').addEventListener('click', (e) => {
                if (e.target === document.getElementById('detailsModal')) {
                    document.getElementById('detailsModal').classList.remove('show');
                }
            });

            // Close modal with Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && document.getElementById('detailsModal').classList.contains('show')) {
                    document.getElementById('detailsModal').classList.remove('show');
                }
            });
        }

        // Initialize the application
        function initializeApp() {
            initializeCategoryFilter();
            setupEventListeners();
            displayAttractions(attractions); // Show all attractions initially
        }

        // Start the application
        initializeApp();

    } catch (error) {
        console.error('Error initializing application:', error);
        document.getElementById('mainAttractionsList').innerHTML = `
            <div class="error-message">
                Sorry, there was an error loading the attractions. Please try refreshing the page.
            </div>
        `;
    }
});