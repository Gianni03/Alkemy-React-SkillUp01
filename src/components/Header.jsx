import React from 'react'
import { Link } from 'react-router-dom';
import Buscador from './Buscador';


function Header(props) {
  
  return (
    <header>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>

        <div className='container'>
        <Link to="/" className='navbar-brand'>Movies</Link>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='toggle navigation'>
          <span className='navbar-toggle-icon'></span>
        </button>

          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='navbar-item'>
                <Link className='nav-link' to="/">Home</Link>
              </li>
              <li className='navbar-item'>
                <Link className='nav-link' to="/listado">Listado</Link>
              </li>
              <li className='navbar-item'>
                <Link className='nav-link' to="/favoritos">Favoritos</Link>
              </li>
              <li className='navbar-item d-flex align-items-center'>
                <span className='text-success'>{props.favorites.length}</span>
              </li>
            </ul>
          </div>

          <Buscador/>
        </div>
      </nav>
    </header>

  )
}

export default Header