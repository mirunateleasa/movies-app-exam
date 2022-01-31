import NavBar from "../NavBar/NavBar";
import '../Parent/Movies.css'
import MovieStore from '../../Stores/MovieStore'
import React, { Component, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MovieAddForm from "../Parent/MovieAddForm";
import CardMovie from "../Parent/CardMovie";
import CardMember from "./CardMember";
import CrewMemberStore from '../../Stores/CrewMemberStore'
import CrewMemberAddForm from "./CrewMemberAddForm";

function OneMovie (props) 
{
      const store = new CrewMemberStore();
      const movieStore = new MovieStore();
      const { movieId } = useParams();
      const [movie, setMovie] = useState({});
      const [members, setMembers] = useState([])

      useEffect(() => { 
            document.getElementById('inputCol').style.display = 'none'
            movieStore.getById(movieId);
            movieStore.emitter.addListener('GET_MOVIES_SUCCESS', () => 
            {
                  setMovie(movieStore.movies);
                  store.getAllInMovie(movieId);
                  store.emitter.addListener('GET_MEMBERS_FROM_MOVIE_SUCCESS', () => {
                        setMembers(store.members)
                  })
            })


      }, [])

      const handleOpenForm = (event) =>
      {
            document.getElementById('inputCol').style.display = 'flex'
      }

      const updateMovie = (newMovie) =>
      {
            movieStore.updateMovie(movieId, newMovie);
            window.location.reload()
      }

      const deleteMember = (memberId) =>
      {
            store.deleteMember(movie.id, memberId);
            window.location.reload()
      }

      const goToMoviePage = (movieId) =>
      {
            //.location.href = `movies/${movieId}`
      }

      const addMember = (member) => 
      {
            store.addMember(movie.id, member);
            window.location.reload();
      }

      return (
            <div id="oneMovieContainer">
                  <div className="row" id="navBarRow">
                        <NavBar activeIndex = {2}></NavBar>
                  </div>
                  <div className="row" id = 'displayMovieRow'>
                        <CardMovie movie = {movie}></CardMovie>
                        <h2>Update {movie.title}: </h2>
                        <MovieAddForm onAdd = {updateMovie}></MovieAddForm>
                  </div>
                  <div className="row" id="cardRow">
                        <h4>Crew members of {movie.title}:</h4>
                  {
                        members.map (member => <CardMember key= {member.id} member = {member} onDelete = {deleteMember}></CardMember>)
                  }
                  </div>
                  <div className="row" id="inputRow">
                        <div className="col" id="inputCol">
                             <CrewMemberAddForm onAdd = {addMember}></CrewMemberAddForm>
                        </div>
                        <div className="col" id="buttonCol">
                              <input type='button' value='+' id = 'addBtn' onClick={handleOpenForm}></input>
                        </div>
                  </div>
                  
            </div>
      )
}

export default OneMovie