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

const defaults = {
  nameDef: 'Name not found',
  idDEF: 'Id not found',
  urlDef:
    'https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/19452/cartoon-cat-face-clipart-md.png',
  altDef: 'Title not found',
  descDef: 'Information not found',
};

refs.selectEl.addEventListener('change', onBreedSelect);
function onBreedSelect(evt) {
  refs.infoEl.innerHTML = '';
  refs.loaderCircle.classList.remove('js-hidden');
  const selectValue = evt.currentTarget.value;
  fetchCatByBreed(selectValue)
    .then(catBreed => {
      console.log('catBreed.data[0]', catBreed.data[0]);
      const cat = catBreed.data[0];
      console.log('cat.url', cat.url);
      console.log('cat.breeds', cat);
      const markup = `<img src="${cat.url || defaults.urlDef}" alt="${
        cat.url || defaults.altDef
      }" width = 500/>
      <div class="cat-disc">

       <h2>${cat.breeds[0].name || defaults.nameDef}</h2>
       <p>${cat.breeds[0].description || defaults.descDef}</p>
       <p><b>Temperament: </b>${
         cat.breeds[0].temperament || defaults.descDef
       }</p> </div>`;

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
      return ` <option value="${id || defaults.idDef}">${
        name || defaults.nameDef
      }</option>`;
    })
    .join('');
  refs.selectEl.insertAdjacentHTML('beforeend', markupSel);
}
fetchBreeds()
  .then(res => {
    markupSelect(res.data);
  })
  .catch(err => {
    Notiflix.Report.warning(
      'Oops! Something went wrong! ',
      'Try reloading the page!'
    );
    console.log(err);
  });
