import {Component} from "react";

import Skeleton from "../skeleton/Skeleton";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/Spinner";

import './charInfo.scss';

class CharInfo extends Component {

  state = {
    character: null,
    loading: false,
    error: false
  }

  marvelService = new MarvelService(
    'https://gateway.marvel.com:443/v1/public/',
    'apikey=42b474d0d5a98a1dd61626e881465dd0'
  );

  onCharacterLoaded = (character) => {
    this.setState({
      character,
      loading: false
    })
  }

  onCharacterLoading = () => {
    this.setState({
      loading: true
    })
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true
    })
  }

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.characterId !== prevProps.characterId) {
      this.updateChar();
    }
  }

  updateChar = () => {
    const {characterId} = this.props
    if (!characterId) {
      return;
    }
    this.onCharacterLoading()
    this.marvelService.getCharacter(characterId)
      .then(this.onCharacterLoaded)
      .catch(this.onError)
  }

  render() {
    const {character, error, loading} = this.state

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
