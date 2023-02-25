import UseMarvelService from "../../services/UseMarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import './comicsList.scss';

const ComicsList = () => {

  const [comics, setComics] = useState([])
  const [offset, setOffset] = useState(374)
  const [newComicsLoading, setNewComicsLoading] = useState(false)


  const {getComics, loading, error} = UseMarvelService()

  useEffect(() => {
    onUpdateComics(offset, true)
  }, [])

  function onUpdateComics(offset, initial) {
    initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
    getComics(offset).then(onComicsLoaded)
  }

  function onComicsLoaded(newComics) {
    setComics(comics => [...comics, ...newComics])
    setNewComicsLoading(false)
    setOffset(offset => offset + 8)
  }

  const loadingState = loading && !newComicsLoading ? <Spinner/> : null;
  const errorState = error ? <ErrorMessage/> : null

  function renderComics(arr) {
    const comics = arr.map(({title, thumbnail, id, price}, index) => {
      return (
        <li key={index} className="comics__item">
          <Link to={`${id}`}>
            <img src={thumbnail} alt={title} className="comics__item-img"/>
            <div className="comics__item-name">{title}</div>
            <div className="comics__item-price">{`${price}$`}</div>
          </Link>
        </li>
      )
    })
    return (
      <ul className="comics__grid">
        {comics}
      </ul>
    )
  }

  return (
    <div className="comics__list">
      {loadingState}
      {errorState}
      {renderComics(comics)}
      <button disabled={newComicsLoading} className="button button__main button__long">
        <div onClick={() => onUpdateComics(offset, false)} className="inner">
          {newComicsLoading ? 'Loading' : 'load more'}
        </div>
      </button>
    </div>
  )
}

export default ComicsList;
