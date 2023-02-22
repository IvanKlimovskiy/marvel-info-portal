class MarvelService {
    #url;
    #apiKey;
    #characterOffSet;

    constructor(url, apiKey) {
        this.#url = url;
        this.#apiKey = apiKey;
        this.#characterOffSet = 210;
    }

    getResource = (url) => {
        return fetch(url)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`)
                }
            })
    }

    getAllCharacters = (characterOffSet = this.#characterOffSet) => {
        return this.getResource(`${this.#url}characters?limit=9&offset=${characterOffSet}&${this.#apiKey}`)
            .then(res => {
                return res.data.results.map(this.#transformCharacter)
            })
    }

    getCharacter = (id) => {
        return this.getResource(`${this.#url}characters/${id}?${this.#apiKey}`)
            .then(res => {
                return this.#transformCharacter(res.data.results[0])
            })
    }

    #transformCharacter = (character) => {
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

}

export default MarvelService;

