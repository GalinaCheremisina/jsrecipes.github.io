import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.resultsList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    if (document.querySelector(`.results__link[href*="${id}"]`))
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
};

export const limitRecipeTitle = (title, limit = 17) => {
    if (title.length > limit){
        const arrTitle = title.split(' ');
        let newTitle = arrTitle[0];
        for (const el of arrTitle) {
            if(newTitle.length + el.length <= limit){
                newTitle = newTitle + ' ' + el;
            } else {
                break;
            }
        }
        return newTitle + ' ...';
    } 
    return title;
}

const renderRecipe = recipe => {
const html = `  <li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${limitRecipeTitle(recipe.title)}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>`;
elements.resultsList.insertAdjacentHTML('beforeend',html);  
};

const createButton = (page, type) =>`
                <button class="btn-inline results__btn--${type}" data-goto=${type==='prev'? page-1 : page+1}>
                    <span>Page ${type==='prev'? page-1 : page+1}</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type==='prev'? 'left' : 'right'}"></use>
                    </svg>
                </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults/resPerPage);
    let but;
    if(page ===1 && pages>1) {
        but = createButton(page,'next');
    } else if(page===pages && pages>1){
        but = createButton(page,'prev');
    } else if(page<pages){
        but = `
            ${createButton(page,'next')}
            ${createButton(page,'prev')}
            `;
    };

    elements.searchResPages.insertAdjacentHTML('afterbegin',but);
};

export const renderResults = (recipes, page=1, resPerPage=10) => {
    const start = (page-1)*resPerPage;
    const end = page*resPerPage;
    
    recipes.slice(start,end).forEach(renderRecipe);
    renderButtons(page, recipes.length, 10);
};