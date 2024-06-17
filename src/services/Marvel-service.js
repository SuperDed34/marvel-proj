import { useHttp } from "../hooks/http.hook"

const useMarvelService = () => {
  const {loading, request, error, clearError} = useHttp()
 const _description = 'For detailed description please go to the Wiki or Homepage'
 const _url = 'https://gateway.marvel.com:443/v1/public/'
 const _apiKey = `apikey=5d83e1fcc0b845949b77f1452ae8225b`
 const _limit = 9
 const _offset = 210



  const getAllCharacters = async (offset = _offset) => {
    const res = await request(`${_url}characters?limit=${_limit}&offset=${offset}&${_apiKey}`)
    return res.data.results.map(_tranformCharacter)
  }
  
  const getCharacter = async (id) => {
    const res = await request(`${_url}characters/${id}}?${_apiKey}`)
    return _tranformCharacter(res.data.results[0])
  }

  const getAllComics = async (offset = _offset) => {
    const res = await request(`${_url}comics?hasDigitalIssue=true&limit=8&offset=${offset}&${_apiKey}`)
    return res.data.results.map(_transformComics)
  }

  const _tranformCharacter = (res) => {

    const descriptionFormatted = res.description.length === 0
      ? _description
      : res.description.length > 200 
        ? res.description.slice(0, 197) + '...'
        : res.description

    return {
      id: res.id,
      name: res.name,
      description: descriptionFormatted,
      thumbnail: res.thumbnail.path +'.'+ res.thumbnail.extension,
      homepage: res.urls[0].url,
      wiki: res.urls[1].url,
      comics: res.comics.items,
      imgClassList: res.thumbnail.path.endsWith('not_available') 
        ? 'img_contain'
        : '',
    }
  }

  const _transformComics = (res) => {
    console.log(res)
    return {
      id: res.id,
      title: res.title,
      price: res.prices[0].price+'$',
      thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
      description: res.textObjects.text,
      language: res.textObjects.language,
      
    }
  }

  return {loading, error, getAllCharacters, getCharacter, getAllComics, clearError}

}

export default useMarvelService