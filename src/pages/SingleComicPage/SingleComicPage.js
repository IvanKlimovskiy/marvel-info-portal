import {useParams, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import Spinner from "../../components/spinner/Spinner";

import useMarvelService from "../../services/UseMarvelService";

import './singleComicPage.scss';
import ErrorMessage from "../../components/errorMessage/errorMessage";

const SingleComic = () => {

  const {comicId} = useParams()
  const [comic, setComic] = useState(null);
  const {clearError, getComic, loading, error} = useMarvelService();

  function onComicLoaded(comicData) {
    setComic(comicData)
  }

  useEffect(() => {
    updateComic();
  }, [comicId])

  function updateComic() {
    clearError()
    getComic(comicId)
      .then(onComicLoaded)
  }

  const errorState = error ? <ErrorMessage/> : null;
  const loadingState = loading ? <Spinner/> : null;
  const contentState = !(error || loading || !comic) ? <View comic={comic}/> : null;

  return (
    <>
      {errorState}
      {loadingState}
      {contentState}
    </>
  )
}

const View = ({comic}) => {
  return (
      <div className="single-comic">
        <img src={comic.thumbnail} alt={comic.title} className="single-comic__img"/>
        <div className="single-comic__info">
          <h2 className="single-comic__name">{comic.title}t</h2>
          <p className="single-comic__descr">{comic.description}</p>
          <p className="single-comic__descr">{`${comic.pages} pages`}</p>
          <p className="single-comic__descr">{`Language: ${comic.language}`}</p>
          <div className="single-comic__price">{comic.price ? `${comic.price} $` : 'not avaible'}</div>
        </div>
        <Link to="/marvel-info-portal/comics" className="single-comic__back">Back to all</Link>
      </div>
  )
}

export default SingleComic;
