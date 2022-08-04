/*eslint-disable*/
import React, { createContext, useState,useEffect }  from "react";
import { Link } from "react-router-dom";
import axios from 'axios'; 
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import Login from "components/Footers/Login.js";
import { Route, Switch } from 'react-router-dom';
import { setToken, deleteToken,getToken, initAxiosInterceptors } from "Helpers/auth-helpers";
import CardTable from "components/Cards/CardTable";
import Maps from "views/admin/Maps";
import Error from "components/Error"
import { data } from "autoprefixer";
import {useDispatch} from 'react-redux'
import { identifierActions } from "redux/reducers/authSlice";


export const ThemeContext = createContext(null);

initAxiosInterceptors();


export default function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
 const [usuario, setUsuario]= useState(null);
 const [error, setError] = useState(null);

 const [cargandoUsuario, setCargandoUsuario] = useState(true);
  const dispatch = useDispatch()


  useEffect(() => {
      async function cargarUsuario() {
          if (!getToken()) {
            setCargandoUsuario(false);
            return;
          }
          try{

            
          }catch (error) {
            console.log(error);

          }
      
        }


  }, []);
 async function login(Usuario, Password,vinavegador,viip){

  const dataLogin = {
    Usuario,
    Password,
    vinavegador,
    viip
  }

    dispatch({type:identifierActions.FETCH_LOGIN, dataLogin})

  
    /* setError(data.voerror)
      setUsuario(data.usuario);
      sessionStorage.setItem("usuario", data.usuario)
      setToken(data.token);
      sessionStorage.setItem("token",data.token) */
  }

    function logout() {
      setUsuario(null);
      deleteToken();
    }
    function mostrarError(mensaje) {
      setError(mensaje);
    }
    function esconderError() {
      setError(null);
    }

  return (
    <>
       <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <IndexNavbar  usuario={usuario}  />
      <Error mensaje={error} esconderError={esconderError} />
      {usuario ? (
        <LoginRoutes
        mostrarError={mostrarError}
          usuario={usuario}
          logout={logout}
        />
      ) : (
        <LogoutRoutes
        login={login}
        mostrarError={mostrarError}
        />
      )}
       
      <Footer /> 
      </ThemeContext.Provider>
    </>
    
  );
}
function LoginRoutes({usuario}) {
  return (
    <Switch>
    <Route path="/" component={CardTable}/>
    <Route path="/admin/maps" componente={Maps}/>

    </Switch>
  );
}
function LogoutRoutes({ login,mostrarError }) {
  return (
    <Switch>
      <Route
        path="/"
        render={props => (
          <Login {...props} login={login}  mostrarError={mostrarError}  default/>
        )}
      />
    
    </Switch>
  );
}