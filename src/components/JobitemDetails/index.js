import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'

import Header from '../Header'
import SkillCard from '../SkillCard'
import SimilarJob from '../SimilarJob'

import './index.css'

const apiStatusConstants = {
  initial: 'INITAIL',
  success: 'SUCCESS',
  fail: 'FAIL',
  inprogress: 'INPROGRESS',
}

class JobitemDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getFormattedSimilarData = data => ({
    companyLogoUrl: data.company_logo_url,
    emplymentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    emplymentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getJobData = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = this.getFormattedData(data.job_details)
      const updatedSimilarJobsData = data.similar_jobs.map(eachsimilar =>
        this.getFormattedSimilarData(eachsimilar),
      )
      console.log(updatedData)
      console.log(updatedSimilarJobsData)
      this.setState({
        jobData: updatedData,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.fail})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsView = () => {
    console.log('jobdetails success')
    const {jobData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      emplymentType,
      packagePerAnnum,
      companyWebsiteUrl,
      jobDescription,
      skills,
      lifeAtCompany,
    } = jobData
    const {description, imageUrl} = lifeAtCompany
    console.log('=====')
    console.log(skills)
    return (
      <div className="job-item">
        <div className="job-details-cont">
          <div className="companylogo-title-cont">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="comapany-logo-image"
            />
            <div className="title-rating-cont">
              <h1 className="title-head">{title}</h1>
              <div className="rating-cont">
                <BsStarFill className="rating-icon" />
                <p className="card-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="loaction-package-cont">
            <div className="loaction-jobType-cont">
              <div className="loaction-cont">
                <MdLocationOn className="location-icon" />
                <p className="location-text">{location}</p>
              </div>
              <div className="loaction-cont">
                <BsFillBriefcaseFill className="brief-case-icon" />
                <p className="location-text">{emplymentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="description-head-comapanylink-cont">
            <h1>Description</h1>
            <div className="visitlink-cont">
              <a href={companyWebsiteUrl} className="visit-heading">
                Visit
              </a>
              <BiLinkExternal className="visit-icon" />
            </div>
          </div>
          <p>{jobDescription}</p>
          <h1>Skills</h1>
          <ul className="skills-list-cont">
            {skills.map(eachskill => (
              <SkillCard key={eachskill.name} details={eachskill} />
            ))}
          </ul>
          <h1>Life at Company</h1>
          <div className="lifeatcompany-des-cont">
            <p>{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="lifeatcomp-image"
            />
          </div>
        </div>
        <h1 className="similar-head">Similar Jobs</h1>
        <ul className="similarjobs-list-cont">
          {similarJobsData.map(eachjob => (
            <SimilarJob key={eachjob.id} details={eachjob} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailView = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <div className="jobDetails-fail-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="jobdetails-fail-image"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button
          type="button"
          className="jobitem-fail-but"
          id="button"
          onClick={this.getJobData}
        >
          Retry
        </button>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inprogress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.fail:
        return this.renderFailView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-items-details-cont">{this.renderJobDetails()}</div>
      </>
    )
  }
}

export default JobitemDetails
