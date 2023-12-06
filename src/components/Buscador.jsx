import React from 'react';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";


const MySwal = withReactContent(Swal);

function Buscador() {

  const history = useNavigate();

  const submitHandler = e => {
    e.preventDefault();
    const busqueda = e.currentTarget.busqueda.value.trim();
    
    if(busqueda.length === 0){
      MySwal.fire({
        title: <p>escribe algo que buscar</p>,
        icon: "warning",
      });
    }else if(busqueda.length < 3){
      MySwal.fire({
        title: <p>escribe al menos tres letras</p>,
        icon: "warning",
      });
    } else {
      e.currentTarget.busqueda.value = '';
      history(`/resultados?busqueda=${busqueda}`)
    }
  

  }
  return (
    <form className='d-flex align-item-center' onSubmit={submitHandler}>
          <label className="form-label mb-0 mx-3">
            <input type="text" name="busqueda" className="form-control" placeholder='buscar...'/>
          </label>
          <button type="submit" className="btn btn-success">Buscar</button>
        </form>
  )
}

export default Buscador