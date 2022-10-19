
import { axiosInstance } from "Helpers/auth-helpers";
import React, { useState,useEffect }  from "react";
import { useDispatch, useSelector } from "react-redux";

import "jodit";
import "jodit/build/jodit.min.css";
import JoditEditor from "jodit-react";
import ClearIcon from "@material-ui/icons/Clear";
import Loading from '../Loading';

const copyStringToClipboard = function(str) {
  var el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style = { position: "absolute", left: "-9999px" };
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

const facilityMergeFields = [
  "FacilityNumber",
  "FacilityName",
  "Address",
  "MapCategory",
  "Latitude",
  "Longitude",
  "ReceivingPlant",
  "TrunkLine",
  "SiteElevation"
];
const inspectionMergeFields = [
  "InspectionCompleteDate",
  "InspectionEventType"
];
const createOptionGroupElement = (mergeFields, optionGrouplabel) => {
  let optionGroupElement = document.createElement("optgroup");
  optionGroupElement.setAttribute("label", optionGrouplabel);
  for (let index = 0; index < mergeFields.length; index++) {
    let optionElement = document.createElement("option");
    optionElement.setAttribute("class", "merge-field-select-option");
    optionElement.setAttribute("value", mergeFields[index]);
    optionElement.text = mergeFields[index];
    optionGroupElement.appendChild(optionElement);
  }
  return optionGroupElement;
}
const buttons = [
  "undo",
  "redo",
  "|",
  "bold",
  "strikethrough",
  "underline",
  "italic",
  "|",
  "superscript",
  "subscript",
  "|",
  "align",
  "|",
  "ul",
  "ol",
  "outdent",
  "indent",
  "|",
  "font",
  "fontsize",
  "brush",
  "paragraph",
  "|",
  "image",
  "link",
  "table",
  "|",
  "hr",
  "eraser",
  "copyformat",
  "|",
  "fullsize",
  "selectall",
  "print",
  "|",
  "source",
  "|",
  {
    name: "insertMergeField",
    tooltip: "Insert Merge Field",
    iconURL: "images/merge.png",
    popup: (editor, current, self, close) => {
      function onSelected(e) {
        let mergeField = e.target.value;
        if (mergeField) {
          console.log(mergeField);
          editor.selection.insertNode(
            editor.create.inside.fromHTML("{{" + mergeField + "}}")
          );
        }
      }
      let divElement = editor.create.div("merge-field-popup");

      let labelElement = document.createElement("label");
      labelElement.setAttribute("class", "merge-field-label");
      labelElement.text = 'Merge field: ';
      divElement.appendChild(labelElement);

      let selectElement = document.createElement("select");
      selectElement.setAttribute("class", "merge-field-select");
      selectElement.appendChild(createOptionGroupElement(facilityMergeFields, "Facility"));
      selectElement.appendChild(createOptionGroupElement(inspectionMergeFields, "Inspection"));
      selectElement.onchange = onSelected;
      divElement.appendChild(selectElement);

      console.log(divElement);
      return divElement;
    }
  },
  {
    name: "copyContent",
    tooltip: "Copy HTML to Clipboard",
    iconURL: "images/copy.png",
    exec: function(editor) {
      let html = editor.value;
      copyStringToClipboard(html);
    }
  }
];

const editorConfig = {
  readonly: false,
  toolbar: true,
  spellcheck: true,
  language: "en",
  toolbarButtonSize: "medium",
  toolbarAdaptive: false,
  showCharsCounter: true,
  showWordsCounter: true,
  showXPathInStatusbar: false,
  askBeforePasteHTML: true,
  askBeforePasteFromWord: true,
  //defaultActionOnPaste: "insert_clear_html",
  buttons: buttons,
  uploader: {
    insertImageAsBase64URI: true
  },
  width: "80rem",
  height: "30rem"
};


const initialContent =`
<p>

.</p>
<hr>
`

export default function ToolsDocumento({idEtapa}){
  const user = useSelector((state) => state.auth.usuario)
  const [data, setData] = useState(initialContent);
  const [rows, setRows] = useState([
    {
      niSecEEta: "",
      nioLinea: "",
      ciTexto: "",
      biArchivo: "",
      viIdUsuario: ""
    }
  ]);
  const [isEdit, setEdit] = useState(false);
  const handleSave = (e) => {
   e.preventDefault();
   
    setEdit(!isEdit);
    setRows(rows);
    console.log("saved : ", rows);
      const file=''
    var f = new FormData();
    rows.map((r)=>{ 
      f.append("niSecEEta", idEtapa);
      f.append( "nioLinea", r.nioLinea ? String(r.nioLinea) : null);
      f.append("ciTexto", data);
      f.append( "biArchivo", file ? String(file) : "");
      f.append("viIdUsuario",user)
    })
        fetch("http://localhost:8082/guardar_analisis", {
        method: "POST",
        body: f,
      })
        .then((response) => response.json() )
        .then((data) => {
        console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });   
       // setDisable(true);
       // setOpen(true);
      };
    console.log(data)

  return (
    <div className="App" style={{ maxWidth: editorConfig.width, margin: "0 auto" }}>
      <h1>(Diligenciar cuando aplique o eliminar numeral de no ser requerido, según entrega de información aportada por el usuario o documentos adicionales que la Corporación requiera incorporar en el trámite, como son los analisis por unidad territorial, ICA para licencia, PUEAA para concesiones, caracterizaciones para vertimientos, entre otros)</h1>
      <JoditEditor
        value={data}
        name="ciTexto"
        config={editorConfig}
        onChange={value => setData(value)}
      />
      <button onClick={handleSave}>Guardar</button>
    </div>
  );
 

  }
