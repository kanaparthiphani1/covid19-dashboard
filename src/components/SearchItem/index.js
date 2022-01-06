import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import './index.css'

const SearchItem = props => {
  const {stateName, stateCode, id} = props

  return (
    <li>
      <Link to={`/state/${id}`} className="link-cont">
        <div className="searchContainer">
          <div className="innerCont">
            <h1 className="head font-face-gm">{stateName}</h1>
          </div>
          <div className="shortName">
            <p className="saerchBtn">
              {stateCode}
              <BiChevronRightSquare
                testid="icon"
                alt="line icon"
                className="iconItem"
              />
            </p>
          </div>
        </div>
      </Link>
      <hr className="horizontal-line" />
    </li>
  )
}

export default SearchItem
