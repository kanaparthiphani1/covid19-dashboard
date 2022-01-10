import {Component} from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts'
import Loader from 'react-loader-spinner'
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

class ChartsDetails extends Component {
  state = {
    alldata: '',
    districtWiseDate: [],
    isLoading: true,
    category: 'confirmed',
    forOtherChart: '',
    districtSelected: 'Krishna',
    stateWithIds: [],
    districts: [],
  }

  componentDidMount() {
    this.getChartsData()
    this.getStateIds()
  }

  getStateIds = async () => {
    const apiUrl = `https://apis.ccbp.in/covid19-state-ids`
    const options = {
      method: 'GET',
    }
    const resp = await fetch(apiUrl, options)
    if (resp.ok) {
      const data = await resp.json()
      console.log('ids : ', data)
      this.setState({stateWithIds: data.states}, this.getDistricts)
    }
  }

  getDistricts = async () => {
    const {stateWithIds} = this.state
    const {stateCode} = this.props
    const stateObj = statesList.filter(
      eachData => eachData.state_code === stateCode,
    )
    const stateName = stateObj[0].state_name

    const id = stateWithIds.filter(
      eachObj => eachObj.state_name === stateName,
    )[0].state_id

    console.log('Id : ', id)

    const apiUrl = `https://apis.ccbp.in/covid19-districts-data/${id}`
    const options = {
      method: 'GET',
    }
    const resp = await fetch(apiUrl, options)
    if (resp.ok) {
      const data = await resp.json()
      console.log('district data : ', data)
      this.setState({districts: data.districts})
    }
  }

