import { turtles } from "./turtles.js"; // Import the turtles array

///////////////////////////////////
///////// Fetch Turtles //////////
//////////////////////////////////

// TASK 1: Get unique food preferences
const getUniqueFoodPreferences = () => {
  const allFoodPreferences = turtles.flatMap((turtles) => turtles.loves);
  return [...new Set(allFoodPreferences)]; // Return unique food preferences
};

// TASK 1: Setup function to populate food list
const setupFoodList = () => {
  console.log("Initializing food list...");

  const uniqueFoods = getUniqueFoodPreferences(); // Get unique foods
  const foodListContainer = $("#food-list");
  foodListContainer.empty(); // Clear existing foods

  uniqueFoods.forEach((food) => {
    const foodItemElement = $("<div></div>").text(food).addClass("food-item");

    foodItemElement.on("click", () => {
      fetchTurtlesByFoodPreference(food);
      // Highlight clicked food item
      $(".food-item").removeClass("selected");
      foodItemElement.addClass("selected");
    });

    foodListContainer.append(foodItemElement); // Add food item to the container
  });

  // Add search functionality for foods
  $("#foodSearch").on("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredFoods = uniqueFoods.filter((food) =>
      food.toLowerCase().includes(searchTerm)
    );
    foodListContainer.empty();

    filteredFoods.forEach((food) => {
      const foodItemElement = $("<div></div>").text(food).addClass("food-item");

      foodItemElement.on("click", () => {
        fetchTurtlesByFoodPreference(food);
        $(".food-item").removeClass("selected");
        foodItemElement.addClass("selected");
      });

      foodListContainer.append(foodItemElement);
    });
  });
};

// Fetch turtles based on their food preferences
const fetchTurtlesByFoodPreference = (selectedFood) => {
  const matchingTurtles = turtles.filter((turtle) =>
    turtle.loves.includes(selectedFood)
  ); // Filter turtles
  displayTurtleDetails(matchingTurtles); // Display filtered turtles
};

//////////////////////////////////////
///////// Display Turtles ///////////
////////////////////////////////////

// Display turtles in the turtle details section
const displayTurtleDetails = (matchingTurtles) => {
  const turtleDetailsContainer = $("#turtle-details");
  turtleDetailsContainer.empty(); // Clear existing turtle details

  if (matchingTurtles.length === 0) {
    turtleDetailsContainer.append(
      "<p>No turtles found for this food! 😢</p>" // Message for no results
    );
    return;
  }

  // Display turtle details
  matchingTurtles.forEach((turtle) => {
    const turtleItemElement = $("<div></div>").addClass("turtle-item");
    const turtleImageElement = $("<img>")
      .attr("src", `imgs/${turtle.name}.svg`)
      .attr("alt", `${turtle.name}'s photo`)
      .addClass("turtle-img");

    turtleItemElement.append(turtleImageElement); // Add the photo
    turtleItemElement.append(`<h3>${turtle.name}</h3>`); // Display turtle name
    turtleItemElement.append(`<h4>Habitat: ${turtle.habitat}</h4>`); // Display habitat
    turtleItemElement.append(`<h4>Weight: ${turtle.weight} lbs</h4>`); // Display weight
    turtleItemElement.append(`<p>Shell Width: ${turtle.shellWidth}</p>`); // Display shell width
    turtleItemElement.append(
      `<p>Favourite Foods: ${turtle.loves.join(", ")}</p>` // Display favourite foods
    ); 
    turtleItemElement.append(`<p>Gender: ${turtle.gender}</p>`); // Display gender
    turtleItemElement.append(`<p>Migration Distance: ${turtle.kilometresMigrated} km</p>`); // Display migration distance
    turtleItemElement.append(`<p>Endangered: ${turtle.endangeredStatus ? "Yes" : "No"}</p>`); // Display endangered status
    turtleDetailsContainer.append(turtleItemElement); // Add turtle to its container
  });

  // Call sorting function here after displaying turtles
  setupSorting(matchingTurtles); // Set up sorting for the displayed turtles
};

////////////////////////////////////
///////// Sorting Logic ///////////
//////////////////////////////////

// Setup sorting functionality
const setupSorting = (matchingTurtles) => {
  $("#sort-select")
    .off("change")
    .on("change", function () {
      console.log("Sort option changed!"); // Check if this logs when the dropdown changes
      const selectedSortOption = $(this).val();
      console.log("Selected sort option:", selectedSortOption); // Log the selected option

      // Sort based on selected option
      if (selectedSortOption === "weight") {
        matchingTurtles.sort(
          (firstTurtle, secondTurtle) =>
            firstTurtle.weight - secondTurtle.weight
        );
      } else if (selectedSortOption === "gender") {
        matchingTurtles.sort((firstTurtle, secondTurtle) =>
          firstTurtle.gender.localeCompare(secondTurtle.gender)
        );
      } else if (selectedSortOption === "migration") {
        matchingTurtles.sort(
          (firstTurtle, secondTurtle) =>
            firstTurtle.kilometresMigrated - secondTurtle.kilometresMigrated
        );
      } else if (selectedSortOption === "endangered") {
        matchingTurtles.sort((firstTurtle, secondTurtle) => 
          (firstTurtle.endangeredStatus === secondTurtle.endangeredStatus) ? 0 : firstTurtle.endangeredStatus ? -1 : 1
        );
      } else if (selectedSortOption === "loves") {
        matchingTurtles.sort((firstTurtle, secondTurtle) =>
          firstTurtle.loves.join(", ").localeCompare(secondTurtle.loves.join(", "))
        );
      } else {
        matchingTurtles.sort((firstTurtle, secondTurtle) =>
          firstTurtle.name.localeCompare(secondTurtle.name)
        );
      }
      displayTurtleDetails(matchingTurtles); // Update displayed turtles
    });
};

// Initialize setup when the document is ready
$(document).ready(setupFoodList); // Call setupFoodList