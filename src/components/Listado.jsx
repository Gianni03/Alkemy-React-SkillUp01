import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Listado(props) {


  const history = useNavigate();
  
  let token = sessionStorage.getItem("token");
  // useEffect(() => {

  //   if (token === null) {
  //     history("/");
  //   }
  // }, [history]);

  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const MySwal = withReactContent(Swal);
    const endPoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=5ff2b5926c308365af404d8fbd76aaf1&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";
    axios
      .get(endPoint)
      .then((response) => {
        const apiData = response.data;
        setMovieList(apiData.results);
      })
      .catch((error) => {
        MySwal.fire({
          title: <h3>Error de conexión</h3>,
          text: "Prueba más tarde",
          icon: "warning",
        });
      });
  }, [setMovieList]);

  console.log(movieList);

  return (

    <>
    { !token && history("/") }
      <div className="row">
        {/* estructura base de la página */}
        {movieList.map((oneMovie, idx) => {
          return (
            <div className="col-3" key={idx}>
              <div className="card my-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`}
                  className="card-img-top"
                  alt={oneMovie.title}
                />
                <button className="favourite-btn" 
                        onClick={props.addOrRemoveFromFavs}
                        data-movie-id={oneMovie.id}>🤍</button>
                {/* ❤️ */}
                <div className="card-body">
                  <h5 className="card-title">{oneMovie.title}</h5>
                  <p className="card-text">
                    {oneMovie.overview.substring(0, 100)}...
                  </p>
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
  );
}

export default Listado;
