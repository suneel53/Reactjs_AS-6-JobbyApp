import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errMsg: '',
    showSubmitError: false,
  }

  onchangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  onSubmitFail = errMsg => {
    this.setState({errMsg, showSubmitError: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFail(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-cont">
        <div className="login-cont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
          <form className="form-cont" onSubmit={this.submitForm}>
            <label htmlFor="uname" className="label">
              USERNAME
            </label>
            <input
              id="uname"
              className="input"
              type="text"
              placeholder="Username"
              onChange={this.onchangeUserName}
              value={username}
            />
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              id="password"
              className="input"
              type="password"
              placeholder="Password"
              onChange={this.onChangePassword}
              value={password}
            />
            <button type="submit" className="login-but">
              Login
            </button>
            {showSubmitError && <p>*{errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
