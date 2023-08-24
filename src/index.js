const refs = {
  selectEl: document.querySelector('.breed-select'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
  infoEl: document.querySelector('.cat-info'),
};
refs.loaderEl.classList.add('js-hidden');

refs.selectEl.addEventListener('change', onBreedSelect);
function onBreedSelect(evt) {
  refs.loaderEl.classList.remove('js-hidden');
  fetchCatByBreed(evt.currentTarget.value)
    .then(catAr => {
      //   if (!refs.loaderEl.classList.contains('js-hidden')) {
      //     refs.loaderEl.classList.add('js-hidden');
      //   }

      const cat = catAr[0];
      const markup = `<img src="${cat.url}" alt="${cat.url}" width = 500  />
      <div class="cat-disc">
       <h2>${cat.breeds[0].name}</h2>
       <p>${cat.breeds[0].description}</p>
       <p><b>Temperament: </b>${cat.breeds[0].temperament}</p> </div>`;

      refs.infoEl.innerHTML = markup;
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => refs.loaderEl.classList.add('js-hidden'));
}

function fetchBreeds() {
  return fetch(
    'https://api.thecatapi.com/v1/breeds?api_key=live_fT5OA78enT6cSqE2C76XRxJrxP0Ra57b2VF7j9UBjbhJ8k3SoE5hDitOkAhrLMiP'
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
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
    console.log(err);
  });

function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?api_key=live_fT5OA78enT6cSqE2C76XRxJrxP0Ra57b2VF7j9UBjbhJ8k3SoE5hDitOkAhrLMiP&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    console.log(response);
    return response.json();
  });
}

// function markupCatByBreed(arr) {
//   const markupBreed = arr
//     .map(({ url, name, description, temperament }) => {
//       return ` <img src="${url}" alt="${name} class='card-img' width=300 >
//           <div class="card">
//               <h2 class="card-title">${name}</h2>
//               <p class="cat-desc">${description}</p>
//               <p class="cat-temp">${temperament}</p>
//           </div>`;
//     })
//     .join('');

//   refs.infoEl.innerHTML = markupBreed;
//   refs.infoEl.insertAdjacentHTML('beforeend', markupBreed);
//   console.log(data);
//   const breedInfo = arr.breeds[0];
//   const img = {
//     url: arr.url,
//     alt: breedInfo.name,
//   };

//   const markup = `<img src="${img.url}" alt="${img.alt} width="80px" >
//     //         <div class="card">
//     //             <h2 class="card-title">${breedInfo.name}</h2>
//     //             <p class="cat-desc">${breedInfo.description}</p>
//     //             <p class="cat-temp">${breedInfo.temperament}</p>
//     //         </div>`;
//   refs.infoEl.innerHTML = markup;
// }
