import img1 from '../../Resources/member.jpg'

function CardMember (props)
{
      const {member} = props;

      const deleteMember = (memberId) =>
      {
            props.onDelete(member.id)
      }

      const onClick = () =>
      {
            props.onClick(member)
      }

      return (
            <div id="cardMember" onClick={onClick}>
                  <img className = 'cardImage' src={img1}></img>
                  <h3 className='cardTitle cardDetail'>{member.name}</h3>
                  <h4 className='cardSubtitle cardDetail'>{member.role}</h4>
                  <input type='button' value = 'Delete' onClick={deleteMember}></input>
            </div>
      )
}

export default CardMember