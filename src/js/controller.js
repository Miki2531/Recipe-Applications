import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkeView from './views/bookmarkeView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(6);

    if (!id) return;

    recipeView.renderSpinner();

    // 0 updating result view selected mark result
    resultsView.update(model.getSearchResultsPage());
    bookmarkeView.update(model.state.bookmarks);

    // 1. loading spinner
    await model.loadRecipe(id);

    // 2. Render Rcipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //1 Get search query
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    //3 Render results
    resultsView.render(model.getSearchResultsPage());

    // 4 paginate rendering recipe output.
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  //1 Render NEW result
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2 Render pagination buttons
  paginationView.render(model.state.search);
};

const controlServing = function () {
  // updating the recipe serving(in state)
  model.updateServings(8);

  // updating recipe views
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  // Add/Remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteAddBookmark(model.state.recipe.id);

  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarkeView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkeView.render(model.state.bookmarks);
};

const controlAddRecipe = function (newRecipe) {
  console.log(newRecipe);
};
const init = function () {
  bookmarkeView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerserving(controlServing);
  recipeView.addHandlerBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addPaginationHandler(controlPagination);
  addRecipeView.addHandlerUploadRecipe(controlAddRecipe);
};

init();
