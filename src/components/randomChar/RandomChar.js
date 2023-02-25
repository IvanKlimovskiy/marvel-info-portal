import {useState, useEffect} from "react";
import Spinner from "../spinner/Spinner";
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from "../../services/UseMarvelService";
import ErrorMessage from "../errorMessage/errorMessage";

import './randomChar.scss';


const RandomChar = () => {

    const [character, setCharacter] = useState({})

    const {clearError, getCharacter, loading, error} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [])

    const onCharacterLoaded = (character) => {
        setCharacter(character)
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharacterLoaded)

    }

    const errorState = error ? <ErrorMessage/> : null;
    const loadingState = loading ? <Spinner/> : null;
    const contentState = !(error || loading) ? <View character={character}/> : null;
    return (
        <div className="randomchar">
            {errorState}
            {loadingState}
            {contentState}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({character: {name, description, thumbnail, homepage, wiki}}) => {

    let styleProperty = 'cover'
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        styleProperty = 'unset'
    }
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={{objectFit: styleProperty}}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} target={'_blank'} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} target={'_blank'} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;
