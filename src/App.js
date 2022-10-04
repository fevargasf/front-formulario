/*eslint-disable*/
import React, { createContext, useState,useEffect }  from "react";
import Footer from "components/Footers/Footer.js";
import { Route, Switch } from 'react-router-dom';
import { getToken, initAxiosInterceptors } from "Helpers/auth-helpers";
import CardTable from "components/Cards/CardTable";
import {useDispatch} from 'react-redux';

export const ThemeContext = createContext(null);
export default function App() {


const [cargandoUsuario, setCargandoUsuario] = useState(true);
const dispatch = useDispatch()


  return (
    <>   
    <Switch>
       <Route path="/" component={CardTable} />
    </Switch>
    <Footer /> 
 
    </>
    
  );
}