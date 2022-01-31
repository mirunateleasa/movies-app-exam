import {EventEmitter} from 'fbemitter'
//const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
const SERVER = 'http://localhost:8080'


class CrewMemberstore {
      constructor ()
      {
            this.members = []
            this.emitter = new EventEmitter()
      }

      async getAll ()
      {
            try{
                  let response = await fetch (`${SERVER}/movies/members`);
                  let data = await response.json()
                  this.members = data
                  this.emitter.emit('GET_ALL_MEMBERS_SUCCESS')
            }
            catch (err)
            {
                  console.warn(err);
                  this.emitter.emit('GET_ALL_MEMBERS_ERROR');
            }
      }

      async getAllInMovie (movieId)
      {
            try{
                  let response = await fetch (`${SERVER}/movies/${movieId}/members`)
                  let data = await response.json()
                  this.members = data
                  this.emitter.emit('GET_MEMBERS_FROM_MOVIE_SUCCESS');
            }
            catch(err)
            {
                  console.warn(err)
                  this.emitter.emit('GET_MEMBERS_FROM_MOVIE_ERROR')
            }
      }

      async addMember (movieId, member)
      {
            try{
                  await fetch (`${SERVER}/movies/${movieId}/members`, {
                        method : 'post',
                        body : JSON.stringify(member),
                        headers: new Headers({
                              "Access-Control-Allow-Origin": "*",
                              "Content-Type": "application/json",
                        })
                  })
                  console.log(member)
                  this.emitter.emit('ADD_MEMBER_SUCCESS')
                  this.getAllInMovie(movieId)
            }
            catch (err)
            {
                  console.warn(err);
                  this.emitter.emit('ADD_MEMBER_ERROR');
            }
      }

      async deleteMember (movieId, memberId)
      {
            try{
                  await fetch (`${SERVER}/movies/${movieId}/members/${memberId}`, {
                        method : 'delete'
                  })
                  this.emitter.emit('DELETE_MEMBER_SUCCESS');
                  this.getAllInMovie(movieId)
            }
            catch (err)
            {
                  console.warn(err)
                  this.emitter.emit('DELETE_MEMBER_ERROR')
            }
      }

      async updateMember (movieId, memberId, newMember)
      {
            try{
                  await fetch (`${SERVER}/movies/${movieId}/members/${memberId}`, {
                        method : 'put',
                        body : JSON.stringify(newMember),
                        headers: new Headers({
                              "Access-Control-Allow-Origin": "*",
                              "Content-Type": "application/json",
                        })
                  })
                  this.emitter.emit('UPDATE_MEMBER_SUCCESS');
                  this.getAllInMovie(movieId)
            }
            catch (err)
            {
                  console.warn(err)
                  this.emitter.emit('UPDATE_MEMBER_ERROR')
            }
      }
}

export default CrewMemberstore;