import { unicorns } from "./unicorns.js"; // Import the unicorns array

////////////////////////////////////
///////// Fetch Unicorns //////////
///////////////////////////////////

// TASK 1: Get unique loves from unicorns
const getUniqueLoves = () => {
  const allLoves = unicorns.flatMap((unicorn) => unicorn.loves);
  return [...new Set(allLoves)]; // Return unique loves
};

// TASK 1: Setup function to populate loves list
const setupLovesList = () => {
  console.log("Initializing loves list...");

  const uniqueLoves = getUniqueLoves(); // Get unique loves instead of foods
  const lovesListContainer = $("#food-list"); // Renamed to reflect loves context
  lovesListContainer.empty(); // Clear existing loves

  uniqueLoves.forEach((love) => {
    const loveItemElement = $("<div></div>").text(love).addClass("food-item"); // Updated variable name

    loveItemElement.on("click", () => {
      fetchUnicornsByLovePreference(love); // Updated function call
      // Highlight clicked love item
      $(".food-item").removeClass("selected");
      loveItemElement.addClass("selected");
    });

    lovesListContainer.append(loveItemElement); // Add love item to the container
  });

  // Add search functionality for loves
  $("#foodSearch").on("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredLoves = uniqueLoves.filter((love) => // Filtering loves based on search input
      love.toLowerCase().includes(searchTerm)
    );
    lovesListContainer.empty();

    filteredLoves.forEach((love) => {
      const loveItemElement = $("<div></div>").text(love).addClass("food-item");

      loveItemElement.on("click", () => {
        fetchUnicornsByLovePreference(love); // Updated function call
        $(".food-item").removeClass("selected");
        loveItemElement.addClass("selected");
      });

      lovesListContainer.append(loveItemElement);
    });
  });
};

// Fetch unicorns based on their loves preferences
const fetchUnicornsByLovePreference = (selectedLove) => {
  const matchingUnicorns = unicorns.filter((unicorn) =>
    unicorn.loves.includes(selectedLove)
  ); // Filter unicorns
  displayUnicornDetails(matchingUnicorns); // Display filtered unicorns
};

///////////////////////////////////////
///////// Display Unicorns ///////////
/////////////////////////////////////

// Display unicorns in the unicorn details section
const displayUnicornDetails = (matchingUnicorns) => {
  const unicornDetailsContainer = $("#unicorn-details");
  unicornDetailsContainer.empty(); // Clear existing unicorn details

  if (matchingUnicorns.length === 0) {
    unicornDetailsContainer.append(
      "<p>No unicorns found for this love! 😢</p>" // Updated message
    ); // No results message
    return;
  }

  // Display unicorn details
  matchingUnicorns.forEach((unicorn) => {
    const unicornItemElement = $("<div></div>").addClass("unicorn-item");
    const unicornImageElement = $("<img>")
      .attr("src", `imgs/${unicorn.name}.svg`)
      .attr("alt", `${unicorn.name}'s photo`)
      .addClass("unicorn-img");

    unicornItemElement.append(unicornImageElement); // Add the photo
    unicornItemElement.append(`<h3>${unicorn.name}</h3>`); // Display unicorn name
    unicornItemElement.append(`<h4>Weight: ${unicorn.weight} kgs</h4>`); // Display weight
    unicornItemElement.append(
      `<p>Favourite Loves: ${unicorn.loves.join(", ")}</p>` // Updated text to "Loves"
    ); // Display favourite loves
    unicornItemElement.append(`<p>Gender: ${unicorn.gender}</p>`); // Display gender
    unicornItemElement.append(`<p>Vampires: ${unicorn.vampires}</p>`); // Display vampires
    unicornItemElement.append(`<p>Vaccinated: ${unicorn.vaccinated ? "Yes" : "No"}</p>`); // Display vaccination status
    unicornDetailsContainer.append(unicornItemElement); // Add unicorn to its container
  });

  // Call sorting function here after displaying unicorns
  setupSorting(matchingUnicorns); // Set up sorting for the displayed unicorns
};

////////////////////////////////////
///////// Sorting Logic ///////////
//////////////////////////////////

// Setup sorting functionality
const setupSorting = (matchingUnicorns) => {
  $("#sort-select")
    .off("change")
    .on("change", function () {
      console.log("Sort option changed!"); // Check if this logs when the dropdown changes
      const selectedSortOption = $(this).val();
      console.log("Selected sort option:", selectedSortOption); // Log the selected option

      // Sort based on selected option
      if (selectedSortOption === "weight") {
        matchingUnicorns.sort(
          (firstUnicorn, secondUnicorn) =>
            firstUnicorn.weight - secondUnicorn.weight
        );
      } else if (selectedSortOption === "gender") {
        matchingUnicorns.sort((firstUnicorn, secondUnicorn) =>
          firstUnicorn.gender.localeCompare(secondUnicorn.gender)
        );
      } else if (selectedSortOption === "vampires") {
        matchingUnicorns.sort(
          (firstUnicorn, secondUnicorn) =>
            firstUnicorn.vampires - secondUnicorn.vampires
        );
      } else if (selectedSortOption === "vaccinated") {
        matchingUnicorns.sort((firstUnicorn, secondUnicorn) => 
          (firstUnicorn.vaccinated === secondUnicorn.vaccinated) ? 0 : firstUnicorn.vaccinated ? -1 : 1
        );
      } else if (selectedSortOption === "loves") {
        matchingUnicorns.sort((firstUnicorn, secondUnicorn) =>
          firstUnicorn.loves.join(", ").localeCompare(secondUnicorn.loves.join(", "))
        );
      } else {
        matchingUnicorns.sort((firstUnicorn, secondUnicorn) =>
          firstUnicorn.name.localeCompare(secondUnicorn.name)
        );
      }
      displayUnicornDetails(matchingUnicorns); // Update displayed unicorns
    });
};

// Initialize setup when the document is ready
$(document).ready(setupLovesList); // Updated to call setupLovesList