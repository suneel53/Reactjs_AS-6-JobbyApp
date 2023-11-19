import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-cont">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo"
        />
      </Link>
      <div className="header-lg-nav-cont">
        <ul className="header-list-cont">
          <Link to="/" className="li">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="li">
            <li>Jobs</li>
          </Link>
          <li>
            <button type="button" className="header-but" onClick={onLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default withRouter(Header)
