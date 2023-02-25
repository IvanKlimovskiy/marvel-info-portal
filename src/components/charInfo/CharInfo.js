import {useState, useEffect} from "react";

import Skeleton from "../skeleton/Skeleton";
import useMarvelService from "../../services/UseMarvelService";
import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/Spinner";

import './charInfo.scss';

const CharInfo = ({characterId}) => {

  const [character, setCharacter] = useState(null)

  const {clearError, getCharacter, loading, error} = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [characterId])

  const updateChar = () => {
    clearError()
    if (!characterId) {
      return;
    }
    getCharacter(characterId)
      .then(onCharacterLoaded)
  }

  const onCharacterLoaded = (characterData) => {
    setCharacter(characterData)
  }


  const skeletonState = character || error || loading ? null : <Skeleton/>
  const errorState = error ? <ErrorMessage/> : null;
  const loadingState = loading ? <Spinner/> : null;
  const contentState = !(error || loading || !character) ? <View character={character}/> : null;

  return (
    <div className="char__info">
      {skeletonState}
      {errorState}
      {loadingState}
      {contentState}
    </div>
  )
}

const View = ({character}) => {
  const {name, description, thumbnail, homepage, wiki, comics, comicsNumber} = character

  let styleProperty = 'cover'
  if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    styleProperty = 'unset'
  }

  const newComicsArray = comics.reduce((result, element, index) => {
    if (index < 5) {
      result.push(
        <li key={index} className="char__comics-item">
          <a target={'_blank'} href={element.resourceURI}>{element.name}</a>
        </li>
      )
    }
    return result;
  }, [])

  return (
    <>
      <div className="char__basics">
        <img style={{objectFit: styleProperty}} src={thumbnail} alt="abyss"/>
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comicsNumber > 0 ? newComicsArray : 'Sorry, but there is no comics for this character'}
      </ul>
    </>
  )
}


export default CharInfo;
