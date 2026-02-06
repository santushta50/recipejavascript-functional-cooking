// ------------------------------------
// Recipe Data (From Part 1 – unchanged)
// ------------------------------------

const recipes = [
  {
    id: 1,
    title: "Classic Pasta",
    time: 25,
    difficulty: "easy",
    description: "Simple and delicious pasta."
  },
  {
    id: 2,
    title: "Chicken Curry",
    time: 45,
    difficulty: "medium",
    description: "Spicy Indian-style curry."
  },
  {
    id: 3,
    title: "Grilled Cheese",
    time: 10,
    difficulty: "easy",
    description: "Cheesy and crispy sandwich."
  },
  {
    id: 4,
    title: "Beef Steak",
    time: 60,
    difficulty: "hard",
    description: "Perfectly cooked steak."
  },
  {
    id: 5,
    title: "Veg Salad",
    time: 15,
    difficulty: "easy",
    description: "Fresh and healthy salad."
  },
  {
    id: 6,
    title: "Fried Rice",
    time: 30,
    difficulty: "medium",
    description: "Quick Asian fried rice."
  },
  {
    id: 7,
    title: "Chocolate Cake",
    time: 90,
    difficulty: "hard",
    description: "Rich and moist cake."
  },
  {
    id: 8,
    title: "Omelette",
    time: 8,
    difficulty: "easy",
    description: "Fast breakfast omelette."
  }
];


// ------------------------------------
// State Management
// ------------------------------------

let currentFilter = "all";
let currentSort = "none";


// ------------------------------------
// DOM Selections
// ------------------------------------

const recipeContainer = document.querySelector("#recipe-container");
const filterButtons = document.querySelectorAll("[data-filter]");
const sortButtons = document.querySelectorAll("[data-sort]");


// ------------------------------------
// Create Recipe Card
// ------------------------------------

const createRecipeCard = (recipe) => {
  return `
    <div class="recipe-card" data-id="${recipe.id}">
      <h3>${recipe.title}</h3>
      <div class="recipe-meta">
        <span>⏱ ${recipe.time} min</span>
        <span class="difficulty ${recipe.difficulty}">
          ${recipe.difficulty}
        </span>
      </div>
      <p>${recipe.description}</p>
    </div>
  `;
};


// ------------------------------------
// Render Recipes (UI function)
// ------------------------------------

const renderRecipes = (recipesToRender) => {
  recipeContainer.innerHTML = recipesToRender
    .map(recipe => createRecipeCard(recipe))
    .join("");
};


// ------------------------------------
// PURE FILTER FUNCTIONS
// ------------------------------------

const filterByDifficulty = (recipes, level) =>
  recipes.filter(recipe => recipe.difficulty === level);

const filterByTime = (recipes, maxTime) =>
  recipes.filter(recipe => recipe.time < maxTime);

const applyFilter = (recipes, filterType) => {
  switch (filterType) {
    case "easy":
    case "medium":
    case "hard":
      return filterByDifficulty(recipes, filterType);
    case "quick":
      return filterByTime(recipes, 30);
    default:
      return recipes;
  }
};


// ------------------------------------
// PURE SORT FUNCTIONS
// ------------------------------------

const sortByName = (recipes) =>
  [...recipes].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

const sortByTime = (recipes) =>
  [...recipes].sort((a, b) =>
    a.time - b.time
  );

const applySort = (recipes, sortType) => {
  switch (sortType) {
    case "name":
      return sortByName(recipes);
    case "time":
      return sortByTime(recipes);
    default:
      return recipes;
  }
};


// ------------------------------------
// MAIN DISPLAY UPDATE FUNCTION
// ------------------------------------

const updateDisplay = () => {
  let updatedRecipes = recipes;

  updatedRecipes = applyFilter(updatedRecipes, currentFilter);
  updatedRecipes = applySort(updatedRecipes, currentSort);

  renderRecipes(updatedRecipes);

  console.log(
    `Displaying ${updatedRecipes.length} recipes (Filter: ${currentFilter}, Sort: ${currentSort})`
  );
};


// ------------------------------------
// ACTIVE BUTTON STATE
// ------------------------------------

const updateActiveButtons = () => {
  filterButtons.forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.filter === currentFilter
    );
  });

  sortButtons.forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.sort === currentSort
    );
  });
};


// ------------------------------------
// EVENT HANDLERS
// ------------------------------------

const handleFilterClick = (event) => {
  currentFilter = event.target.dataset.filter;
  updateActiveButtons();
  updateDisplay();
};

const handleSortClick = (event) => {
  currentSort = event.target.dataset.sort;
  updateActiveButtons();
  updateDisplay();
};


// ------------------------------------
// SETUP EVENT LISTENERS
// ------------------------------------

const setupEventListeners = () => {
  filterButtons.forEach(button =>
    button.addEventListener("click", handleFilterClick)
  );

  sortButtons.forEach(button =>
    button.addEventListener("click", handleSortClick)
  );
};


// ------------------------------------
// INITIALIZATION
// ------------------------------------

setupEventListeners();
updateDisplay();
