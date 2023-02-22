import PropTypes from "prop-types";
import React, {Component} from "react";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";

import './charList.scss';

class CharList extends Component {

    state = {
        charactersList: [],
        loading: true,
        error: false,
        offset: 210,
        loadingNewCharacters: false,
        endedList: false,
        buttonEnabled: true
    }

    marvelService = new MarvelService(
        'https://gateway.marvel.com:443/v1/public/',
        'apikey=42b474d0d5a98a1dd61626e881465dd0');

    componentDidMount() {
        this.onRequest()
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onCharactersListLoaded = (newCharactersList) => {
        let ended = false
        if (newCharactersList.length < 9) {
            ended = true
        }
        this.setState(({charactersList, offset}) => ({
            charactersList: [...charactersList, ...newCharactersList],
            loading: false,
            loadingNewCharacters: false,
            offset: offset + 9,
            endedList: ended
        }))
    }

    onRequest = (offset) => {
        this.setState({
            loadingNewCharacters: true
        })
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharactersListLoaded)
            .catch(this.onError)
    }

    render() {
        const {charactersList, loading, error, offset, loadingNewCharacters, endedList} = this.state;
        const {onSelectedCharacter} = this.props

        const loadingState = loading ? <Spinner/> : null;
        const errorState = error ? <ErrorMessage/> : null;
        const contentState = !(error || loading) ?
            <View loadingNewCharacters={loadingNewCharacters}
                  endedList={endedList}
                  onRequest={this.onRequest}
                  offset={offset}
                  onSelectedCharacter={onSelectedCharacter}
                  charactersList={charactersList}/> : null

        return (
            <>
                {loadingState}
                {errorState}
                {contentState}
            </>
        )
    }
}

class View extends Component {
    constructor(props) {
        super(props);
    }

    myRef = React.createRef()

    refsArr = []

    removeStyleOnFocusedElement = (evt) => {
        if (evt.key === 'Tab') {
            this.refsArr.forEach(ref => ref.classList.remove('char__item_selected'));
        }
    }

    setStyleToRefs = (index) => {
        this.refsArr.forEach(ref => ref.classList.remove('char__item_selected'));
        this.refsArr[index].classList.add('char__item_selected');
        this.refsArr[index].focus();
    }

    setRef = elem => {
        this.myRef = this.refsArr.push(elem)
    }

    allChars = () => this.props.charactersList.map(({thumbnail, name, id}, index) => {
        let styleProperty = 'cover'
        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ||
            'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
            styleProperty = 'unset'
        }
        return (
            <li onClick={() => {this.props.onSelectedCharacter(id); this.setStyleToRefs(index)}}
                tabIndex={0}
                key={id}
                ref={this.setRef}
                className={`char__item`}>
                <img style={{objectFit: styleProperty}} src={thumbnail} alt="abyss"/>
                <div className="char__name">{name}</div>
            </li>
        )
    })

    render() {
        const {offset, onRequest, loadingNewCharacters, endedList} = this.props
        return (
            <div onKeyDown={this.removeStyleOnFocusedElement} className="char__list">
                <ul className="char__grid">
                    {this.allChars()}
                </ul>
                <button disabled={loadingNewCharacters} onClick={() => onRequest(offset)}
                        style={endedList ? {display: 'none'} : {display: 'block'}}
                        className="button button__main button__long">
                    <div className="inner">{loadingNewCharacters ? 'loading' : 'load more'}</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onSelectedCharacter: PropTypes.func
}

export default CharList;
