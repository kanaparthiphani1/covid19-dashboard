import {Component} from 'react'
import './index.css'

class StateTotalData extends Component {
  state = {
    confirmedData: {},
    activeData: {},
    recoveredData: {},
    deceasedData: {},
  }

  componentDidMount() {
    this.getEachState()
  }

  getEachState = async () => {
    const {eachStateTotalData} = this.props

    const totalConfirmed = eachStateTotalData.confirmed
    const totalRecovered = eachStateTotalData.recovered

    const totalDeceased = eachStateTotalData.deceased

    const totalActive = totalConfirmed - totalRecovered - totalDeceased

    const confirmedData = {
      name: 'Confirmed',
      value: totalConfirmed,
    }

    const activeData = {
      name: 'Active',
      value: totalActive,
    }

    const recoveredData = {
      name: 'Recovered',
      value: totalRecovered,
    }
    const deceasedData = {
      name: 'Deceased',
      value: totalDeceased,
    }

    this.setState({
      confirmedData,
      activeData,
      recoveredData,
      deceasedData,
    })
  }

  onGetTotal = value => {
    const {onGetCategory} = this.props
    onGetCategory(value)
  }

  render() {
    const {confirmedData, activeData, recoveredData, deceasedData} = this.state

    const {active} = this.props
    const itsactiveonload = active ? 'confirmed-block' : ''

    return (
      <>
        <ul className="ul-list-eachstate ">
          <li
            className={`category-item ${confirmedData.name} ${itsactiveonload} `}
            tabIndex="-1"
            key={confirmedData.name}
            value={confirmedData.name}
            onClick={() => this.onGetTotal(confirmedData.name)}
          >
            <div testid="stateSpecificConfirmedCasesContainer">
              <p className="stats-title">{confirmedData.name}</p>
              <img
                src="https://res.cloudinary.com/avinashchinthapally/image/upload/v1637754802/Project%20Images/check-mark_1_lv6pdk.svg"
                alt="state specific confirmed cases pic"
                className="stats-icon"
              />
              <p className="stats-number">{confirmedData.value}</p>
            </div>
          </li>
          <li
            className={`category-item ${activeData.name}`}
            tabIndex="-1"
            key={activeData.name}
            value={activeData.name}
            onClick={() => this.onGetTotal(activeData.name)}
          >
            <div testid="stateSpecificActiveCasesContainer">
              <p className="stats-title">{activeData.name}</p>
              <img
                src="https://res.cloudinary.com/avinashchinthapally/image/upload/v1637753075/Project%20Images/protection_1_lv7qls.svg"
                alt="state specific active cases pic"
                className="stats-icon"
              />
              <p className="stats-number">{activeData.value}</p>
            </div>
          </li>
          <li
            className={`category-item ${recoveredData.name}`}
            tabIndex="-1"
            key={recoveredData.name}
            value={recoveredData.name}
            onClick={() => this.onGetTotal(recoveredData.name)}
          >
            <div testid="stateSpecificRecoveredCasesContainer">
              <p className="stats-title">{recoveredData.name}</p>
              <img
                src="https://res.cloudinary.com/avinashchinthapally/image/upload/v1637753210/Project%20Images/recovered_1_grkgaa.svg"
                alt="state specific recovered cases pic"
                className="stats-icon"
              />
              <p className="stats-number">{recoveredData.value}</p>
            </div>
          </li>
          <li
            className={`category-item ${deceasedData.name}`}
            tabIndex="-1"
            key={deceasedData.name}
            value={deceasedData.name}
            onClick={() => this.onGetTotal(deceasedData.name)}
          >
            <div testid="stateSpecificDeceasedCasesContainer">
              <p className="stats-title">{deceasedData.name}</p>
              <img
                src="https://res.cloudinary.com/avinashchinthapally/image/upload/v1637753322/Project%20Images/breathing_1_u9ikvw.svg"
                alt="state specific deceased cases pic"
                className="stats-icon"
              />
              <p className="stats-number">{deceasedData.value}</p>
            </div>
          </li>
        </ul>
      </>
    )
  }
}
export default StateTotalData
