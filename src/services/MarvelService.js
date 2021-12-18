import {useHttp} from '../hooks/http.hook';


const useMarvelService = () => {
    const {loading, error, request, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=7cdcb75f1579f955b4b1becbc4c3b1af';
    const _baseOffset = 210;

    const getCharacterByName = async (name) => {
        console.log(name);
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res ? _transformCharacter(res.data.results[0]) : null;
    }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res ? res.data.results.map(_transformCharacter) : null;
    }

    const getCharacter = async (id) => {
        let res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return res ? _transformCharacter(res.data.results[0]) : null;
    }

    const getAllComics = async (offset = 139) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res ? res.data.results.map(_transformComics) : null;
    }

    const getComic = async (id) => {
        let res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return res ? _transformComics(res.data.results[0]) : null;
    }

    const _transformCharacter = (char) => {
        let description = !char.description ? "Данных об этом персонаже нет" : char.description;

        return {
            id: char.id,
            name: char.name,
            description: description.length > 200 ? description.substring(0, 200) + '...' : description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items 
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            prices: comics.prices[0].price,
            name: !comics.series.name ? "Иформации нет" : comics.series.name,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: !comics.textObjects.language ? "en-us" : comics.textObjects.language,
            pages: comics.pageCount,
            description: !comics.description ? "Описание отсутствует" : comics.description.slice(0, 210) + '...'  
        }
    }

    return {loading, error, getCharacterByName, getAllCharacters, getCharacter, getAllComics, getComic, clearError}
}

export default useMarvelService;