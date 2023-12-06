import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

function Login() {


  const history = useNavigate();
  console.log(history);

  const submitHandler = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const regExEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // console.log(regExEmail.test(email));
    if (email === "" || password === "") {
      MySwal.fire({
        title: <p>Los campos no pueden esar vacios</p>,
      });
      return;
    }

    if (email !== "" && !regExEmail.test(email)) {
      MySwal.fire({
        title: <p>Debes escribir una dirección de correo válida</p>,
      });
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      MySwal.fire({
        title: <p>Credenciales inválidas</p>,
      });
      return;
    }

    // se envian dos cosas url de la api y en formato de objeto los datos
    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((resp) => {
        MySwal.fire({
          title: <p>Ingresaste</p>,
        });
        const tokenRecibido = resp.data.token;
        sessionStorage.setItem("token", tokenRecibido);
        history('/listado');
      });
  };

  return (

    <div className="row">
      <div className="col-6 offset-3">
        <h2>LogIn</h2>
        <form action="" onSubmit={submitHandler}>
          <label className="form-label d-block mt-2">
            <span>Correo Electrónico</span>
            <br />
            <input type="text" name="email" id="" className="form-control" />
          </label>
          <br />
          <label className="form-label d-block mt-2">
            <span>Contraseña</span>
            <br />
            <input type="password" name="password" id="" className="form-control"/>
          </label>
          <br />
          <button type="submit" className="btn btn-success">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
