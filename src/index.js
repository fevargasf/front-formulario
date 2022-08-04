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

import {Provider} from "react-redux";
import store from "./redux/store";
import CardTable from "components/Cards/CardTable";
import Tables from "views/admin/Tables";

axios.defaults.baseURL='http://localhost:8082/';
//axios.defaults.headers.common['Authorization']= 'ffffff'+ sessionStorage.getItem('token')

ReactDOM.render( <Application /> , document.getElementById('root'));


const ProtectedRoute = ({}) => {

}

function Application() {
  return (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
              {/* add routes with layouts */}
             {/*  <Route path="/" exact component={Maps}/> */}
              {/* <Route path="/" exact component={App}/> */}
              <Route path="/" exact component={Maps}/>


              <Route path="/auth" component={Auth} />

              {/* add routes without layouts */}
              <Route path="/landing" exact component={Landing} />
              <Route path="/profile" exact component={Profile} />
              
              {/* add redirect for first page */}
              <Redirect from="*" to="/" />
            </Switch>
          </BrowserRouter>
    </Provider>
  )
}

/* const ProtectedRoute  */