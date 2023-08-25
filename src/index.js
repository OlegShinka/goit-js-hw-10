import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const refs = {
  selectEl: document.querySelector('.breed-select'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
  infoEl: document.querySelector('.cat-info'),
  loaderCircle: document.createElement('p'),
};
refs.infoEl.after(refs.loaderCircle);
refs.loaderCircle.classList.add('js-loader');
refs.loaderCircle.classList.add('js-hidden');
refs.errorEl.classList.add('js-hidden');
refs.loaderEl.classList.add('js-hidden');

refs.selectEl.addEventListener('change', onBreedSelect);
function onBreedSelect(evt) {
  refs.infoEl.innerHTML = '';
  refs.loaderCircle.classList.remove('js-hidden');

  fetchCatByBreed(evt.currentTarget.value)
    .then(catBreed => {
      const cat = catBreed[0];
      const markup = `<div><img src="${cat.url}" alt="${cat.url}" width = 500/></div>
      <div class="cat-disc">
       <h2>${cat.breeds[0].name}</h2>
       <p>${cat.breeds[0].description}</p>
       <p><b>Temperament: </b>${cat.breeds[0].temperament}</p> </div>`;

      refs.infoEl.innerHTML = markup;
    })
    .catch(err => {
      console.log(err);
      Notiflix.Report.warning(
        'Oops! Something went wrong! ',
        'Try reloading the page!'
      );
    })
    .finally(() => refs.loaderCircle.classList.add('js-hidden'));
}

function markupSelect(arr) {
  const markupSel = arr
    .map(({ id, name }) => {
      return ` <option value="${id}">${name}</option>`;
    })
    .join('');
  refs.selectEl.insertAdjacentHTML('beforeend', markupSel);
}

fetchBreeds()
  .then(markupSel => {
    markupSelect(markupSel);
  })
  .catch(err => {
    Notiflix.Report.warning(
      'Oops! Something went wrong! ',
      'Try reloading the page!'
    );
    console.log(err);
  });
