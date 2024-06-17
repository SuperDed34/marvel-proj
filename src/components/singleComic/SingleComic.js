import { useParams } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/Marvel-service';

import './singleComic.scss';

const SingleComic = () => {
    const { comicId } = useParams()
    const [ comic, setComic] = useState([])
    const { loading, error, getComics, clearError } = useMarvelService()

    useEffect(() => {
        onComicLoaded(comicId)
    },[comicId])
    
    const onComicLoaded = (comicId) => {
        clearError()
        getComics(comicId)
            .then(setComic)
            .then(console.log(comic))
    }
    
    return (
        <div className="single-comic">
            {loading
                ? <Spinner />
                : error
                    ? <ErrorMessage />
                    : <View data={comic}/>
        }
        </div>
    )
}

const View = (props) => {
    const { thumbnail, title, description, pages, language, price } = props.data[0] ? props.data[0]:[]
    return (
        <>
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages + ' pages'}</p>
                <p className="single-comic__descr">{'Language: '+language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </>
        )
}

export default SingleComic;