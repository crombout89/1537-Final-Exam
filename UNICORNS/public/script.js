import { unicorns } from './unicorns.js'; // Import the unicorns array

////////////////////////////////////
///////// Fetch Unicorns //////////
////////////////////////////////////

// TASK 1: Get unique food preferences from unicorns
const getUniqueFoodPreferences = () => {
    const allFoodPreferences = unicorns.flatMap(unicorn => unicorn.loves);
    return [...new Set(allFoodPreferences)]; // Return unique food preferences
};

// TASK 1: Setup function to populate food list
const setupFoodList = () => {
    console.log("Initializing food list...");

    const uniqueFoods = getUniqueFoodPreferences();
    const foodListContainer = $("#food-list");
    foodListContainer.empty(); // Clear existing foods

    uniqueFoods.forEach((food) => {
        const foodItemElement = $("<div></div>")
            .text(food)
            .addClass("food-item"); // Create a new div for each food

        foodItemElement.on("click", () => {
            fetchUnicornsByFoodPreference(food);
            // Highlight clicked food item
            $('.food-item').removeClass('selected');
            foodItemElement.addClass('selected');
        });

        foodListContainer.append(foodItemElement); // Add food item to the container
    });

    // Add search functionality
    $("#foodSearch").on("input", (event) => {
        const searchTerm = event.target.value.toLowerCase(); // Get user search term
        const filteredFoods = uniqueFoods.filter(food => food.toLowerCase().includes(searchTerm)); // Filter foods
        foodListContainer.empty(); // Clear existing food items

        filteredFoods.forEach((food) => {
            const foodItemElement = $("<div></div>")
                .text(food)
                .addClass("food-item");

            foodItemElement.on("click", () => {
                fetchUnicornsByFoodPreference(food);
                $('.food-item').removeClass('selected');
                foodItemElement.addClass('selected');
            });

            foodListContainer.append(foodItemElement);
        });
    });
};

/////////////////////////////////////
///////// Fetch Unicorns //////////
/////////////////////////////////////

// Fetch unicorns based on their food preferences
const fetchUnicornsByFoodPreference = (selectedFood) => {
    const matchingUnicorns = unicorns.filter((unicorn) =>
        unicorn.loves.includes(selectedFood)
    ); // Filter unicorns
    displayUnicornDetails(matchingUnicorns); // Display filtered unicorns
};

/////////////////////////////////////
///////// Display Unicorns /////////
/////////////////////////////////////

// Display unicorns in the unicorn details section
const displayUnicornDetails = (matchingUnicorns) => {
    const unicornDetailsContainer = $("#unicorn-details");
    unicornDetailsContainer.empty(); // Clear existing unicorn details

    if (matchingUnicorns.length === 0) {
        unicornDetailsContainer.append(
            "<p>No unicorns found for this food! 😢</p>"
        ); // No results message
        return;
    }

    // Sort unicorns based on user preference
    const selectedSortOption = $('#sort-select').val(); // Get selected sort option
    if (selectedSortOption === 'weight') {
        matchingUnicorns.sort((firstUnicorn, secondUnicorn) => firstUnicorn.weight - secondUnicorn.weight); // Sort by weight
    } else {
        matchingUnicorns.sort((firstUnicorn, secondUnicorn) => firstUnicorn.name.localeCompare(secondUnicorn.name)); // Sort by name
    }

    // Display unicorn details
    matchingUnicorns.forEach((unicorn) => {
        const unicornItemElement = $("<div></div>").addClass("unicorn-item"); // New unicorn item class
        const unicornImageElement = $("<img>")
            .attr("src", `imgs/${unicorn.name}.svg`)
            .attr("alt", `${unicorn.name}'s photo`)
            .addClass("unicorn-img"); // Image styling

        unicornItemElement.append(unicornImageElement); // Add the photo
        unicornItemElement.append(`<h3>${unicorn.name}</h3>`); // Display unicorn name
        unicornItemElement.append(`<h4>Weight: ${unicorn.weight} kgs</h4>`); // Display weight
        unicornItemElement.append(`<p>Favourite Foods: ${unicorn.loves.join(", ")}</p>`); // Display favourite foods
        unicornDetailsContainer.append(unicornItemElement); // Add unicorn to its container
    });
};

// Initialize setup when the document is ready
$(document).ready(setupFoodList);