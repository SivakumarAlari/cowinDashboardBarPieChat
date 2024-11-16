import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

import './index.css'

const statusConstants = {
  onInitial: 'INITIAL',
  onSuccess: 'SUCCESS',
  onLoading: 'LOADING',
  onFailure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    covidData: [],
    activeStatus: statusConstants.onInitial,
    lastSevenDaysData: [],
    vaccinationByAgeData: [],
    vaccinationByGenderData: [],
  }

  componentDidMount() {
    this.getApiData()
  }

  getApiData = async () => {
    this.setState({activeStatus: statusConstants.onLoading})
    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'

    try {
      const response = await fetch(covidVaccinationDataApiUrl)

      if (response.ok) {
        console.log("It's Success")
        const fetchedData = await response.json()
        console.log(fetchedData)
        const updatedData = fetchedData.last_7_days_vaccination.map(
          eachDay => ({
            dose1: eachDay.dose_1,
            dose2: eachDay.dose_2,
            vaccineDate: eachDay.vaccine_date,
          }),
        )
        const updatedAgeData = fetchedData.vaccination_by_age.map(eachAge => ({
          age: eachAge.age,
          count: eachAge.count,
        }))
        const updateGenderData = fetchedData.vaccination_by_gender.map(
          eachGender => ({
            count: eachGender.count,
            gender: eachGender.gender,
          }),
        )
        this.setState({
          lastSevenDaysData: updatedData,
          vaccinationByAgeData: updatedAgeData,
          vaccinationByGenderData: updateGenderData,
          activeStatus: statusConstants.onSuccess,
        })
      } else {
        console.log('Fetch Failed')
        this.setState({activeStatus: statusConstants.onFailure})
      }
    } catch (error) {
      console.log('Fetch Failed')
      this.setState({activeStatus: statusConstants.onFailure})
    }
  }

  getVaccinationCoverage = () => {
    const {lastSevenDaysData} = this.state
    return (
      <div className="chart-container">
        <h1 className="description">Vaccination Coverage</h1>
        <VaccinationCoverage data={lastSevenDaysData} />
      </div>
    )
  }

  getVaccinationByage = () => {
    const {vaccinationByAgeData} = this.state
    return (
      <div className="chart-container">
        <h1 className="description">Vaccination by Age</h1>
        <VaccinationByAge data={vaccinationByAgeData} />
      </div>
    )
  }

  getVaccinationByGender = () => {
    const {vaccinationByGenderData} = this.state
    return (
      <div className="chart-container">
        <h1 className="description">Vaccination by gender</h1>
        <VaccinationByGender data={vaccinationByGenderData} />
      </div>
    )
  }

  renderSuccessView = () => {

 
    return (
      <div>
        {this.getVaccinationCoverage()}
        {this.getVaccinationByGender()}
        {this.getVaccinationByage()}
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  getFinalRenderView = () => {
    const {activeStatus} = this.state
    switch (activeStatus) {
      case statusConstants.onSuccess:
        return this.renderSuccessView()
      case statusConstants.onFailure:
        return this.renderFailureView()
      case statusConstants.onLoading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="website-logo-name-con">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="website-logo"
            />
            <h1 className="website-name">Co-Win</h1>
          </div>
          <h1 className="description">CoWIN Vaccination in India</h1>

          {this.getFinalRenderView()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard

// import {Component} from 'react'
// import {Loader} from 'react-loader-spinner'
// import VaccinationCoverage from '../VaccinationCoverage'
// import VaccinationByAge from '../VaccinationByAge'
// import VaccinationByGender from '../VaccinationByGender'
// import './index.css'

// const constantStatus = {
//   initial: 'INITIAL',
//   isProgress: 'PROGRESS',
//   failure: 'FAILURE',
//   success: 'SUCCESS',
// }

// class CowinDashboard extends Component {
//   state = {
//     lastSevenDaysList: [],
//     vacationByAgeList: [],
//     vacationByGenderList: [],
//     apiStatus: constantStatus.initial,
//   }

//   componentDidMount() {
//     this.getVacationDetails()
//   }

//   getVaccinationDetails = async () => {
//     this.setState({apiStatus: constantStatus.isProgress})
//     const url = 'https://apis.ccbp.in/covid-vaccination-data'
//     try {
//       const response = await fetch(url)
//       if (!response.ok) {
//         throw new Error('Failed to fetch data')
//       }
//       const data = await response.json()
//       const lastSevenDaysList = data.last_7_days_vaccination.map(day => ({
//         vaccineDate: day.vaccine_date,
//         doseOne: day.dose_1,
//         doseTwo: day.dose_2,
//       }))
//       const vaccinationByAgeList = data.vaccination_by_age.map(age => ({
//         age: age.age,
//         count: age.count,
//       }))
//       const vaccinationByGenderList = data.vaccination_by_gender.map(
//         gender => ({
//           gender: gender.gender,
//           count: gender.count,
//         }),
//       )
//       this.setState({
//         lastSevenDaysList,
//         vaccinationByAgeList,
//         vaccinationByGenderList,
//         apiStatus: constantStatus.success,
//       })
//     } catch (error) {
//       this.setState({apiStatus: constantStatus.failure})
//     }
//   }

//   failureView = () => (
//     <div className="failure-container">
//       <img
//         src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
//         alt="failure view"
//         className="failure-image"
//       />
//       <h1 className="something-wrong-heading">Something went wrong </h1>
//     </div>
//   )

//   loaderRenderView = () => (
//     <div data-testid="loader">
//       <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
//     </div>
//   )

//   vacationCoverage = () => {
//     const {lastSevenDaysList} = this.state
//     return (
//       <div className="coverage-container">
//         <h1 className="coverage-heading">Vacation Coverage </h1>
//         <div>
//           <VaccinationCoverage data={lastSevenDaysList} />
//         </div>
//       </div>
//     )
//   }

//   vacationByAge = () => {
//     const {vacationByAgeList} = this.state
//     return (
//       <div className="byAge-container">
//         <h1 className="coverage-heading">Vacation by gender </h1>
//         <div>
//           <VaccinationByAge data={vacationByAgeList} />
//         </div>
//       </div>
//     )
//   }

//   vacationByGender = () => {
//     const {vacationByGenderList} = this.state
//     return (
//       <div className="byGender-container">
//         <h1 className="coverage-heading">Vacation by gender </h1>
//         <div>
//           <VaccinationByGender data={vacationByGenderList} />
//         </div>
//       </div>
//     )
//   }

//   genderResultView = () => {
//     const {lastSevenDaysList, vaccinationByAgeList, vaccinationByGenderList} =
//       this.state
//     console.log(lastSevenDaysList)
//     console.log(vaccinationByAgeList)
//     console.log(vaccinationByGenderList)
//     return (
//       <div className="outPut-container">
//         {this.vacationCoverage()}
//         {this.vacationByGender()}
//         {this.vacationByAge()}
//       </div>
//     )
//   }

//   getFinalOutputs = () => {
//     const {apiStatus} = this.state

//     switch (apiStatus) {
//       case constantStatus.success:
//         return this.genderResultView()
//       case constantStatus.isProgress:
//         return this.loaderRenderView()
//       case constantStatus.failure:
//         return this.failureView()
//       default:
//         return null
//     }
//   }

//   render() {
//     return (
//       <div className="main-container">
//         <div className="adjust-container">
//           <img
//             src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
//             alt=" website logo"
//             className="logoImgDesign"
//           />
//           <h1 className="coWin-heading">Co-WIN </h1>
//         </div>
//         <h1 className="indiaCowin-heading">CoWIN Vaccination in India </h1>
//         <div className="result-container">{this.getFinalOutputs()}</div>
//       </div>
//     )
//   }
// }

// export default CowinDashboard
