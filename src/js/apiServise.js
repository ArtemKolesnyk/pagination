const BASE_URL = 'https://newsapi.org/v2';
const API_KEY = 'b839a3853ca342e295bf27f18d611455';
const options = {
  headers: {
    Authorization: `${API_KEY}`,
  }
}
export default class NewsApiServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
   }
  
  fetchArticles() {
    const url = `${BASE_URL}/everything?q=${this.searchQuery}&language=en&pageSize=5&page=${this.page}`;
    return fetch(url, options)
      .then(response => response.json())
      .then(({articles})=> {
        this.page += 1;
        return articles;
      }); 
  } 

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}