import { useState, useEffect, useRef } from 'react';

import './charList.scss';
import useMarvelService from '../../services/Marvel-service';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


const CharList = (props) => {

    const [chars, setChars] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charsEnded, setCharsEnded] = useState(false)

    const {loading, error, getAllCharacters, clearError} = useMarvelService()

    const onScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !newItemLoading) {
            getChars(offset);
        }
    }

    useEffect(() => {
        getChars(offset, true)
        window.addEventListener('scroll', onScroll)
        return window.removeEventListener('scroll', onScroll)
    }, [])

    const getChars = (offset, initial) => {
        clearError()
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharsLoaded)
    }

    const onCharsLoaded = (charList) => {
        let ended = false
        if (charList.length < 9) {
            ended = true
        }

        setChars(chars => [...chars, ...charList])
        setNewItemLoading(newItemLoading => false)
        setOffset(offset => offset + 9)
        setCharsEnded(charEnded => ended)
    }


    const itemRefs = useRef([])

    const focusOnItem = (id) => {
        itemRefs.current.forEach(element => element.classList.remove('char__item_selected'))
        itemRefs.current[id].classList.add('char__item_selected')
        itemRefs.current[id].focus()
    }

    const buildCharsList = (chars) => {
        return chars.map((item, i) => {
            return (
                <li
                    className="char__item"
                    key={item.id}
                    ref={el => itemRefs.current[i] = el}
                    onClick={() => {
                        props.onCharSelected(item.id)
                        focusOnItem(i)
                    }}>
                    <img src={item.thumbnail} alt={item.name} className={item.imgClassList} />
                    <div className="char__name">{item.name}</div>
                </li>
          )
        })
    }

    const charsPage = buildCharsList(Array.from(chars))
    
    return (
        <div className="char__list">
            <ul className="char__grid">
                {loading && !newItemLoading
                    ? <Spinner />
                    : error
                        ? <ErrorMessage />
                        : charsPage}
            </ul>
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => getChars(offset)}
                style={{'display': charsEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
    }

export default CharList;