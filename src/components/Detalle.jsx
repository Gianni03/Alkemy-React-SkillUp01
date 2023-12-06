import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Detalle() {
  const history = useNavigate();
  let token = sessionStorage.getItem("token");

  let query = new URLSearchParams(window.location.search);
  let movieId = query.get("movieID");

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieId}?api_key=5ff2b5926c308365af404d8fbd76aaf1&language=es-ES`;
    axios
      .get(endPoint)
      .then((response) => {
        const movieData = response.data;
        setMovie(movieData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieId]);

  return (
    <>
      {!token && history("/")}
      { !movie && <p>CARGANDO...</p>}
      {movie && 
        <>
          <h2>{movie.title}</h2>
          <div className="row">
            <div className="col-4">
            <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  className="img-fluid"
                  alt={movie.title}
                />
            </div>
            <div className="col-8">
              
              <h5>Reseña</h5>
              <p>{movie.overview}</p>
              <h5>Rating {movie.vote_average}</h5>
              <h5>Géneros</h5>
              <ul>
              {movie.genres.map(oneGenre => <li key={oneGenre.id}>{oneGenre.name}</li>)}
                
              </ul>
            </div>
          </div>
        </>
      }
    </>
  );
}

export default Detalle;
