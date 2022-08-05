import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect, matchPath } from "react-router-dom";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import App from "App.js"

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import Maps from "views/admin/Maps";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";

import {Provider, useSelector} from "react-redux";
import store, { persistor } from "./redux/store";
import CardTable from "components/Cards/CardTable";
import Tables from "views/admin/Tables";
import { dataLogin } from "redux/reducers/authSlice";
import Login from "components/Footers/Login";
import { PersistGate } from "redux-persist/lib/integration/react";

axios.defaults.baseURL='http://localhost:8082/';
//axios.defaults.headers.common['Authorization']= 'ffffff'+ sessionStorage.getItem('token')




function Application() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
            <Switch>
            <Route path="/login" exact component={Login} />
              
              <ProtectedRoute path={"/"}>
                 <Route path="/" exact component={App}/>
              </ProtectedRoute>
            </Switch>
          </BrowserRouter>
      </PersistGate>
    </Provider>
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
          <Redirect from="*" to={{pathname: "/login", state:{ from: location}}} />
        )
      }}
    />
  )
}



ReactDOM.render( <Application /> , document.getElementById('root'));