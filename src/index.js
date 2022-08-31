import React, { useState,useEffect }  from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect, matchPath, useHistory } from "react-router-dom";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import App from "App.js"
import Maps from "views/admin/Maps";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Evaluacion from "views/admin/Evaluacion"
import {Provider, useSelector} from "react-redux";
import store, { persistor } from "./redux/store";
import { dataLogin } from "redux/reducers/authSlice";
import Login from "components/Footers/Login";
import { PersistGate } from "redux-persist/lib/integration/react";

axios.defaults.baseURL='http://localhost:8082/';

function Application() {
  const [theme, setTheme] = useState(null);
 
	useEffect(() => {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setTheme('bg-black');
		} else {
			setTheme('bg-white');
		}
	}, []);

	const handleThemeSwitch = () => {
		setTheme(theme === 'bg-black' ? 'bg-white' : 'bg-black');
	};

	useEffect(() => {
		if (theme === 'bg-black') {
			document.documentElement.classList.add('bg-black');
		} else {
			document.documentElement.classList.remove('bg-black');
		}
	}, [theme]);
  return (
  
      <>
        
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
            <Switch>      
            <IsLogged exact path='/'>
               <Login></Login>
            </IsLogged>
              <ProtectedRoute path={"/asignaciones"}>
                <Route path="/asignaciones" exact component={App}/>
                <Route path="/asignaciones/formulario/Seguimiento/:ID" component={Maps}/>
                 <Route path="/asignaciones/formulario/Evaluación/:ID" component={Evaluacion}/>
                 <IndexNavbar   />
              </ProtectedRoute>
            </Switch>
          </BrowserRouter>
      </PersistGate>
    </Provider>
   </>
  )
}

const ProtectedRoute = ({children, ...rest}) => {
  const authStatus = useSelector(dataLogin);
  const isLogged = authStatus.isLogged;
  return (
    <Route 
      {...rest} render={({location}) => {
        return isLogged === true ? (
          children
        ) : (
          <Redirect from="*" to={{pathname: "/", state:{ from: location}}} />
        )
      }}
    />
  )
}

const IsLogged = ({children, location ,...rest}) => {
  const authStatus = useSelector(dataLogin);
  const isLogged = authStatus.isLogged;
  const token = useSelector((state) => state.auth.token)
  const history = useHistory();
  return (
    <Route 
      {...rest} render={({location}) => {
        return isLogged === true && token !== null ? (
          <Redirect from="*" to={{pathname: "/asignaciones", state:{ from: location}}} />
        ) : (
          children
        )
      }}
    />
  )
}


ReactDOM.render( <Application /> , document.getElementById('root'));