import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import {BsSearch} from 'react-icons/bs'
import StateListDetails from '../StateListDetails'
import Header from '../Header'
import Footer from '../Footer'
import SearchItem from '../SearchItem'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Home extends Component {
  state = {
    isLoading: true,
    totalActiveCases: 0,
    totalConfirmedCases: 0,
    totalRecoveredCases: 0,
    totalDeceasedCases: 0,
    search: '',
    filteredSearchList: [],
    statesinfo: [],
  }

  componentDidMount() {
    this.getAllData()
  }

  getAllData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      let totalConfirmedCases = 0
      let totalRecoveredCases = 0
      let totalDeceasedCases = 0
      let totalActiveCases = 0

      statesList.forEach(state => {
        if (data[state.state_code]) {
          const {total} = data[state.state_code]
          totalConfirmedCases += total.confirmed ? total.confirmed : 0
          totalRecoveredCases += total.recovered ? total.recovered : 0
          totalDeceasedCases += total.deceased ? total.deceased : 0
        }
      })
      totalActiveCases =
        totalConfirmedCases - (totalRecoveredCases + totalDeceasedCases)

      const states = statesList.map(each => ({
        stateName: each.state_name,
        stateCode: each.state_code,
        confirmed: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.confirmed),
        recovered: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.recovered),
        deceased: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.deceased),
        other: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.other),
        population: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].meta.population),
      }))

      this.setState({
        totalActiveCases,
        totalRecoveredCases,
        totalDeceasedCases,
        totalConfirmedCases,
        isLoading: false,
        statesinfo: states,
      })
    }
  }

  renderNumbersInIndianFormat = number1 => {
    const number = number1.toString()
    let lastThree = number.substring(number.length - 3)
    const otherNumbers = number.substring(0, number.length - 3)
    if (otherNumbers !== '') lastThree = ','.concat(lastThree)
    const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree
    return res
  }

  renderAllNationalData = () => {
    const {
      totalConfirmedCases,
      totalActiveCases,
      totalRecoveredCases,
      totalDeceasedCases,
    } = this.state

    return (
      <>
        <div testid="countryWideConfirmedCases" className="stats-block-column">
          <p className="stats-title-red">Confirmed</p>
          <img
            src="https://res.cloudinary.com/avinashchinthapally/image/upload/v1637754802/Project%20Images/check-mark_1_lv6pdk.svg"
            className="stats-icon-red"
            alt="country wide confirmed cases pic"
          />

          <p className="stats-number-red">
            {this.renderNumbersInIndianFormat(totalConfirmedCases)}
          </p>
        </div>
        <div testid="countryWideActiveCases" className="stats-block-column">
          <p className="stats-title-blue">Active</p>
          <img
            src="https://res.cloudinary.com/avinashchinthapally/image/upload/v1637753075/Project%20Images/protection_1_lv7qls.svg"
            className="stats-icon-blue"
            alt="country wide active cases pic"
          />
          <p className="stats-number-blue">
            {this.renderNumbersInIndianFormat(totalActiveCases)}
          </p>
        </div>
        <div testid="countryWideRecoveredCases" className="stats-block-column">
          <p className="stats-title-green">Recovered</p>
          <img
            src="https://res.cloudinary.com/avinashchinthapally/image/upload/v1637753210/Project%20Images/recovered_1_grkgaa.svg"
            className="stats-icon-green"
            alt="country wide recovered cases pic"
          />
          <p className="stats-number-green">
            {this.renderNumbersInIndianFormat(totalRecoveredCases)}
          </p>
        </div>
        <div testid="countryWideDeceasedCases" className="stats-block-column ">
          <p className="stats-title-gray">Deceased</p>
          <img
            src="https://res.cloudinary.com/avinashchinthapally/image/upload/v1637753322/Project%20Images/breathing_1_u9ikvw.svg"
            className="stats-icon-gray"
            alt="country wide deceased cases pic"
          />
          <p className="stats-number-gray">
            {this.renderNumbersInIndianFormat(totalDeceasedCases)}
          </p>
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="Home-loader-container" testid="homeRouteLoader">
      <Loader type="Oval" color="#007BFF" height="50" width="50" />
    </div>
  )

  onClickAscendingSort = () => {
    const {statesinfo} = this.state
    const sortedList = statesinfo.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x > y ? 1 : -1
    })
    this.setState({statesinfo: sortedList})
  }

  onClickDescendingSort = () => {
    const {statesinfo} = this.state
    const sortedList = statesinfo.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x < y ? 1 : -1
    })
    this.setState({statesinfo: sortedList})
  }

  renderAllStatesList = () => {
    const {statesinfo} = this.state

    return (
      <div className="all-states-table" testid="stateWiseCovidDataTable">
        <div className="table-header">
          <div className="state-name-heading">
            <p className="table-header-title ">States/UT</p>
            <button
              className="order"
              type="button"
              testid="ascendingSort"
              onClick={this.onClickAscendingSort}
            >
              <FcGenericSortingAsc className="order-icon" />
            </button>
            <button
              className="order"
              type="button"
              testid="descendingSort"
              onClick={this.onClickDescendingSort}
            >
              <FcGenericSortingDesc className="order-icon" />
            </button>
          </div>
          <div className="other-tables-bar">
            <p className="table-header-title">Confirmed</p>
          </div>
          <div className="other-tables-bar">
            <p className="table-header-title">Active</p>
          </div>
          <div className="other-tables-bar">
            <p className="table-header-title">Recovered</p>
          </div>
          <div className="other-tables-bar">
            <p className="table-header-title">Deceased</p>
          </div>
          <div className="other-tables-bar">
            <p className="table-header-title">Population</p>
          </div>
        </div>
        <div className="state-wise-data-container">
          <ul className="other-tables">
            {statesinfo.map(each => (
              <StateListDetails key={each.stateCode} data={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  searchStarted = event => {
    const searchItem = event.target.value
    const searchResult = statesList.filter(data =>
      data.state_name.toLowerCase().includes(searchItem.toLowerCase()),
    )

    return this.setState({
      search: event.target.value,
      filteredSearchList: searchResult,
    })
  }

  showSearchList = () => {
    const {filteredSearchList} = this.state

    return (
      <ul
        className="search-result-container"
        testid="searchResultsUnorderedList"
      >
        {filteredSearchList.map(each => {
          console.log(each)
          return (
            <SearchItem
              key={each.state_code}
              stateName={each.state_name}
              stateCode={each.state_code}
              id={each.state_code}
            />
          )
        })}
      </ul>
    )
  }

  render() {
    const {isLoading, filteredSearchList, search} = this.state
    const showSearchList =
      filteredSearchList.length === 0 ? '' : this.showSearchList()

    return (
      <>
        <Header />
        <div className="main-container">
          <div className="container">
            <div className="search-container">
              <BsSearch testid="searchIcon" className="search-icon" />
              <input
                type="search"
                placeholder="Enter the State"
                className="search-bar"
                onChange={this.searchStarted}
              />
            </div>
            {search.length > 0 ? showSearchList : ''}
            {isLoading ? (
              this.renderLoadingView()
            ) : (
              <>
                <div className="country-stats">
                  {this.renderAllNationalData()}
                </div>
                <div className="state-table">{this.renderAllStatesList()}</div>
              </>
            )}
            <Footer className="footer" />
          </div>
        </div>
      </>
    )
  }
}

export default Home
