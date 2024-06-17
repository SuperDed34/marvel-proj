import './comicsList.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import useMarvelService from '../../services/Marvel-service';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


const ComicsList = () => {

    const [comics, setComics] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(1)
    const [comicsEnded, setComicsEnded] = useState(false)

    const {loading, error, getAllComics, clearError} = useMarvelService()

    useEffect(() => {
        getComics(offset, true)
    },[])

    const getComics = (offsets, initial) => {
        clearError()
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offsets)
            .then(onComicsLoaded)
    }

    const onComicsLoaded = (comicsList) => {
        let ended = false
        if (comicsList.length < 8) {
            ended = true
        }

        setComics(comics => [...comics, ...comicsList])
        setNewItemLoading(newItemLoading => false)
        setOffset(offset => offset + 8)
        setComicsEnded(comicsEnded=> ended)
    } 

    const buildComicsList = (comics) => {

        const duration = 300
        const defStyles = {
            transition: `opacity ${duration}ms ease-in`,
            opacity: 0
        }
        const transitionStyles = {
            entering: { opacity: 0 },
            entered: {opacity: 1}
        }
        return comics.map((item, i) => {
            return (
                <CSSTransition
                    key={item.id}
                    timeout={duration}
                    classNames='comics__item '>
                        <li className="comics__item">
                        <Link to={'/comics/'+item.id}>
                            <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                            <div className="comics__item-name">{item.title}</div>
                            <div className="comics__item-price">{item.price}</div>
                        </Link>
                    </li>
                </CSSTransition>
            )
        })
    }

    const comicsForRender = buildComicsList(Array.from(comics))
    return (
            <div className="comics__list">
            <ul className="comics__grid">
                    <TransitionGroup component={null}>
                        {
                            loading && !newItemLoading
                                ? <Spinner />
                                : error
                                    ? <ErrorMessage />
                                    : comicsForRender
                        }
                    </TransitionGroup>
               </ul>
                <button className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => getComics(offset)}
                    style={{'display': comicsEnded ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
                </div>
    )
}

export default ComicsList;