import './Movies.css'
import MovieStore from '../../Stores/MovieStore'
import { useState } from 'react'

function MovieAddForm (props)
{
      const [movTitle, setMovTitle] = useState('');
      const [movCategory, setMovCategory] = useState('');
      const [movPubDate, setMovPubDate] = useState(Date.UTC(2022, 1, 31));


      const addMovie = (event) =>
      {
            props.onAdd({
                  title: movTitle,
                  category: movCategory,
                  pubDate: movPubDate
            })
            console.log(movCategory);
            document.getElementById('titleIn').value = ''
            document.getElementById('categoryIn').value = ''
            document.getElementById('pubDateIn').value = ''
      }

      return (
            <>
                  <input id='titleIn' type='text' placeholder = 'Movie Title' onChange={(event) => setMovTitle(event.target.value)} name="movTitle" className="formInput"/>
                  
                  <select id="categoryIn" placeholder='Category' onChange={(event) => {setMovCategory(event.target.value)}} name="movCategory" className="formInput">
                        <option value="COMEDY">Comedy</option>
                        <option value="HORROR">Horror</option>
                        <option value="ACTION">Action</option>
                        <option value="DOCUMENTARY">Documentary</option>
                  </select>

                  <input id='pubDateIn' type='date' placeholder = 'Publication Date' onChange={(event) => setMovPubDate(event.target.value)} name="movPubDate" className="formInput"/>
                  
                  <input type='button' value = 'Add Movie' id = 'btnFormDone' onClick={addMovie}/>
            </>
      )
}

export default MovieAddForm;