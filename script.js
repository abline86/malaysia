// Sample attraction data
const attractions = [
    { 
        PlaceID: "001", 
        Name: "Petronas Twin Towers", 
        City: "Kuala Lumpur", 
        State: "Federal Territory of Kuala Lumpur", 
        Description: "Iconic twin skyscrapers and a symbol of Malaysia.", 
        OpeningHours: "9 AM - 9 PM", 
        Category: "Urban Landmark", 
        Ticket: "Yes", 
        Price: 80, 
        Image: "images/petronas_towers.jpg",  // Ensure this path is correct
        WebsiteLink: "http://www.petronastwintowers.com" 
    },
    { 
        PlaceID: "002", 
        Name: "George Town Metropolitan City", 
        City: "George Town", 
        State: "Penang", 
        Description: "Historic center with rich cultural heritage.", 
        OpeningHours: "24 hours", 
        Category: "Historical", 
        Ticket: "No", 
        Price: 0, 
        Image: "images/george_town.jpg", 
        WebsiteLink: "https://ms.wikipedia.org/wiki/George_Town,_Pulau_Pinang" 
    },
    { 
        PlaceID: "003", 
        Name: "Batu Caves", 
        City: "Batu Caves", 
        State: "Selangor", 
        Description: "Famous limestone hills and Hindu shrine.", 
        OpeningHours: "6 AM - 9 PM", 
        Category: "Religious", 
        Ticket: "No", 
        Price: 0, 
        Image: "images/batu_caves.jpg", 
        WebsiteLink: "https://www.malaysia.travel/explore/batu-caves" 
    },
    { 
        PlaceID: "004", 
        Name: "Langkawi Sky Bridge", 
        City: "Langkawi", 
        State: "Kedah", 
        Description: "A curved pedestrian bridge offering stunning views.", 
        OpeningHours: "10 AM - 7 PM", 
        Category: "Adventure", 
        Ticket: "Yes", 
        Price: 15, 
        Image: "images/langkawi_sky_bridge.jpg", 
        WebsiteLink: "https://panoramalangkawi.com/skybridge/" 
    },
    { 
        PlaceID: "005", 
        Name: "Putrajaya", 
        City: "Putrajaya", 
        State: "Federal Territory of Putrajaya", 
        Description: "Modern city known for its stunning architecture.", 
        OpeningHours: "24 hours", 
        Category: "Urban Landmark", 
        Ticket: "No", 
        Price: 0, 
        Image: "images/putrajaya.jpg", 
        WebsiteLink: "https://en.wikipedia.org/wiki/Putrajaya" 
    },
    { 
        PlaceID: "006", 
        Name: "Mount Kinabalu", 
        City: "Kota Kinabalu", 
        State: "Sabah", 
        Description: "Highest peak in Southeast Asia.", 
        OpeningHours: "24 hours", 
        Category: "Adventure", 
        Ticket: "Yes", 
        Price: 100, 
        Image: "images/mount_kinabalu.jpg", 
        WebsiteLink: "http://www.mountkinabalu.com" 
    },
    { 
        PlaceID: "007", 
        Name: "Melaka Historic City", 
        City: "Melaka", 
        State: "Melaka", 
        Description: "UNESCO World Heritage site with rich history.", 
        OpeningHours: "24 hours", 
        Category: "Cultural", 
        Ticket: "No", 
        Price: 0, 
        Image: "images/melaka.jpg", 
        WebsiteLink: "https://www.malaysia.travel/explore/the-historical-city-of-melaka" 
    },
    { 
        PlaceID: "008", 
        Name: "Sunway Lagoon", 
        City: "Petaling Jaya", 
        State: "Selangor", 
        Description: "Popular theme park with water rides and attractions.", 
        OpeningHours: "10 AM - 6 PM", 
        Category: "Recreational", 
        Ticket: "Yes", 
        Price: 120, 
        Image: "images/sunway_lagoon.jpg", 
        WebsiteLink: "http://www.sunwaylagoon.com" 
    },
{ 
        PlaceID: "009", 
        Name: "Perhentian Islands", 
        City: "Perhentian Island", 
        State: "Terengganu", 
        Description: "Stunning tropical islands known for diving and beaches.", 
        OpeningHours: "24 hours", 
        Category: "Adventure", 
        Ticket: "No", 
        Price: 0, 
        Image: "images/perhentian_islands.jpg", 
        WebsiteLink: "https://www.perhentianislandresort.my" 
    },
    { 
        PlaceID: "010", 
        Name: "Kuala Lumpur Bird Park", 
        City: "Kuala Lumpur", 
        State: "Federal Territory of Kuala Lumpur", 
        Description: "World's largest free-flight walk-in aviary.", 
        OpeningHours: "9 AM - 6 PM", 
        Category: "Educational", 
        Ticket: "Yes", 
        Price: 63, 
        Image: "images/kl_bird_park.jpg", 
        WebsiteLink: "http://www.klbirdpark.com" 
    }
];

// Setting up pagination variables
let currentPage = 1;
const itemsPerPage = 5;

// Function to display attractions based on the current page
function showAllAttractions() {
    const attractionsList = document.querySelector('.attraction-container');
    attractionsList.innerHTML = ''; // Clear previous content

    // Determine the start and end index for slicing the attractions array
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedAttractions = attractions.slice(startIndex, endIndex);
    
    paginatedAttractions.forEach(attraction => {
        attractionsList.innerHTML += `
            <div class="attraction-card">
                <h3>${attraction.Name}</h3>
                <img src="${attraction.Image}" alt="${attraction.Name}" style="width:100%; max-width:300px;">
                <p><strong>Description:</strong> ${attraction.Description}</p>
                <p><strong>Location:</strong> ${attraction.City}, ${attraction.State}</p>
                <p><strong>Opening Hours:</strong> ${attraction.OpeningHours}</p>
                <p><strong>Ticket Required:</strong> ${attraction.Ticket}</p>
                <p><strong>Price:</strong> RM ${attraction.Price}</p>
                <p><a href="${attraction.WebsiteLink}" target="_blank">Visit Website</a></p>
            </div>
        `;
    });

    updatePaginationControls();
}

// Function to update pagination controls based on the page number
function updatePaginationControls() {
    const paginationDiv = document.querySelector('#pagination-controls');
    paginationDiv.innerHTML = ''; // Clear previous controls

    // Calculate total pages
    const totalPages = Math.ceil(attractions.length / itemsPerPage);

    // Create Previous button
    if (currentPage > 1) {
        paginationDiv.innerHTML += `<button onclick="changePage(${currentPage - 1})">Previous</button>`;
    }

    // Create Page Number Buttons
    for (let i = 1; i <= totalPages; i++) {
        paginationDiv.innerHTML += `<button class="${currentPage === i ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
    }

    // Create Next button
    if (currentPage < totalPages) {
        paginationDiv.innerHTML += `<button onclick="changePage(${currentPage + 1})">Next</button>`;
    }
}

// Function to change the current page
function changePage(page) {
    currentPage = page;
    showAllAttractions();
}

// Call the function to display attractions when the DOM content is loaded
document.addEventListener('DOMContentLoaded', (event) => {
    showAllAttractions();
});

