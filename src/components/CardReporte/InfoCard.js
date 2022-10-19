import React, { useEffect, useRef, useState } from "react";
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';

const INITIAL_FILTERS =[ {
          inSR:"",
          outSR:{},
          xPro:"",
          yPro:""
}]

const INICIAL_SISTEM =
  {  
    "geometries":[
    { "x": "",
      "y": ""
    }]
};

const InfoCard =  ({q, row}) => {
  const [visible, setVisible] = useState(false);
  const [result, setResult] = useState(INICIAL_SISTEM);
  const [filterState, setFilterState] = useState(INITIAL_FILTERS);
  const inSR = "3116"
  const outSR = {wkt:'PROJCS[\"MAGNA-SIRGAS / Origen-Nacional\",GEOGCS[\"MAGNA-SIRGAS\",DATUM[\"Marco_Geocentrico_Nacional_de_Referencia\",SPHEROID[\"GRS 1980\",6378137,298.257222101,AUTHORITY[\"EPSG\",\"7019\"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY[\"EPSG\",\"6686\"]],PRIMEM[\"Greenwich\",0,AUTHORITY[\"EPSG\",\"8901\"]],UNIT[\"degree\",0.0174532925199433,AUTHORITY[\"EPSG\",\"9122\"]],AUTHORITY[\"EPSG\",\"4686\"]],PROJECTION[\"Transverse_Mercator\"],PARAMETER[\"latitude_of_origin\",4.0],PARAMETER[\"central_meridian\",-73.0],PARAMETER[\"scale_factor\",0.9992],PARAMETER[\"false_easting\",5000000],PARAMETER[\"false_northing\",2000000],UNIT[\"metre\",1,AUTHORITY[\"EPSG\",\"9001\"]],AUTHORITY[\"EPSG\",\"9377\"]]'}
  
 
  useEffect(() => {
    if (visible) {
        console.log("Entro al effect");
    } 
  }, [visible]); 
  function toggle(value){
    setVisible(false)
  }

  const handleInputChange = (e, i) => {
    const { name, value } = e.target;
    console.log(value)
    const list = [...filterState];
   list[i][name] = value;
   setFilterState(list);
};



 const handleSave = (e) => {
  e.preventDefault()
  setFilterState(filterState);
  console.log("saved : ", filterState);
  const tipo = "json"

 var f = new FormData();

 filterState.map((r)=>{ 
   
   const geo = 
    {
      geometryType:"esriGeometryPoint",
    "geometries":[
      {
        "x":r.xPro,
        "y":r.yPro,
        "spatialReference":{"wkid":3116}
      }]
    }
  
    f.append("f", tipo);
    f.append( "inSR",  inSR ? String(r.inSR) : "");
    f.append("outSR", JSON.stringify(outSR));
    f.append( "geometries",JSON.stringify(geo)? JSON.stringify(geo) : "");

})
  fetch(`https://geografico.corantioquia.gov.co/arcgis/rest/services/Utilities/Geometry/GeometryServer/project`, {
  method: "POST",
  body: f,
})
  .then((response) => response.json() )
  .then((data) => {
   setResult(data);
  })
  .catch((error) => {
    console.error(error);
  }); 
  
};

  return (
    <div
      className="flex py-7 px-2 pr-4 border-b cursor-pointer hover:opacity-80
    hover:shadow-lg transition duration-200 ease-out first:border-t" >
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
     
      </div>
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p>Localización del trámite :</p>
          <div className="">{" "}
    
        <p className="text-lg font-semibold pb-2 lg:text-2xl">  &nbsp;&nbsp;&nbsp; Coordenada / x</p>
        <input
         type="number"
          value={q?.x}
          className="text-black"
          />
        </div>
          <div>
            <p className="text-lg font-semibold pb-2 lg:text-2xl ">Coordenada / y</p>
            <input 
            value={q?.y} 
            type="number"
            className="text-black" />
          </div>
        </div>
        <br />
        <button className="border" onClick={() => setVisible(true)}>
          Generar Conversión 
           <ThreeSixtyIcon fontSize="large"/>
        </button>
        {visible  && 
          <>
          <div className="mt-2">
            <button className='btn' 
              onClick={toggle}>🅧</button>
          </div>
       
          <div className='row offset6'>
              <div className='span4 '>
                <div className="well well-large form-horizontal">
                  <form className="form-horizontal border shadow-2xl form-small">
                    {filterState.map((r,i)=>{
                      return(
                        <>
                       <div className="control-group">
                        &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                         <label className="control-label" for="inputPassword">Sistema de coordenadas Actual:</label>
                       
                               <div className="controls">
                                 <select 
                                 name="inSR"
                                 onChange={(e) => handleInputChange(e,i)}
                                 className="form-control  text-black">
                                   <option name="inicio" value="0">Elije sistema</option>
                                 <option  value={inSR}>MAGNA-SIRGAS Colombia Bogota</option>
                               </select>
                           </div>
                         </div>
                       <div className="control-group">
                       &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                         <label className="control-label" >Coordenada X/Longitud:</label>
                         &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                         <label className="control-label" >Coordenada Y/Latitud:</label>
                         <div className="controls">
                         <input 
                          value={r.xPro ||""}
                           className="text-black"
                           onChange={(e) => handleInputChange(e,i)}
                           type="number"
                           name ="xPro" />
                           <input 
                           value={r.yPro ||""}
                           className="text-black"
                           type="number"
                           name ="yPro"
                           onChange={(e) => handleInputChange(e,i)}
                           />
                         </div>
                       </div>
                       <div className ="control-group">
                       &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                         <label className ="control-label" >Sistema de coordenadas de salida : </label>
                               <div className ="controls ">
                                 <select 
                                 name="outSR"
                                 onChange={(e) => handleInputChange(e,i)}
                                 className ="form-control  text-black">
                                 <option name="salida" value="0">Elije sistema</option>
                                 <option   value={outSR}>MAGNA-SIRGAS / Origen-Nacional</option>
                               </select>
                           </div>
                         </div>
                       </>
                      )
                       

                    })}
                   
                 
                    <div className ="control-group">
                    &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                      <label className ="control-label" >Coordenada X/Longitud:</label>
                      &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                      <label className ="control-label" >Coordenada Y/Latitud:</label>
                      <div className ="controls">
                        {Object.values(result)[0]?.map((v) => (
                          <>
                          <input 
                            className="text-black"
                            value={v?.x || ""}
                            type="number"
                            name ="" />
                          <input
                            className="text-black"
                            value={v?.y || ""} 
                            type="number"
                            name ="" />
                          </>
                        ))}
                     
                      </div>
                    </div>
                    <button onClick={(e)=>handleSave(e)} className="button">Proyectar</button>
                    </form>
                  </div>
                </div> 
             </div>
           </>
              }
        <br />
       
          <>
          <h4 className="text-xl">OBSERVACIÓN :</h4>
         <textarea
        value={row?.viObservaciones || ''}
        type="text"
        className="ml-2 mr-4 mt-4 text-black"
        name="viObservaciones"
        cols="30" rows="10"
        onChange={(e) => handleInputChange(e)}
        />
        <br />
        <h4 className="text-xl">DESCRIPCIÓN :</h4>
        <textarea 
         value={row?.viDescripcion}
        type="text"
        className="ml-2 mr-4 mt-4 text-black"
        name="viDescripcion"
        cols="30" rows="10"
        onChange={(e) => handleInputChange(e)}
        />
          </>
     
        

        <br /><br />
        <hr />
      </div>
    </div>
  );
};
export default InfoCard;
