import {BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJob = props => {
  const {details} = props
  const {
    companyLogoUrl,
    emplymentType,
    jobDescription,
    location,
    rating,
    title,
  } = details
  return (
    <li className="similar-job-item-cont">
      <div className="logo-title-cont">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-logo"
        />
        <div className="title-rating-cont">
          <h1 className="similar-job-head">{title}</h1>
          <div className="rating-cont">
            <BsStarFill />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <h1>Description</h1>
      <p>{jobDescription}</p>
      <div className="location-jobtype-cont">
        <div className="similiar-location-cont">
          <MdLocationOn className="location-icon" />
          <p className="location-text">{location}</p>
        </div>
        <div className="similiar-location-cont">
          <BsFillBriefcaseFill className="brief-case-icon" />
          <p className="location-text">{emplymentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJob
