import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITAIL',
  success: 'SUCCESS',
  fail: 'FAIL',
  inprogress: 'INPROGRESS',
}

class ProfileDetails extends Component {
  state = {profileDetails: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const url = 'https://apis.ccbp.in/profile'
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const profileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({profileDetails, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.fail})
    }
  }

  renderProfileView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-cont">
        <img src={profileImageUrl} alt="profile img" className="profile-logo" />
        <h1 className="profile-head">{name}</h1>
        <p className="profile-des">{shortBio}</p>
      </div>
    )
  }

  renderFailView = () => (
    <div className="profile-fail-cont">
      <button
        type="button"
        className="profile-fail-but"
        id="button"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileView()
      case apiStatusConstants.inprogress:
        return this.renderLoading()
      case apiStatusConstants.fail:
        return this.renderFailView()
      default:
        return null
    }
  }
}
export default ProfileDetails
