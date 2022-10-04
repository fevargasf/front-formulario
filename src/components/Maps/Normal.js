import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { RadioButtonComponent } from "@syncfusion/ej2-react-buttons";
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

const Normal = () => {
  const [importt, setImportt] = useState([]);
  const [ids, setIdis] = useState([]);
  const [texts, setTexts] = useState();
  const [inte, setInte] = useState("");
  const [ext, setExt] = useState([]);

  const importancia = [
    {
      nombre: "Intensidad(IN)",
      1: "Afectación del bien de protección representada en una desviación del estándar fijado por la norma y comprendida en el rango entre 0 y 33%",
      4: "Afectación del bien de protección representada en una desviación del estándar fijado por la norma y comprendida en el rango entre 34 y 66%",
      8: "Afectación del bien de protección representada en una desviación del estándar fijado por la norma y comprendida en el rango entre 67 y 99%.",
      12: "Afectación del bien de protección representada en una desviación del estándar fijado por la norma igual o superior al 100%.",
      calificacion: ["1", "4", "8", "12"],
    },
    {
      nombre: "Extension (EX)",
      1: "Cuando la afectación puede determinarse en un área localizada e inferior a una (1) hectárea.",
      4: "Cuando la afectación incide en un área determinada entre una (1) hectárea y cinco (5) hectáreas.",
      12: "Cuando la afectación se manifiesta en un área superior cinco (5) hectáreas.",
      calificacion: ["1", "4", "12"],
    },
  ];

  //console.log(importancia.filter((c,i)=>c["calificacion"] === c["1"]))

  const c = importancia.map((c) => c["calificacion"].map((i) => i));


  function setSelectedOption(e) {
    console.log(e.target.value);
    let selectedState = e.target.value;
    setTexts(selectedState);
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

  const classes = useStyles();
  const [state, setState] = useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center mt-4 mb-2 text-xl font-bold">
          <h1>Problematica y/o Conflicto Ambiental</h1>
        </div>
        <div className="flex justify-center mt-4">
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Si"
                /*  checked={this.state.selectedOption === "Male"}
              onChange={this.onValueChange} */
              />
              Si
            </label>
          </div>
          <div className="radio_No">
            <label>
              <input
                type="radio"
                value="No"
                /*      checked={this.state.selectedOption === "No"}
              onChange={this.onValueChange} */
              />
              No
            </label>
          </div>
        </div>
        <h1 className="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2">
          7.1. CATEGORIZACIÓN DE LA AFECTACIÓN Y/O PROBLEMÁTICA AMBIENTAL :
        </h1>
        <hr />
        <br />
        <br />
        <section>
          <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">
                Problemas ambientales en relación al agua
              </FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={gilad}
                      onChange={handleChange}
                      name="gilad"
                    />
                  }
                  label="
                    -Distribución del recurso hídrico
                    
                    "
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={jason}
                      onChange={handleChange}
                      name="jason"
                    />
                  }
                  label="-Administración del recurso hídrico  "
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={antoine}
                      onChange={handleChange}
                      name="antoine"
                    />
                  }
                  label="-Trámites ambientales"
                />
              </FormGroup>
              <FormHelperText>Be careful</FormHelperText>
            </FormControl>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">
                Problemas y conflictos ambientales en relación al aire
              </FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={gilad}
                      onChange={handleChange}
                      name="gilad"
                    />
                  }
                  label="
                    Contaminación atmosférica por fuentes fijas "
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={jason}
                      onChange={handleChange}
                      name="jason"
                    />
                  }
                  label="Contaminación atmosférica por móviles"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={antoine}
                      onChange={handleChange}
                      name="antoine"
                    />
                  }
                  label="Ruido "
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={antoine}
                      onChange={handleChange}
                      name="antoine"
                    />
                  }
                  label="Olores ofensivos"
                />
              </FormGroup>
            </FormControl>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">
                Problemas y conflictos ambientales en relación a los bosques y
                suelos
              </FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={gilad}
                      onChange={handleChange}
                      name="gilad"
                    />
                  }
                  label="
                    Deforestación "
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={jason}
                      onChange={handleChange}
                      name="jason"
                    />
                  }
                  label="Interacciones humanos"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={antoine}
                      onChange={handleChange}
                      name="antoine"
                    />
                  }
                  label="fauna silvestre "
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={antoine}
                      onChange={handleChange}
                      name="antoine"
                    />
                  }
                  label="Cambio climático"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={antoine}
                      onChange={handleChange}
                      name="antoine"
                    />
                  }
                  label="Gestión del riesgo"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={antoine}
                      onChange={handleChange}
                      name="antoine"
                    />
                  }
                  label="Residuos sólidos"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={antoine}
                      onChange={handleChange}
                      name="antoine"
                    />
                  }
                  label="Expansión agrícola"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={antoine}
                      onChange={handleChange}
                      name="antoine"
                    />
                  }
                  label="Expansión urbana"
                />
              </FormGroup>
            </FormControl>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">
                Problemas y conflictos ambientales en relación a macroproyectos.{" "}
              </FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={gilad}
                      onChange={handleChange}
                      name="gilad"
                    />
                  }
                  label="Minería "
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={jason}
                      onChange={handleChange}
                      name="jason"
                    />
                  }
                  label="Hidroeléctricas"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={antoine}
                      onChange={handleChange}
                      name="antoine"
                    />
                  }
                  label="Hidrocarburos"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={antoine}
                      onChange={handleChange}
                      name="antoine"
                    />
                  }
                  label="Infraestructura"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={antoine}
                      onChange={handleChange}
                      name="antoine"
                    />
                  }
                  label="Agroindustria"
                />
              </FormGroup>
            </FormControl>
          </div>
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
        <h1>
          Contiene los siguientes componentes: 7.2.1. Determinación de la
          importancia de la afectación: (cuando se identifica afectación
          ambiental)
        </h1>
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
                {/*  key[1]["Extension (EX)"].numeral */}

                {importancia.map((v) => (
                  <tr>
                    <>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                        {v.nombre}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <select
                          id="comboDepartamento"
                          name="departmentId"
                          className="text-black"
                          onChange={setSelectedOption}>
                          {v["calificacion"].map((v, y) => (
                            <option key={y}>{v}</option>
                          ))}
                        </select>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <h1> {v[texts]}</h1>
                      </td>
                    </>
                  </tr>
                ))}
               
              </tbody>
            </table>
          </div>
        </div>
        <br />
        <h1>7. 2. 2.	Evaluación del Riesgo</h1>
        <br />
        <input placeholder="Ingrese el valor" type="text" />
      </form>
    </div>
  );
};

export default Normal;
