import {useState, useEffect, useMemo} from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';
import useMarvelService from '../../services/Marvel-service';

const CharInfo = (props) => {

    const [char, setChar] = useState(null)

    const {loading, error, getCharacter, clearError} = useMarvelService()

    useEffect(() => {
        updateChar()
    }, [])

    useEffect(() => {
        updateChar()
    },[props.charId])


    const updateChar = () => {
        clearError()
        if (!props.charId) {
            return;
        }
        getCharacter(props.charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (character) => {
        setChar(char => character)
    }


    const skeleton = (char || loading || error) ? null : <Skeleton/> 
    const isLoading = loading ? <Spinner /> : null
    const isError = error ? <ErrorMessage /> : null
    const content = !(loading || error || !char) ? <View char={char} /> : null

    return (
        <div className="char__info">
                {skeleton}
                {isLoading}
                {isError}
                {content}
        </div>
    )
    
}


const View = (char) => {
    const { name, description, thumbnail, home, wiki, comics, imgClassList } = char.char
    const verifiedComics = comics.length > 10
        ? comics.slice(0, 10)
        : comics.length === 0
            ? [{ name: 'Character havent comics' }]
            : comics
        
    const comicsList = verifiedComics.map((item, i) => {
        return (
            <li className="char__comics-item" key={i}>
                {item.name}
            </li>
        )
    })

    return (
        <>
        <div className="char__basics">
                <img src={thumbnail} alt={name} className={imgClassList} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={home} className="button button__main">
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
               {comicsList}
            </ul></>
    )
}

export default CharInfo;