  getChartsData = async () => {
    const {stateCode} = this.props
    console.log(stateCode)
    const apiUrl = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      const dataDateWise = Object.keys(data[stateCode].dates)
      const districtWise = Object.keys(data[stateCode].districts)

      const particularState = dataDateWise.map(date => ({
        date,
        confirmed: data[stateCode].dates[date].total.confirmed,
        deceased: data[stateCode].dates[date].total.deceased,
        recovered: data[stateCode].dates[date].total.recovered,
        tested: data[stateCode].dates[date].total.tested,
        active:
          data[stateCode].dates[date].total.confirmed -
          (data[stateCode].dates[date].total.deceased +
            data[stateCode].dates[date].total.recovered),
      }))

      const particularStateForOtherChart = dataDateWise.map(date => ({
        date,
        confirmed: data[stateCode].dates[date].total.confirmed,
        deceased: data[stateCode].dates[date].total.deceased,
        recovered: data[stateCode].dates[date].total.recovered,
        tested: data[stateCode].dates[date].total.tested,
        active:
          data[stateCode].dates[date].total.confirmed -
          (data[stateCode].dates[date].total.deceased +
            data[stateCode].dates[date].total.recovered),
      }))

      const eachDistritEachDate = districtWise.map(eachDis => {
        const districtDateWise = Object.keys(
          data[stateCode].districts[eachDis].dates,
        )
        const eachDistrictDateWise = districtDateWise.map(date => ({
          date,
          confirmed:
            data[stateCode].districts[eachDis].dates[date].total.confirmed,
          deceased:
            data[stateCode].districts[eachDis].dates[date].total.deceased,
          recovered:
            data[stateCode].districts[eachDis].dates[date].total.recovered,
          tested: data[stateCode].districts[eachDis].dates[date].total.tested,
          active:
            data[stateCode].districts[eachDis].dates[date].total.confirmed -
            (data[stateCode].districts[eachDis].dates[date].total.deceased +
              data[stateCode].districts[eachDis].dates[date].total.recovered),
        }))
        return {
          district: eachDis,
          eachDistrictDateWise,
        }
      })

      console.log('eachDistritEachDate : ', eachDistritEachDate)

      this.setState({
        alldata: particularState,
        forOtherChart: particularStateForOtherChart,
        isLoading: false,
        districtWiseDate: eachDistritEachDate,
      })
    }
  }

  renderLoadingView = () => (
    <div className="Chart-loader-container" testid="timelinesDataLoader">
      <Loader type="Oval" color="#0b69ff" height="50" width="50" />
    </div>
  )

  barChart = () => {
    const {alldata, category} = this.state
    const barChartType = category.toLowerCase()

    const toptendata = alldata.slice(Math.max(alldata.length - 10, 0))
    let colortype = '#9A0E31'
    if (barChartType === 'confirmed') {
      colortype = '#9A0E31'
    } else if (barChartType === 'active') {
      colortype = '#0A4FA0'
    } else if (barChartType === 'recovered') {
      colortype = '#216837'
    } else if (barChartType === 'deceased') {
      colortype = '#474C57'
    }

    return (
      <div className="chart-wrapper">
        <BarChart width={1260} height={490} data={toptendata} barSize={45}>
          <XAxis
            dataKey="date"
            stroke={`${colortype}`}
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
            dy={10}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey={`${barChartType}`}
            fill={`${colortype}`}
            label={{position: 'top', fill: '#fff'}}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </div>
    )
  }

  graph = (type, color, districtSelected) => {
    const {districtWiseDate} = this.state
    console.log('forOtherChart 2 : ', districtWiseDate)

    const forOtherChart1 = districtWiseDate.filter(
      eachData => eachData.district === districtSelected,
    )
    console.log('forOtherChart1 : ', forOtherChart1)
    if (forOtherChart1.length > 0) {
      const forOtherChart = forOtherChart1[0].eachDistrictDateWise
      console.log('forOtherChart  :', forOtherChart)

      return (
        <div className="graph">
          <LineChart
            width={1160}
            height={420}
            data={forOtherChart}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis
              dataKey="date"
              style={{
                fontFamily: 'Roboto',
                fontWeight: 500,
                textTransform: 'uppercase',
              }}
              dy={3}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={type} stroke={color} />
          </LineChart>
        </div>
      )
    }
    return this.renderLoadingView()
  }

  setCatgory = event => {
    this.setState({category: event.target.value})
  }

  onDisChange = event => {
    this.setState({districtSelected: event.target.value})
  }

  allChartsView = () => {
    const {districtSelected, districts} = this.state
    console.log(districtSelected)

    return (
      <>
        <div className="select-out-cont">
          <h4 className="charts-sub-title">Select Category</h4>
          <select className="select-cont" onChange={this.setCatgory}>
            <option value="confirmed">Confirmed</option>
            <option value="active">Active</option>
            <option value="recovered">Recovered</option>
            <option value="deceased">Deceased</option>
          </select>
        </div>
        <div className="bar-chart-container">{this.barChart()}</div>
        <h1 className="charts-title">Daily Spread Trends</h1>
        <div className="select-out-cont">
          <h4 className="charts-sub-title">Select District</h4>
          <select className="select-cont" onChange={this.onDisChange}>
            {districts.length > 0 &&
              districts.map(eachDistrict => (
                <option value={eachDistrict.district_name}>
                  {eachDistrict.district_name}
                </option>
              ))}
            {/* <option value="Krishna">Krishna</option>
          <option value="Chittoor">Chittoor</option> */}
          </select>
        </div>
        <div testid="lineChartsContainer" className="bar-charts-container">
          <div className="charts confirmed-background">
            {this.graph('confirmed', '#FF073A', districtSelected)}
          </div>
          <div className="charts active-background">
            {this.graph('active', '#007BFF', districtSelected)}
          </div>
          <div className="charts recovered-background">
            {this.graph('recovered', '#27A243', districtSelected)}
          </div>
          <div className="charts deceased-background">
            {this.graph('deceased', '#6C757D', districtSelected)}
          </div>
          <div className="charts tested-background">
            {this.graph('tested', '#9673B9', districtSelected)}
          </div>
        </div>
      </>
    )
  }

  render() {
    const {isLoading, stateWithIds} = this.state
    console.log('stateWithIds', stateWithIds)

    const showAllData = isLoading
      ? this.renderLoadingView()
      : this.allChartsView()
    return <div className="charts-container">{showAllData}</div>
  }
}

export default ChartsDetails
