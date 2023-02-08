import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VaccinationCoverage extends Component {
  state = {
    barGraphData: '',
    pieChartData: '',
    pieChartGenderData: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(vaccinationDataApiUrl, options)
    const data = await response.json()
    const barData = data.last_7_days_vaccination
    const pieData = data.vaccination_by_age
    const halfPieData = data.vaccination_by_gender
    if (response.ok === true) {
      this.setState({
        barGraphData: barData,
        pieChartData: pieData,
        pieChartGenderData: halfPieData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  DataFormatter = number => number.toString()

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="failure-msg">Something went wrong</h1>
    </div>
  )

  renderBarChart() {
    const {barGraphData, pieChartData, pieChartGenderData} = this.state
    return (
      <>
        <div className="barchart-container">
          <h1 className="vaccination-coverage">Vaccination Coverage</h1>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={barGraphData}
              margin={{
                top: 5,
              }}
            >
              <XAxis
                tickFormatter={barGraphData.vaccine_date}
                tick={{
                  stroke: 'gray',
                  strokeWidth: 1,
                }}
              />
              <YAxis
                tickFormatter={this.DataFormatter}
                tick={{
                  stroke: 'gray',
                  strokeWidth: 0,
                }}
              />
              <Legend
                wrapperStyle={{
                  padding: 30,
                }}
              />
              <Bar
                dataKey="dose_2"
                name="Dose 1"
                fill="#5a8dee"
                barSize="20%"
              />
              <Bar
                dataKey="dose_1"
                name="Dose 2"
                fill="#f54394"
                barSize="20%"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <VaccinationByGender pieChartGenderData={pieChartGenderData} />
        <VaccinationByAge pieChartData={pieChartData} />
      </>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBarChart()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default VaccinationCoverage
