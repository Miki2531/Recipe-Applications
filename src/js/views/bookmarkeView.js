import View from './views.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class BookmarkViews extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarkes yet. Find a ncie recipe and bookmarks!.';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarkViews();
