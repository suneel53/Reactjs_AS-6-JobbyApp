import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const onJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <div className="home-cont">
      <Header />
      <div className="home-below-cont">
        <h1>Find The Job That Fits Your Life</h1>
        <p>
          Millions of people are searching for jobs, salary infomation, company
          reviews. Find the jobs that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="home-but">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}
export default Home
