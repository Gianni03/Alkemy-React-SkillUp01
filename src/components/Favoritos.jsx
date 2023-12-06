import React from 'react';



function Favoritos(props) {

 


  return (

    <>
    <h2>Favoritos</h2>

    <div className="row">
        
        {props.favorites.map((oneMovie, idx) => {
          return (
            <div className="col-3" key={idx}>
              <div className="card my-4">
                <img
                  src={oneMovie.imgURL}
                  className="card-img-top"
                  alt={oneMovie.title}
                />
                <button className="favourite-btn" 
                        onClick={props.addOrRemoveFromFavs}
                        data-movie-id={oneMovie.id}>❤️</button>
                <div className="card-body">
                  <h5 className="card-title">{oneMovie.title}</h5>
                  <p className="card-text">
                    {oneMovie.overview.substring(0, 100)}...
                  </p>
                  {/* <Link
                    to={`/detalle?movieID=${oneMovie.id}`}
                    className="btn btn-primary"
                  >
                    Ver más
                  </Link> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}

export default Favoritos