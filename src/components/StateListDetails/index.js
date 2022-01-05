import {Link} from 'react-router-dom'
import './index.css'

const renderNumbersInIndianFormat = number1 => {
  const number = number1.toString()
  let lastThree = number.substring(number.length - 3)
  const otherNumbers = number.substring(0, number.length - 3)
  if (otherNumbers !== '') lastThree = ','.concat(lastThree)
  const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree
  return res
}

const StateListDetails = props => {
  const {data} = props
  const {
    stateName,
    confirmed,
    recovered,
    deceased,
    other,
    population,
    stateCode,
  } = data
  const active = confirmed - recovered - deceased - other

  return (
    <>
      <li className="list-all-cases ">
        <div className="states-container-home">
          <Link to={`/state/${stateCode}`} className="link-home">
            <p className="states-names-home">{stateName}</p>
          </Link>
        </div>
        <div className="home-columns">
          <p className="confirmed-home">
            {renderNumbersInIndianFormat(confirmed)}
          </p>
        </div>
        <div className="home-columns">
          <p className="active-home">{renderNumbersInIndianFormat(active)}</p>
        </div>
        <div className="home-columns">
          <p className="recovered-home">
            {renderNumbersInIndianFormat(recovered)}
          </p>
        </div>
        <div className="home-columns">
          <p className="deceased-home">
            {renderNumbersInIndianFormat(deceased)}
          </p>
        </div>
        <div className="home-columns">
          <p className="population-home">
            {renderNumbersInIndianFormat(population)}
          </p>
        </div>
      </li>
    </>
  )
}

export default StateListDetails
