/*eslint-disable*/
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// components
import { dataLogin } from "redux/reducers/authSlice";
import IndexDropdown from "components/Dropdowns/IndexDropdown.js";

export default function Navbar({usuario}) {
  const user = useSelector((state) => state.auth.usuario)
  console.log(dataLogin)
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="top-0 fixed z-10 w-full flex flex-wrap items-center justify-between px-0 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-0 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
        
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <div
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  <p>&#9758;</p>{" "}
                  Conectado: 
                </div>

              </li>
              {user}
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center"> 
                <IndexDropdown />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
