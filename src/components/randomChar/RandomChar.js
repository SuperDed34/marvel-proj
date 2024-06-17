import {useState, useEffect} from 'react';
import useMarvelService from '../../services/Marvel-service';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const RandomChar = (props) => {

    const [char, setChar] = useState({})

    const {loading, error, getCharacter, clearError} = useMarvelService()

    useEffect(() => {
        updateChar()
    }, []
    )

    const onCharLoaded = (character) => {
        setChar(character)
    }

    const updateChar = () => {
        clearError()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        getCharacter(id)
            .then(onCharLoaded)
            .catch()
    }

    return (
        <div className="randomchar">
                {loading
                    ? <Spinner />
                    : error
                        ? <ErrorMessage />
                        : <View char={char} />}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
    }


const View = ({ char }) => {
    console.log(char)
    const { name, description, thumbnail, homepage, wiki, imgClassList } = char
    const imgStyle = `randomchar__img ${imgClassList}`
    return (
            <div className="randomchar__block">
            <img src={thumbnail} alt={name} className={imgStyle}    />
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