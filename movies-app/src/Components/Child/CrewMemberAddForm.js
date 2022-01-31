import '../Parent/Movies.css'
import MovieStore from '../../Stores/MovieStore'
import { useState } from 'react'

function CrewMemberAddForm (props)
{
      const [memberName, setMemberName] = useState('');
      const [memberRole, setMemberRole] = useState('');


      const addMember = (event) =>
      {
            props.onAdd({
                  name: memberName,
                  role: memberRole
            })
            document.getElementById('nameIn').value = ''
            document.getElementById('roleIn').value = ''
      }

      return (
            <>
                  <input id='nameIn' type='text' placeholder = 'Member Name' onChange={(event) => setMemberName(event.target.value)} name="memberName" className="formInput"/>
                  
                  <select id="roleIn" placeholder='Role' onChange={(event) => {setMemberRole(event.target.value)}} name="memberRole" className="formInput">
                        <option value="DIRECTOR">Director</option>
                        <option value="WRITER">Writer</option>
                        <option value="ACTOR">Actor</option>
                  </select>
                  
                  <input type='button' value = 'Add Member' id = 'btnFormDone' onClick={addMember}/>
            </>
      )
}

export default CrewMemberAddForm;