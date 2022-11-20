import './css/index.css';
import NewsApiServise from './js/apiServise';
import articlesTpl from './tampletes/articles.hbs';
import LoadMoreBtn from './js/components/loadMoreBtn';


const refs = {
  searchForm: document.querySelector('.js-search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
  
}
 
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
})

const newsApiServise = new NewsApiServise();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles)


function onSearch(e) {
  e.preventDefault();

  newsApiServise.query = e.currentTarget.elements.query.value;
  if (newsApiServise.query === '') {
    return;
  }

  loadMoreBtn.show();
  newsApiServise.resetPage();
  clearArticlesContainer();
  fetchArticles();    
}

function fetchArticles() {
  loadMoreBtn.disabled();
  newsApiServise.fetchArticles().then(articles => {
    appendArticlesMarkup(articles)
    loadMoreBtn.enable();
  });
}

function appendArticlesMarkup(articles) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles)); 
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}
