import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


function Resultados(props) {

  let query = new URLSearchParams(window.location.search);
  let busqueda = query.get("busqueda");

  const [ movieResults, setMovieResults] = useState([]);

  useEffect(() =>{
    const MySwal = withReactContent(Swal);
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=5ff2b5926c308365af404d8fbd76aaf1&language=es-ES&page=1&include_adult=false&query=${busqueda}`;
    axios
      .get(endPoint)
      .then((response) => {
        const moviesArray = response.data.results;
        if(moviesArray.length === 0) {
          MySwal.fire({
            title: <h4>No se encontro la película</h4>,
            text: "Prueba con otra",
            icon: "warning",
          });
        }
        setMovieResults(moviesArray);
      })
      .catch((error) => {
      console.log(error)
      });
  }, [busqueda]);
    
  

  return (
    <>
      <h3>Estas buscando: {busqueda}</h3>
      {movieResults.length === 0 && <h3>No Hay resultados</h3>}

    <div className="row">
    
        {movieResults.map((oneMovie, idx) => {
          return (
            <div className="col-4" key={idx}>
              <div className="card my-4">
              <Link to={`/detalle?movieID=${oneMovie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`}
                  className="card-img-top"
                  alt={oneMovie.title}
                /></Link>
                <button className="favourite-btn" 
                        onClick={props.addOrRemoveFromFavs}
                        data-movie-id={oneMovie.id}>🤍</button>
                <div className="card-body">
                  <h5 className="card-title">{oneMovie.title}</h5>
                  {/* <p className="card-text">
                    {oneMovie.overview.substring(0, 100)}...
                  </p> */}
                  <Link
                    to={`/detalle?movieID=${oneMovie.id}`}
                    className="btn btn-primary"
                  >
                    Ver más
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}

export default Resultados