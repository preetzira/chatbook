
export default function getEmotion(text){
  return fetch(`/get-emotion/${text}`)
          .then(handleErrors)
            .then(res => res.json(res))
              .catch(err => null)
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
