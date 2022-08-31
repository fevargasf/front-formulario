/*eslint-disable*/
import React, { createContext, useState,useEffect }  from "react";
import Footer from "components/Footers/Footer.js";
import { Route, Switch } from 'react-router-dom';
import { getToken, initAxiosInterceptors } from "Helpers/auth-helpers";
import CardTable from "components/Cards/CardTable";
import {useDispatch} from 'react-redux'



export const ThemeContext = createContext(null);



export default function App() {
const [cargandoUsuario, setCargandoUsuario] = useState(true);
const dispatch = useDispatch()

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
    <Switch>
       <Route path="/" component={CardTable} />
    </Switch>
    <Footer /> 
 
    </>
    
  );
}