import {Component} from 'react'
import './index.css'

class FilterGroup extends Component {
  renderTypeofEmployement = () => {
    const {employmentTypesList} = this.props
    return (
      <div className="type-employement-cont">
        <h1 className="employement-type-head">Type of Employment</h1>
        <ul className="employment-type-ulist-cont">
          {employmentTypesList.map(each => {
            const {changeEmployeList} = this.props
            const onSelectEmployeeType = event => {
              changeEmployeList(event.target.value)
            }
            return (
              <li key={each.employmentTypeId} onChange={onSelectEmployeeType}>
                <input
                  type="checkbox"
                  id={each.employmentTypeId}
                  className="check-input"
                  value={each.employmentTypeId}
                />
                <label htmlFor={each.employmentTypeId} className="check-label">
                  {each.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  renderSalaryRange = () => {
    const {salaryRangesList} = this.props
    return (
      <div className="type-employement-cont">
        <h1 className="employement-type-head">Salary Range</h1>
        <ul className="employment-type-ulist-cont">
          {salaryRangesList.map(each => {
            const {changeSalary} = this.props
            const onClickSalary = () => {
              changeSalary(each.salaryRangeId)
            }
            return (
              <li key={each.salaryRangeId} onClick={onClickSalary}>
                <input
                  type="radio"
                  id={each.salaryRangeId}
                  value={each.label}
                  name="salary"
                />
                <label htmlFor={each.salaryRangeId} className="salary-label">
                  {each.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <>
        {this.renderTypeofEmployement()}
        {this.renderSalaryRange()}
      </>
    )
  }
}

export default FilterGroup
