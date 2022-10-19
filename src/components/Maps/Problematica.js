import React, { useState,useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { categoryProblematic } from "utils/problematic";
import {probabili} from "utils/probability";
import {magnitud} from "utils/magnitud";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    color: "red",
  },
  formControl: {
    margin: theme.spacing(3),
    color: "white",
  },
}));

//Error Component
const Error = ({ children }) => <p style={{ color: "red" }}>{children}</p>;

const Problematica = () => {


  const [texts, setTexts] = useState(0);
  const [textsEx,setTextsEx] = useState(0);
  const [textsPer,setTextsPer] = useState(0);
  const [textsRev,setTextsRev] = useState(0);
  const [textsRec,setTextsRec] = useState(0);
  const [prob, setProb]= useState(0);
  const [magni, setmagni] = useState(0);

  const [total, setTotal] = useState(0);
  const [totalM, setTotalM] = useState(0);

  const [inte, setInte] = useState("");
  const [ext, setExt] = useState([]);
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const [cerarComponente, setCerrarComponente] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('yes');
  const [checked, setChecked] = useState(false);
  
  const [checkedState, setCheckedState] = useState(
    new Array(categoryProblematic?.length).fill(false)
  );

const importancia = [{nombre: "Intensidad(IN)",
      select:[
      {key:1, value: "Afectación del bien de protección representada en una desviación del estándar fijado por la norma y comprendida en el rango entre 0 y 33%"},
      {key:4,value: "Afectación del bien de protección representada en una desviación del estándar fijado por la norma y comprendida en el rango entre 34 y 66%"},
      {key:8,value: "Afectación del bien de protección representada en una desviación del estándar fijado por la norma y comprendida en el rango entre 67 y 99%."},
      {key:12,value: "Afectación del bien de protección representada en una desviación del estándar fijado por la norma igual o superior al 100%."},
  ]}];
const importEx =[{nombre: "Extension (EX)",
    select:[
      { key:1, value: "Cuando la afectación puede determinarse en un área localizada e inferior a una (1) hectárea."},
      {key: 4, value: "Cuando la afectación incide en un área determinada entre una (1) hectárea y cinco (5) hectáreas."},
      {key: 12, value: "Cuando la afectación se manifiesta en un área superior cinco (5) hectáreas."},
    ]}];
const importPer=[{nombre: "Persistencia (PE)",
    select:[
      { key:1, value: "Si la duración del efecto es inferior a seis (6) meses."},
      {key: 3, value: "Cuando la afectación no es permanente en el tiempo, se establece un plazo temporal de manifestación entre seis (6) meses y cinco (5) años."},
      {key: 5, value: "Cuando el efecto supone una alteración, indefinida en el tiempo, de los bienes de protección o cuando la alteración se superior a 5 años.."},
    ]}];
const importRev =[{nombre: "Reversibilidad (RV)",
    select:[
      { key:1, value: "La alteración puede ser asimilada por el entorno de forma medible en un periodo de 1 año."},
      {key: 3, value: "Aquel en el que la alteración puede ser asimilada por el entorno de forma medible en el mediano plazo, debido al funcionamiento de los procesos naturales de la sucesión ecológica y de los mecanismos de autodepuración del medio, es decir, entre 1 y 10 años."},
      {key: 5, value: "Cuando la afectación es permanente o supone la imposibilidad o dificultad extrema de retornar, por medios naturales, a sus condiciones anteriores. Corresponde a un plazo de superior a diez (10) años."},
    ]}];

 const importRec =[{nombre: "Recuperabilidad (MC)",
 select:[
   { key:1, value: "Si se logra en un plazo inferior a seis (6) meses.."},
   {key: 3, value: "Caso en que la afectación puede eliminarse por la acción humana, al establecerse las oportunas medidas correctivas, y así mismo, aquel en el que la alteración que sucede puede ser compensable en un periodo comprendido entre 6 meses y 5 años."},
   {key: 5, value: "Efecto en el que la alteración puede mitigarse de una manera ostensible, mediante el establecimiento de medidas correctoras."},
   {key:10, value:"Caso en el que la alteración del medio o pérdida que supone es imposible reparar, tanto por la acción natural como por la acción humana."}
 ]}];

{/**sumas */}

 const [selectedIn, setSelectedIn] = useState();
 const [selectedEx, setSelectedEx] = useState();
 const [selectedPer, setSelectedPer] = useState();
 const [selectedRev, setSelectedRev] = useState();
 const [selectedRec, setSelectedRec] = useState();
 const totalRef = useRef(null);
 {/**sumas */}

  function setSelectedOption(e,index) {
    let selectedState = e.target.value;
    const selectedIndex = e.target.options.selectedIndex;
    const codigo = e.target.options[selectedIndex].getAttribute('data-key')
    setTexts(selectedState); 
    setSelectedIn(codigo)
    
  }

  function setSelectedOptionEx(e,index) {
    const selectedIndex = e.target.options.selectedIndex;
    const codigo = e.target.options[selectedIndex].getAttribute('data-key')
    console.log(e.target.name);
    let selectedState = e.target.value;
    setTextsEx(selectedState);
    setSelectedEx(codigo)

  }
  function setSelectedOptionPer(e,index) {
    const selectedIndex = e.target.options.selectedIndex;
    const codigo = e.target.options[selectedIndex].getAttribute('data-key')
  
    let selectedState = e.target.value;
    setTextsPer(selectedState);
    setSelectedPer(codigo)
  }
  function setSelectedOptionRev(e,index) {
    const selectedIndex = e.target.options.selectedIndex;
    const codigo = e.target.options[selectedIndex].getAttribute('data-key')
   
    let selectedState = e.target.value;
    setTextsRev(selectedState);
    setSelectedRev(codigo)
  }
  function setSelectedOptionRec(e,index) {
    const selectedIndex = e.target.options.selectedIndex;
    const codigo = e.target.options[selectedIndex].getAttribute('data-key')
   
    let selectedState = e.target.value;
    setTextsRec(selectedState);
    setSelectedRec(codigo)
  }
  const defaultValues = {
    firstName: "",
    lastName: "",
    agree: false,
    profession: "",
    gender: "",
  };

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data) => console.log(data);

  const handleCheckChange = (event) => {
  //  setStateCheck({ ...stateCheck, [event.target.name]: event.target.checked });
    setSelected(event.target.value);
    setChecked(true)
  };



  function setCerrar(e) {
    e.preventDefault();
      setCerrarComponente(!cerarComponente);
   }


  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

  };


    useEffect(()=>{
      const suma = function (){
        console.log("0")
        setTotal((3*parseInt(selectedIn))+(2*parseInt(selectedEx))+ parseInt(selectedPer) + parseInt(selectedRev)+ parseInt(selectedRec))
       //3*parseInt(selectedIn))+(2* parseInt(selectedEx))+ parseInt(selectedPer) + parseInt(selectedRev)+ parseInt(selectedRec)
      }
      const multiplica = function(){
        setTotalM(parseFloat(prob)* parseFloat(magni))
      }
     
    suma();
    multiplica();
      },[totalRef])
      console.log(total)
      console.log(totalM)
  return (
    <>
      <div className="wrapper">
      <div className={cerarComponente ? "show-element" : null}>
    
        <button className="" onClick={(e) => setCerrar(e)}>
          {cerarComponente ? `Aplica Problematicas o Conflictos Ambientales` : `No Aplica`}
        </button>
    
      {!cerarComponente &&
      <>
        <h1 className="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2">7. IDENTIFICACIÓN DE AFECTACIÓN Y/O PROBLEMÁTICA AMBIENTAL Y/O CONFLICTO SOCIOAMBIENTAL:</h1>
        <hr /><br /><br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center mt-4 mb-2 text-xl font-bold">
            <h1>Problematica y/o Conflicto Ambiental</h1>
          </div>
          <div className="flex justify-center mt-4">
          
        <div className="radio">
        <div>
          <label htmlFor="si">
            <input
              type="radio"
              id="si"
              name="choose"
              value="si"
              checked={selected === 'si'}
              onChange={handleCheckChange}
              onClick={() => setVisible(true)}
            />
           Afectación
          </label>
          &nbsp; &nbsp; 
          <label htmlFor="no">
            <input
              type="radio"
              id="no"
              name="choose"
              value="no"
              onChange={handleCheckChange}
              checked={selected === 'no'}
              onClick={() => setVisible(false)}
            />
           Probematica ambiental
          </label>
          &nbsp; &nbsp; 
          <label htmlFor="no">
            <input
              type="radio"
              id="no"
              name="choose"
              value="no"
              onChange={handleCheckChange}
              checked={selected === 'no'}
              onClick={() => setVisible(false)}
            />
          conflicto socioambiental
          </label>
        </div>
      </div>
      </div>
      <br /><br />
          <h1 className="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2">
            7.1. CATEGORIZACIÓN DE LA AFECTACIÓN Y/O PROBLEMÁTICA AMBIENTAL :
          </h1>
          <hr />
          <br />
          <br />
          <section >
            {visible  &&  
            <div >
              <h3 className="uppercase">Selecciona la Categoria :</h3>  &nbsp; &nbsp; 
              <ul className="flex ">
                {categoryProblematic?.map(({ name, subCategory }, index) => {
              return (
                <li className=" grid grid-cols-2 gap-2 mb-2" key={index}>
                    &nbsp; &nbsp; 
                    <div className="toppings-list-item">
                    &nbsp; &nbsp; 
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${index}`}
                        name={name}
                        value={name}
                        checked={checkedState[index]}
                        onChange={() => handleOnChange(index)}
                      />{" "}
                      <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                      <h3>Selecciona la SubCategoria :</h3> &nbsp;
                      { subCategory.map( (e,i) =>  
                          <ul>
                            &nbsp;  
                          <input
                              type="checkbox"
                              id={`custom-checkbox-${index}`}
                              name={subCategory}
                              value={subCategory}/>{" "}
                            <label htmlFor={`custom-checkbox-${index}`}>{e}</label>
                          </ul>
                            )}
                        </div>
                        &nbsp;
                     </li>);        
                    })}
                  </ul>
              </div>
              }
          </section>
          <h1 className="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2">
            7.2 VALORACIÓN DE LA IMPORTANCIA DE LA AFECTACIÓN :
          </h1>
          <hr />
          <br />
          <textarea
            placeholder="(Diligenciar cuando aplique o eliminar numeral de no ser requerido, según tratamiento jurídico establecido en el Manual de Control y Seguimiento y/o en los casos que se presente un incumplimiento reiterado  frente a las obligaciones y condiciones del respectivo permiso ambiental, mediante acto administrativo). "
            className="w-full"/>
          <br />
          <br />
          <h1>Contiene los siguientes componentes :</h1>
          <br />
          <h1> 7. 2. 1. Determinación de la importancia de la afectación: (cuando se identifica afectación ambiental)</h1>
          <div className={
              " relative flex flex-col min-w-0 break-words w-full py-4 px-3 mx-3 mb-2 mt-2 shadow-lg rounded "
            }>
            <div className="block w-full overflow-x-auto">
              {/* Projects table */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 align-middle border border-solid py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                      Atributos
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                      Numeral
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                      Importancia de la afectación
                    </th>
                  </tr>
                </thead>
                <tbody>

                  {importancia?.map(({ nombre, select }, index)=> (
                          <tr>
                          <>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                              {nombre}
                            </td>
                            <>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <select
                               
                                id="comboDepartamento"
                            
                                className="text-black"
                                onChange={setSelectedOption}>
                                  <option value="">Elije</option>
                                {select.map((c)=>(
                                  <option data-key={c.key}  value={c.value} >{c.key}</option>
                                ))} 
                                            
                              </select>
                        
                            </td>
                              <td>
                            {select.filter((c) => {return c.value === texts}).map(v =>(
                             <>
                           
                              <h1>{v.value }</h1>
                             
                             </>
                             
                            ))}
                              </td>
                          
                              
                            </>
                          </>
                        </tr>
                  ))}
                  {importEx?.map(({ nombre, select }, index)=>(
                       <tr>
                       <>
                         <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                           {nombre}
                         </td>
                         <>
                           <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                             <select
                             id="comboDepartamento"
                             name="departmentId"
                             className="text-black"
                             onChange={setSelectedOptionEx}>
                              <option value="">Elije</option>
                             {select.map((c)=>(
                              <>
                              <option data-key={c.key}  key={c.key} value={c.value} >
                                {c.key}</option>
                            
                              </>
                            
                             ))} 
                                         
                           </select>
                          
                         </td>
                           <td>
                         {select.filter((c) => {return c.value === textsEx}).map(v =>(
                          <div>
                              {v.value}
                          </div>
                        

                         ))}
                           </td>
                           
                         </>
                       </>
                     </tr>
                  ))}
                  {importPer?.map(({ nombre, select }, index)=>(
                       <tr>
                       <>
                         <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                           {nombre}
                         </td>
                         <>
                           <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                             <select
                             id="comboDepartamento"
                             name="departmentId"
                             className="text-black"
                             onChange={setSelectedOptionPer}>
                              <option value="">Elije</option>
                             {select.map((c)=>(
                               <option data-key={c.key} value={c.value} >{c.key}</option>
                             ))} 
                                         
                           </select>
                          
                         </td>
                           <td>
                         {select.filter((c) => {return c.value === textsPer}).map(v =>(
                           <h1> {v.value}</h1>

                         ))}
                           </td>
                           
                         </>
                       </>
                     </tr>
                  ))}
                   {importRev?.map(({ nombre, select }, index)=>(
                       <tr>
                       <>
                         <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                           {nombre}
                         </td>
                         <>
                           <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                             <select
                             id="comboDepartamento"
                             name="departmentId"
                             className="text-black"
                             onChange={setSelectedOptionRev}>
                              <option value="">Elije</option>
                             {select.map((c)=>(
                               <option data-key={c.key} value={c.value} >{c.key}</option>
                             ))} 
                                         
                           </select>
                          
                         </td>
                           <td>
                         {select.filter((c) => {return c.value === textsRev}).map(v =>(
                           <h1> {v.value}</h1>

                         ))}
                           </td>
                           
                         </>
                       </>
                     </tr>
                  ))}
                  {importRec?.map(({ nombre, select }, index)=>(
                       <tr>
                       <>
                         <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                           {nombre}
                         </td>
                         <>
                           <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                             <select
                             id="comboDepartamento"
                             name="departmentId"
                             className="text-black"
                             onChange={setSelectedOptionRec}>
                              <option value="">Elije</option>
                             {select.map((c)=>(
                               <option data-key={c.key} value={c.value} >{c.key}</option>
                             ))} 
                           </select>
                         </td>
                           <td>
                         {select.filter((c) => {return c.value === textsRec}).map(v =>(
                           <h1> {v.value}</h1>

                         ))}
                           </td>
                           
                         </>
                       </>
                     </tr>
                  ))}
                
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-4 flex justify-items-center">
            <span>
            Una vez calificados cada uno de los atributos, se procede a determinar la importancia de la afectación de acuerdo a la siguiente relación:
            </span>
          </div>
          <div className="mt-4 flex justify-center">
          <h1>I= (3*IN) + (2*EX) + PE + RV + MC</h1>
          </div>
          <div>
          </div>
           
          <br />
          <h1>7. 2. 2.	Evaluación del Riesgo</h1>
          <br />
          <div className="mt-4 py-4 flex justify-center bg-white text-lg text-black">
          I : {(3*parseInt(selectedIn))+(2*parseInt(selectedEx))+ parseInt(selectedPer) + parseInt(selectedRev)+ parseInt(selectedRec)}
          </div>
          <br />
          <div  className="justify-items-center">
            <h1>
            De no concretarse en afectación ambiental, se proceda a evaluar el riesgo, conforme a lo establecido en el Artículo  8 de la Resolución 2086 de 2010, donde:&nbsp; &nbsp;
            </h1>
            <br />
              <p align="left"> r = Riesgo</p>
              <p align="left">o = Probabilidad de ocurrencia de la afectación</p>
              <p align="left">m = Magnitud potencial de la afectación</p>
          </div>
          <br />
          <div>
            <p className="text-2xl ">
            Probabilidad de Ocurrencia de la afectación (o): 
            </p>
          </div>
          <div>
            <p>La probabilidad de ocurrencia de la afectación se puede calificar como muy alta, alta, moderada, baja o muy baja y atendiendo los valores presentados en la siguiente tabla:</p>
          </div>
          <br />
          <div className="flex justify-center">

          <table className="felx w-1/2 justify-center">
            <tr >
              <th className="border  text-sm font-medium text-gray-900 px-6 py-4">Calificación</th>
              <th className="border  text-sm  bg-red-500 dark:bg-gray-800 font-medium text-gray-900 px-6 py-4">Probabilidad de ocurrencia (o)</th>
            </tr>
            <tbody className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              {probabili?.map(({ valor, probabilidad }, index)=>(

                <tr className=" justify-items-center" key={index}>
                  <td className="border flex justify-center text-base py-2" >
                    {valor}
                  </td>
                  <td className="border px-6 bg-red-500 dark:bg-gray-800 text-base justify-items-center py-2 cursor-pointer">
                  <div onClick={()=>setProb(probabilidad)} className="flex justify-center  bg-red-500 dark:bg-gray-800 text-base">
                    {probabilidad}
                  </div>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
          </div>
         
          <br /><br />
          <div>
            <p className="text-2xl ">
            Magnitud Potencial de la afectación (m): 
            </p>
          </div>
          <div>
            <h1>La magnitud potencial de la afectación se puede calificar como irrelevante, leve, moderada, severa o crítica, atendiendo los valores presentados en la siguiente tabla:</h1>
          </div>
          <br />
          <div className="flex justify-center">
          <table className="felx w-1/2 justify-center">
            <tr>
              <th className="border  text-sm font-medium text-gray-900 px-6 py-4">Criterio de valoración de afectación</th>
              <th className="border text-sm font-medium text-gray-900 px-6 py-4 ">Importancia de la afectación (I)</th>
              <th scope="col" className="border text-sm bg-red-500 dark:bg-gray-800 px-6 py-4">Magnitud potencial de la afectación (m)</th>
            </tr>
            <tbody className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              {magnitud.map(({ criterio, importancia,magnitud }, index)=>(
                   <tr className=" justify-items-center"  key={index}>
                   <td className="border flex  justify-center text-base py-2" >{criterio}</td>
                   <td className="border mx-4 justify-items-center text-base py-2"> <p align ="center"> {importancia} </p></td>
                   <td className="border px-6 bg-red-500 dark:bg-gray-800 text-base py-2">
                    <div onClick={()=>setmagni(magnitud)} className="flex justify-center text-base">
                    <h1 className="text-white hover:text-blue-500 text-6xl cursor-pointer">{magnitud}</h1>
                    </div>
                    </td>
                   
                 </tr>
              ))}
            </tbody>
          </table>
          </div>
          
          <br />
          <div>
            <p className="text-2xl ">
            Valor del riesgo: 
            </p>
            <p className="text-2xl ">
            r = o x m
            </p>
          </div>
          <br />
          <div className="mt-4 py-4 flex justify-center bg-white text-lg text-black">
          r : {parseFloat(prob)* parseFloat(magni)}
          </div>
          <br />
          <div>
            <h1>
            Hasta este punto el informe técnico realiza el análisis de valoración por afectación o riesgo, conforme la norma, con el fin de entregar los elementos técnicos que se requieren para la proyección de las respectivas actuaciones jurídicas.
            </h1>
          </div>

        </form>
      </>
      
       }
      </div>
    </div>
  </>
    
  );
};

export default Problematica;
