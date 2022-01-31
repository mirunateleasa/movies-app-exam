import {EventEmitter} from 'fbemitter'
//const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
const SERVER = 'http://localhost:8080'


class MovieStore {
      constructor ()
      {
            this.movies = []
            this.emitter = new EventEmitter()
      }

      async getAll ()
      {
            try {
                  let response = await fetch(`${SERVER}/movies`)
                  let data = await response.json()
                  this.movies = data
                  this.emitter.emit ('GET_MOVIES_SUCCESS')
            }
            catch(error)
            {
                  console.warn(error);
                  this.emitter.emit ('GET_MOVIES_ERROR')
            }
      }

      async getById (movieId)
      {
            try {
                  let response = await fetch(`${SERVER}/movies/${movieId}`)
                  let data = await response.json()
                  this.movies = data
                  this.emitter.emit ('GET_MOVIES_SUCCESS')
            }
            catch(error)
            {
                  console.warn(error);
                  this.emitter.emit ('GET_MOVIES_ERROR')
            }
      }


      async addMovie (movie)
      {
            try {
                  console.log(movie)
                  await fetch (`${SERVER}/movies`, {
                        method : 'post',
                        body: JSON.stringify(movie),
                        headers: new Headers({
                          "Access-Control-Allow-Origin": "*",
                          "Content-Type": "application/json",
                        })
                  })
                  this.emitter.emit('ADD_MOVIE_SUCCESS')
                  this.getAll();
            }
            catch (err){
                  console.warn(err)
                  this.emitter.emit('ADD_MOVIE_ERROR');
            }
      }

      async deleteMovie (movieId)
      {
            try{
                  await fetch (`${SERVER}/movies/${movieId}`, {
                        method : 'delete'
              })
                  this.emitter.emit('DELETE_MOVIE_SUCCESS')
                  this.getAll()
            }
            catch (err){
                  console.warn(err)
                  this.emitter.emit ('DELETE_MOVIE_ERROR')
            }
      }

      async updateMovie (movieId, newMovie)
      {
            try{
                  await fetch (`${SERVER}/movies/${movieId}`, {
                        method : 'put',
                        body : JSON.stringify (newMovie),
                        headers: new Headers({
                          "Access-Control-Allow-Origin": "*",
                          "Content-Type": "application/json",
                        })
                  })
                  this.emitter.emit('UPDATE_MOVIE_SUCCESS');
                  this.getAll()
            }
            catch (err)
            {
                  console.warn(err);
                  this.emitter.emit('UPDATE_MOVIE_ERROR');
            }
      }

      async exportMovies ()
      {
            try {
                  await fetch (`${SERVER}/movies/json/export`)
                  this.emitter.emit ('EXPORT_MOVIES_SUCCESS');
            }
            catch (error)
            {
                  console.warn(error);
                  this.emitter.emit('EXPORT_MOVIES_ERROR');
            }
      }

      async importMovies ()
      {
            try {
                  let response = await fetch (`${SERVER}/movies/json/import`)
                  let data = await response.json();
                  this.movies = data;
                  this.emitter.emit ('IMPORT_MOVIES_SUCCESS');
            }
            catch (error)
            {
                  console.warn(error);
                  this.emitter.emit('IMPORT_MOVIES_ERROR');
            }
      }

      async getAllFiltered(byCategory)
      {
            try {
                  let response = await fetch(`${SERVER}/movies/byCategory/${byCategory}`)
                  let data = await response.json()
                  this.movies = data
                  this.emitter.emit ('GET_MOVIES_SUCCESS')
            }
            catch(error)
            {
                  console.warn(error);
                  this.emitter.emit ('GET_MOVIES_ERROR')
            }
      }

      async getAllSorted(byAttribute)
      {
            try {
                  let response = await fetch(`${SERVER}/movies/sorted/${byAttribute}`)
                  let data = await response.json()
                  this.movies = data
                  this.emitter.emit ('GET_MOVIES_SUCCESS')
            }
            catch(error)
            {
                  console.warn(error);
                  this.emitter.emit ('GET_MOVIES_ERROR')
            }
      }
}

export default MovieStore;