import NavBar from "../NavBar/NavBar";
import './Movies.css'
import MovieStore from '../../Stores/MovieStore'
import React, { Component, useEffect, useState } from 'react';

import MovieAddForm from "./MovieAddForm";
import CardMovie from "./CardMovie";
import OneMovie from "../Child/OneMovie";
import { Toast } from 'primereact/toast';

function Movies () 
{
      const store = new MovieStore();
      const [movies, setMovies] = useState([])
      let toast = new Toast()

      useEffect(() => { 
            document.getElementById('inputCol').style.display = 'none'
            store.getAll()
            store.emitter.addListener('GET_MOVIES_SUCCESS', () => {
                  setMovies(store.movies)
            })
      }, [])

      useEffect(() => {
            console.log(movies)
      }, [movies])

      const handleOpenForm = (event) =>
      {
            document.getElementById('inputCol').style.display = 'flex'
      }

      const addMovie = (movie) =>
      {
            store.addMovie(movie);
            window.location.reload();
      }

      const deleteMovie = (movieId) =>
      {
            store.deleteMovie(movieId);
      }

      const setMovCategory = (category) =>
      {
            store.getAllFiltered(category);
            store.emitter.addListener('GET_MOVIES_SUCCESS', () => {
                  if (store.movies.length > 0)
                        setMovies(store.movies)
                  else 
                  {
                        toast.show({severity: 'error', summary: 'Not Found', detail: `No Movie in category ${category}`});
                  }
            })
      }

      const setSorting = (attribute) =>
      {
            store.getAllSorted(attribute)
            store.emitter.addListener('GET_MOVIES_SUCCESS', () => {
                  if (store.movies.length > 0)
                        setMovies(store.movies)
            })
      }
      

      return (
            <>
            <Toast ref={(el) => toast = el} />
            <div id="movieContainer">
                  <div className="row" id="navBarRow">
                        <NavBar activeIndex = {2}></NavBar>
                  </div>
                  <div className="row" id="filterRow">
                        <h4>Show only</h4>
                        <select id="categoryIn" defaultValue='Category' onChange={(event) => {setMovCategory(event.target.value)}} name="movCategory" className="formInput">
                              <option value="COMEDY">Comedy</option>
                              <option value="HORROR">Horror</option>
                              <option value="ACTION">Action</option>
                              <option value="DOCUMENTARY">Documentary</option>
                        </select>
                        <input type='checkbox' id="sorting" name="sorting" onChange={(event) => {setSorting(event.target.value)}}></input>
                        <label for='sorting'>Sort by title</label>
                  </div>
                  <div className="row" id="cardRow">
                        {
                              movies.map (movie => <CardMovie onClick = {
                                    (movie) =>
                                    {
                                          window.location.href = `/movies/${movie.id}`
                                    }
                              } key = {movie.id} movie = {movie} onDelete = {deleteMovie}></CardMovie>)
                        }
                  </div>
                  <div className="row" id="inputRow">
                        <div className="col" id="inputCol">
                              <MovieAddForm onAdd = {addMovie}></MovieAddForm>
                        </div>
                        <div className="col" id="buttonCol">
                              <input type='button' value='+' id = 'addBtn' onClick={handleOpenForm}></input>
                        </div>
                  </div>
            </div>
            </>
            
      )
}

export default Movies;