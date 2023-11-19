import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import FilterGroup from '../FilterGroup'
import JobCard from '../JobCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITAIL',
  success: 'SUCCESS',
  fail: 'FAIL',
  inprogress: 'INPROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    employeeType: [],
    minSalary: 0,
    searchInput: '',
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const {employeeType, minSalary, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employeeType.join()}&minimum_package=${minSalary}&search=${searchInput}`
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.fail})
    }
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    const renderJobsList = jobsList.length > 0
    return renderJobsList ? (
      <ul className="jobslist-cont">
        {jobsList.map(each => (
          <JobCard details={each} key={each.id} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-image"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    )
  }

  renderFailView = () => (
    <div className="jobs-fail-view-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-fail-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        className="jobs-fail-but"
        data-testid="button"
        onClick={this.getJobs}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.inprogress:
        return this.renderLoadingView()
      case apiStatusConstants.fail:
        return this.renderFailView()
      default:
        return null
    }
  }

  changeEmployeList = type => {
    this.setState(
      prevState => ({
        employeeType: [...prevState.employeeType, type],
      }),
      this.getJobs,
    )
  }

  changeSalary = sal => {
    this.setState({minSalary: sal}, this.getJobs)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  render() {
    return (
      <div className="jobs-main-cont">
        <Header />
        <div className="jobs-cont">
          <div className="jobs-filter-cont">
            <ProfileDetails />
            <FilterGroup
              employmentTypesList={employmentTypesList}
              changeEmployeList={this.changeEmployeList}
              salaryRangesList={salaryRangesList}
              changeSalary={this.changeSalary}
            />
          </div>
          <div className="jobs-search-and-jobs-cont">
            <div className="searchInput-cont">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-input-button-desktop"
                onClick={this.getJobs}
              >
                <BsSearch aria-label="search" className="search-icon" />
              </button>
            </div>
            {this.renderAllJobs()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
