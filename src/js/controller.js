import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationViews from './views/paginationViews.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(6);

    if (!id) return;
    recipeView.renderSpinner();

    // 1. loading spinner
    await model.loadRecipe(id);

    // 2. Render Rcipe
    recipeView.render(model.state.recipe);
  } catch (err) {
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
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(3));

    // 4 paginate rendering recipe output.
    paginationViews.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  //1 Render NEW result
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2 Rnder NEW pagination buttons
  paginationViews.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationViews.addPaginationHandler(controlPagination);
};

init();
