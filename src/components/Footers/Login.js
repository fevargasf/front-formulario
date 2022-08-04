import React, { useState,useEffect } from "react";
import { Link,Redirect  } from "react-router-dom";
import axios from 'axios'; 

export default function Login({login,mostrarError}) {
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    const viip= res.data.IPv4;
     console.log(viip)
    sessionStorage.setItem('viip',viip);
  } 


  var recuIp= sessionStorage.getItem('viip');
  const [user, setuser] = useState({ 
    Usuario: '', 
    Password: '',
    vinavegador:'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    viip:'190.69.38.94'});  


    async function handleSubmit (e)  {    
    e.preventDefault();    
   // debugger;   
   try{
     await login(user.Usuario,user.Password, user.vinavegador, user.viip);
   }catch (error){
      
   }
   
   
  }; 
  useEffect( () => {
    //passing getData method to the lifecycle method
    getData()
   
    console.log(`UA: ${window.navigator.userAgent}`);
    var msie = window.navigator.userAgent.indexOf("MSIE ");
    console.log(msie)
    //setIsIE(msie > 0)

  }, [])
  const onChange = (e) => {    
    e.persist();    
    setuser({...user, [e.target.name]: e.target.value});    

  }

  return (
    <>
      <div className="container mx-auto  px-4  ">
        <div className="flex content-center items-center justify-center ">
          <div className="top-50 mt-20 w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6">
                <div className="text-center mb-2">
                  <h6 className="text-blueGray-500 text-sm font-bold"> </h6>
                </div>
                <div className="btn-wrapper text-center"> </div>
                <hr className="mt-10 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-6 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                </div>
                <form onSubmit={handleSubmit}>
                <input type="hidden" name="vinavegador" id="vinavegador" 
                  onChange={onChange}
                  value={user.vinavegador}/>
                <input type="hidden" name="viip"  id="viip"
                    onChange={onChange}
                    value={recuIp}
                 />
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      required
                      htmlFor="grid-password" >
                      Usuario:
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Usuario"
                      onChange={onChange}
                      value={user.Usuario}
                      name="Usuario"
                      id="Usuario" />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      required
                      htmlFor="grid-password" >
                      Contraseña:
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      onChange={onChange}
                      value={user.Password}
                      name="Password" id="DepPasswordartment" />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Trabajar sin conexión
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit" value="Submit">
                      Entrar
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Olvide mi contraseña?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-200">
                  <small>****</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
