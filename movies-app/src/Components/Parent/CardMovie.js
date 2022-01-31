import img1 from '../../Resources/movie.jpg'

function CardMovie (props)
{
      const {movie} = props;

      const deleteMovie = (movieId) =>
      {
            props.onDelete(movie.id)
      }

      const onClick = () =>
      {
            props.onClick(movie)
      }

      return (
            <div id="card" onClick={onClick}>
                  <img className = 'cardImage' src={img1}></img>
                  <h3 className='cardTitle cardDetail'>{movie.title}</h3>
                  <h4 className='cardSubtitle cardDetail'>{movie.category}</h4>
                  <h5 className='cardSubSubTitle cardDetail'>{movie.pubDate}</h5>
                  <input type='button' value = 'Delete' onClick={deleteMovie}></input>
            </div>
      )
}

export default CardMovie