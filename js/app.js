// elementos del html
const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

// evento submit a formulario

form.addEventListener('submit', function(e) {
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    console.log(searchedForText);
    getNews();
});

// funcion para crear peticiones

function getNews(searchedForText) {
    const articleRequest = new XMLHttpRequest();
    // solicitar informacion de la API por método GET
    articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=f4527b92fad741b4bc7c7f58e3130730`);
    console.log(articleRequest)
    // segun método de request se asigna una funcion
    articleRequest.onload = addNews;
    articleRequest.onerror = handleError;
    //  Envía petición con el método .send()
    articleRequest.send();
};

// funcion de error
function handleError() {
    console.log('se ha presentado un error')
};

function addNews() {
    // console.log(responseText)
    // parsear JSON para leerlo como objeto en JS
    const data = JSON.parse(this.responseText);
    console.log(data)
    // array de noticias
    const article = data.response.docs;

    paintDom(article)
    // console.log(article);
};

function paintDom(article) {
    article.slice(0,-5).forEach(element =>{
        // console.log(element)
        const title = element.headline.main;
        const snippet = element.snippet;
        // pintar en DOM
        let li = document.createElement('li');
        li.innerText = title;
        // agregar al padre
        responseContainer.appendChild(li);
    })
}