const express = require("express");
const cors = require("cors")
const path = require('path')
const sequelize = require("./sequelize");


const Movie = require("./models/Movie");
const CrewMember = require("./models/CrewMember");
Movie.hasMany(CrewMember);

const app = express()
app.use(
  express.urlencoded({
    extended: true,
  })
);
//added sth to test
app.use(
  cors({
      origin: 'http://localhost:3000',
      credentials: true,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src')))

const listener = app.listen(process.env.PORT, async () => {
    await sequelize.sync({alter: true})
    console.log( `Server listening on port: ${process.env.PORT}`)
});

//GET ALL MOVIES
app.get("/movies", async (req, res, next) => {
      try {
        const movies = await Movie.findAll();
        res.status(200).json(movies);
      } catch (err) {
        next(err);
      }
  });

//GET A MOVIE (by ID)
app.get("/movies/:movieId", async (req, res, next) => {
      try {
        const movie = await Movie.findByPk(req.params.movieId);
        if (movie) {
          res.status(200).json(movie);
        } else {
          res.status(404).json({ message: `404 - Movie with id ${req.params.libraryId} Not Found!` });
        }
      } catch (err) {
        next(err);
      }
  });

//POST MOVIE
app.post("/movies", async (req, res, next) => {
      try {
        await Movie.create(req.body);
        res.status(201).json({ message: "Movie Created!" });
      } catch (err) {
        next(err);
      }
  });

//PUT MOVIE
app.put("/movies/:movieId", async (req, res, next) => {
      try {
        const movie = await Movie.findByPk(req.params.movieId);
        if (movie) {
            movie.title = req.body.title;
            movie.category = req.body.category;
            movie.pubDate = req.body.pubDate;
            await movie.save();
            res.status(202).json({ message: `Movie with id ${movie.id} updated!` });
        } else {
          res.status(404).json({ message: `404 - Movie with id ${req.params.movieId} Not Found!`});
        }
      } catch (error) {
        next(error);
      }
    });

//DELETE MOVIE
app.delete('/movies/:movieId', async (req, res, next) => {
      try {
        const movie = await Movie.findByPk(req.params.movieId)
        if (movie) {
          await movie.destroy()
        } else {
          res.status(404).json({ message: `404 - Movie with id ${req.params.movieId} Not Found!` })
        }
      } catch (err) {
        next(err);
      }
    });

//GET ALL CREW MEMBERS AS A RES OF MOVIE
app.get("/movies/:movieId/members", async (req, res, next) => {
      try {
        const movie = await Movie.findByPk(req.params.movieId, {
          include: [CrewMember],
        });
        if (movie) {
          res.status(200).json(movie.CrewMembers);
        } else {
          res.status(404).json({ message: `404 - Movie ${req.params.movieId} Not Found!` });
        }
      } catch (err) {
        next(err);
      }
  });

//GET ONE CREW MEMBER AS A RES OF MOVIE
app.get('/movies/:movieId/members/:memberId', async (req, res, next) => {
      try {
        const movie = await Movie.findByPk(req.params.movieId)
        if (movie) {
          const members = await movie.getCrewMembers({ id: req.params.memberId })
          const member = members.shift()
          if (member) {
            res.status(202).json(member)
          } else {
            res.status(404).json({ message: '404 - Crew Member Not Found!' })
          }
        } else {
          res.status(404).json({ message: '404 - Movie Not Found!' })
        }
      } catch (err) {
        next(err);
      }
    });

//POST CREW MEMBER AS A RES OF MOVIE
app.post("/movies/:movieId/members", async (req, res, next) => {
      try {
        const movie = await Movie.findByPk(req.params.movieId);
        if (movie) {
          const member = new CrewMember(req.body);
          member.MovieId = movie.id;
          await member.save();
          res.status(201).json({ message: `Crew Member created for the movie ${movie.id}`});
        } else {
          res.status(404).json({ message: `404 - Movie ${req.params.movieId} Not Found!` });
        }
      } catch (err) {
        next(err);
      }
  });

//PUT CREW MEMEBR AS A RES OF MOVIE
app.put("/movies/:movieId/members/:memberId", async (req, res, next) => {
      try {
        const movie = await Movie.findByPk(req.params.movieId);
        if (movie) {
          const members = await movie.getCrewMembers({ id: req.params.memberId });
          const member = members.shift();
          if (member) {
            member.name = req.body.name;
            member.role = req.body.role;
            await member.save();
            res.status(202).json({ message: `Crew Member with id${member.id} updated!` });
          } else {
            res.status(404).json({ message: `404 - Crew Member with id ${req.params.memberId} Not Found!`});
          }
        } else {
          res.status(404).json({ message: `404 - Movie with id ${req.params.movieId} Not Found!`});
        }
      } catch (error) {
        next(error);
      }
    });

//DELETE CREW MEMEBR AS A RES OF MOVIE
app.delete('/movies/:movieId/members/:memberId', async (req, res, next) => {
      try {
        const movie = await Movie.findByPk(req.params.movieId)
        if (movie) {
          const members = await movie.getCrewMembers({ id: req.params.memberId })
          const member = members.shift()
          if (member) {
            await member.destroy()
            res.status(202).json({ message: 'Crew Member deleted!'})
          } else {
            res.status(404).json({ message: '404 - Crew Member Not Found' })
          }
        } else {
          res.status(404).json({ message: '404 - Movie Not Found!' })
        }
      } catch (err) {
        next(err);
      }
    });

//FILTERING
//--------BY CATEGORY:
app.get("/movies/byCategory/:category", async (req, res, next) => {
      try {
        const movies = await Movie.findAll({where: {category: req.params.category}})
        if (Object.keys(movies).length) {
          res.status(200).json(movies);
        } else {
          res.status(404).json({ message: `404 - Movie with category ${req.params.category} Not Found!` });
        }
      } catch (err) {
        next(err);
      }
  });

//--------BY TITLE:
app.get("/movies/byTitle/:title", async (req, res, next) => {
      try {
        const movie = await Movie.findAll({where: {title: req.params.title}})
        if (Object.keys(movie).length) {
          res.status(200).json(movie);
        } else {
          res.status(404).json({ message: `404 - Movie with title ${req.params.title} Not Found!` });
        }
      } catch (err) {
        next(err);
      }
  });

//SORTING:
function comparer(mov1, mov2) {
      if (mov1.title < mov2.title){
        return -1;
      }
      if (mov1.title > mov2.title){
        return 1;
      }
      return 0;
    }
app.get("/movies/sorted/:byAttribute", async (req, res, next) => {
      try {
        const movies = await Movie.findAll();
        movies.sort(comparer)
        res.status(200).json(movies);
      } catch (err) {
        next(err);
      }
  });

//EXPORT/IMPORT
function exportJSON (movies)
{
      const fs = require('fs');

      var jsonString = JSON.stringify(movies);
      console.log(jsonString);
      
      fs.writeFile("movies.json", jsonString, 'utf8', function (error) {
            if (error) {
                  console.log("ERROR - Couldn't export movies to json");
            return console.log(err);
      }
      
      console.log("JSON file with movies has been exported");
      });
}

async function importJSON ()
{
      let movies = {};
      const fs = require('fs');
      fs.readFile('./movies.json', 'utf-8', (err, data) => {
            if (err) {
                  console.log("ERROR - Couldn't import movies from json");
                  return console.log(err);
            }
            movies = JSON.parse(data)
            return movies
      })
}

app.get("/movies/json/:action", async (req, res, next) => {
      try {
        if (req.params.action == 'export')
        {
              console.log('export')
              const movies = await Movie.findAll();
              exportJSON(movies);
              res.status(200).json({message: 'Movies have been exported to movies.json file!'})
        }
        else if (req.params.action == 'import')
        {
              console.log('import');
              let movies = {};
              const fs = require('fs');
              fs.readFile('./movies.json', 'utf-8', (err, data) => {
                    if (err) {
                          console.log("ERROR - Couldn't import movies from json");
                          return console.log(err);
                    }
                    movies = JSON.parse(data)
                    console.log("In import: ", movies)
                    res.status(200).json(movies);
              })
        }
        else {
              console.log('neither')
              res.status(404).json({message: `404 - No action ${req.params.action} allowed - use only import/export`});
        }
        console.log('other')
      } catch (err) {
        next(err);
      }
  });

