import {useHttp} from '../hooks/http.hook.js'

const useMarvelService = () => {
  const {loading, error, request, clearError} = useHttp();

  const _url = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=42b474d0d5a98a1dd61626e881465dd0';
  const _characterOffSet = 210;
  const _comicsOffset = 374;

  const getAllCharacters = (characterOffSet = _characterOffSet) => {
    return request(`${_url}characters?limit=9&offset=${characterOffSet}&${_apiKey}`)
      .then(res => {
        return res.data.results.map(_transformCharacter)
      })
  }

  const getCharacter = (id) => {
    return request(`${_url}characters/${id}?${_apiKey}`)
      .then(res => {
        return _transformCharacter(res.data.results[0])
      })
  }

  const getComics = (comicsOffset = _comicsOffset) => {
    return request(`${_url}comics?limit=8&offset=${comicsOffset}&${_apiKey}`)
      .then(res => {
        return res.data.results.map(_transformComics)
      })
  }

  const getComic = (id) => {
    return request(`${_url}comics/${id}?${_apiKey}`)
      .then(res => {
        return _transformComics(res.data.results[0])
      })
  }

  const _transformCharacter = (character) => {
    return {
      id: character.id,
      name: character.name,
      description: character.description || 'Sorry, but there is no description for this character',
      thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
      homepage: character.urls[0].url,
      wiki: character.urls[1].url,
      comics: character.comics.items,
      comicsNumber: character.comics.available,
    }
  }

  const _transformComics = (comic) => {
    return {
      id: comic.id,
      title: comic.title,
      thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
      price: comic.prices[0].price,
      description: comic.description || 'Sorry, but there is no description for this comic',
      pages: comic.pageCount,
      language: comic.textObjects.language || 'en-us'
    }
  }

  return {loading, error, getAllCharacters, getCharacter, getComics, getComic, clearError}
}

export default useMarvelService;


