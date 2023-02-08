import VaccinationCoverage from '../VaccinationCoverage'

import './index.css'

const CowinDashboard = () => (
  <div className="bg-container">
    <div className="icon-word-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
        className="website-logo"
        alt="website logo"
      />
      <h1 className="cowin-heading">CoWIN</h1>
    </div>
    <h1 className="cowin-vaccination-heading">CoWIN Vaccination in India</h1>
    <div className="container">
      <VaccinationCoverage />
    </div>
  </div>
)

export default CowinDashboard
