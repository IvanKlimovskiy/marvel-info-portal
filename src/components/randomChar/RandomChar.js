import {Component} from "react";
import Spinner from "../spinner/Spinner";
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/errorMessage";

import './randomChar.scss';


class RandomChar extends Component {

    state = {
        character: {},
        loading: true,
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

    updateChar = () => {
        this.onCharacterLoading()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService.getCharacter(id)
            .then(this.onCharacterLoaded)
            .catch(this.onError)
    }

    render() {
        const {character, loading, error} = this.state

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
                    <button onClick={this.updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
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
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;
