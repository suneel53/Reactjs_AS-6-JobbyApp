import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

class JobCard extends Component {
  render() {
    const {details} = this.props
    const {
      title,
      rating,
      companyLogoUrl,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      id,
    } = details
    return (
      <Link to={`/jobs/${id}`} className="link-item">
        <li className="jobcard-cont">
          <div className="comapanylogo-and-heading-cont">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="title-rating-cont">
              <h1 className="card-head">{title}</h1>
              <div className="rating-cont">
                <BsStarFill className="rating-icon" />
                <p className="card-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="loaction-des-cont">
            <div className="loaction-jobType-cont">
              <div className="loaction-cont">
                <MdLocationOn className="location-icon" />
                <p className="location-text">{location}</p>
              </div>
              <div className="loaction-cont">
                <BsFillBriefcaseFill className="brief-case-icon" />
                <p className="location-text">{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr className="separator" />
          <h1 className="description-head">Description</h1>
          <p>{jobDescription}</p>
        </li>
      </Link>
    )
  }
}

export default JobCard
