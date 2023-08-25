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

export { fetchBreeds, fetchCatByBreed };
