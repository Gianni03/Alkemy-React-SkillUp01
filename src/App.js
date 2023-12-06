
// librerias
import { Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';
// componentes
import Login from './components/Login';
import Listado from './components/Listado';
import Header from './components/Header';
// import Footer from './components/Footer';
import Detalle from './components/Detalle';
import Resultados from './components/Resultados';
import Favoritos from './components/Favoritos';

// estilos
import './css/bootstrap.min.css'
import './css/app.css';


function App() {

  const favMovies = localStorage.getItem('favs');

  let tempMoviesFavs;

  if(favMovies === null){
    tempMoviesFavs = [];
  }else {
    tempMoviesFavs = JSON.parse(favMovies)
  }


  console.log(tempMoviesFavs);

  const addOrRemoveFromFavs = e =>{
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector('img').getAttribute('src');
    const title = parent.querySelector('h5').innerText;
    const overview = parent.querySelector('p').innerText;
    const movieData = {imgURL, title, overview,
    id: btn.dataset.movieId }

    let movieIsInArray = tempMoviesFavs.find(oneMovie => {
      return oneMovie.id === movieData.id
    });
    
    if(!movieIsInArray){
      tempMoviesFavs.push(movieData);
      localStorage.setItem('favs', JSON.stringify(tempMoviesFavs));
      setFavorites(tempMoviesFavs);
      console.log('se agrego la pelicula');
    } else {
      let moviesLeft = tempMoviesFavs.filter(oneMovie =>{
        return oneMovie.id !== movieData.id
      });
      localStorage.setItem('favs', JSON.stringify(moviesLeft));
      setFavorites(moviesLeft);
      console.log('se saco la pelicula');
    }
  }

  const [favorites, setFavorites] = useState([]);

  useEffect(()=> {
    const favsInLocal = localStorage.getItem('favs');

    if (favsInLocal != null) {
        const favsArray = JSON.parse(favsInLocal);
        setFavorites(favsArray);
    }

  }, [])

  return (
    <>
      <Header favorites={favorites}/>

      <div className="App container mt-3">
          <Routes>
            <Route exact path='/' element={ <Login/> } />
            <Route path="/listado" element={ <Listado addOrRemoveFromFavs={addOrRemoveFromFavs} props/> } />
            <Route path="/detalle" element={ <Detalle/> } />
            <Route path="/resultados" element={ <Resultados/> } />
            <Route path="/favoritos" element={ <Favoritos favorites={favorites} props/> } />
          </Routes>
      </div>
      {/* <Footer /> */}
    
    </>
  );
}

export default App;
