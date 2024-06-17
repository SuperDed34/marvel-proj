import avengers from '../../resources/img/Avengers.png'
import avengersLogo from '../../resources/img/Avengers_logo.png'

import './comicsBanner.scss'

const ComicsBanner = () => {

  return (
    <div className="comics-banner">
      <img src={avengers} alt="avengers" className="avengers" />
      <p className="comics-h2">New comics every week! <br></br> Stay tuned!</p>
      <img src={avengersLogo} alt="avengers label" className="avengers-label" />
    </div>
    )
}

export default ComicsBanner