import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_fT5OA78enT6cSqE2C76XRxJrxP0Ra57b2VF7j9UBjbhJ8k3SoE5hDitOkAhrLMiP';

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&`)
    .then(response => {
      console.log('response_fetchByBreed', response);

      return response;
    });
}

function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds').then(res => {
    return res;
  });
}

export { fetchBreeds, fetchCatByBreed };
