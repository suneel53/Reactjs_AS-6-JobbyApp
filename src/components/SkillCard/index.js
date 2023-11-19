import './index.css'

const SkillCard = props => {
  const {details} = props
  const {imageUrl, name} = details
  return (
    <li className="skill-item-cont">
      <img src={imageUrl} alt="name" className="skillitem-logo" />
      <p>{name}</p>
    </li>
  )
}

export default SkillCard
