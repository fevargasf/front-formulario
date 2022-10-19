import React, {useState, useEffect, useRef } from "react";
import store from 'redux/store'
import { Paragraph, Document,Table, Packer,TableCell, TableRow, VerticalAlign,HeadingLevel, ImageRun, TextRun, PageBreak, PageNumber, AlignmentType,Header } from "docx";
import { saveAs } from "file-saver";
import Button from "@material-ui/core/Button";



export const ActionButton = ()=> {

  const [items, setItems] = useState([]);
  

  useEffect(() => {
    const dataStorage = store.getState().information
   
    let informaciomPrincipal =  dataStorage.data;
    setItems(informaciomPrincipal)
   // localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

console.log(items.nombre_asunto)
  const generate = () => {
    const table = new Table({
   
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [],
                }),
              ],
              rowSpan: 3,
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: "SISTEMA DE GESTIÓN INTEGRAL - SGI",
                  
                  spacing: {
                    before: 100,
                    after: 100,
                  },
                }),
              ],
              columnSpan: 3,
            }),
          ],
        }),
    
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  text: "INFORME TÉCNICO DE EVALUACIÓN PERMISO, CONCESIONES, AUTORIZACIONES, LICENCIAS Y DEMÁS INSTRUMENTOS DE MANEJO AMBIENTAL",
                  spacing: {
                    before: 100,
                    after: 100,
                  },
                }),
              ],
              columnSpan: 3,
            }),
          ],
        }),
    
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  text: "CÓDIGO: F-ARN-       ",
                  spacing: {
                    before: 100,
                    after: 100,
                  },
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: "VERSIÓN: 03",
                  spacing: {
                    before: 100,
                    after: 100,
                  },
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      children: [
                        "PÁGINA ",
                        PageNumber.CURRENT,
                        " DE ",
                        PageNumber.TOTAL_PAGES,
                      ],
                      font: "Arial",
                      size: 18,
                      text: "VERSIÓN: 03",
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                  spacing: {
                    before: 100,
                    after: 100,
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    });
    const doc = new Document({

      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 2270,
                right: 1700,
                bottom: 1700,
                left: 2270,
              }
            },
          },
          headers: {
            default: new Header({
              children: [
                table,
                new Paragraph({
                  children: [
                    new TextRun({
                      font: "Arial",
                      size: 22,
                      text: "Código Dependencia-",
                    }),
                  ],
                  alignment: AlignmentType.LEFT,
                  spacing: {
                    before: 100,
                    after: 100,
                  },
                }),
              ],
            }),
          },
        /*   footers: {
            default: new doc.Footer({
              children: [             
                 new doc.Paragraph({
                  children: 
                  [infer]
                }),
                ]                 
                })                  
          }, */
          children: [new Paragraph({
            children: [
              new TextRun({
                font: "Arial",
                size: 24,
                text: (`Nombre del interesado: ${items?.nombre_interesado}`),
              }),
            ],
          })],
        }
      ]
    });

    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, "F-ARN-34_informe_tecnico_control&seguimiento_permisos.docx");
      console.log("Document created successfully");
    });
  };
  return (
    <>
      <Button  variant="contained"  onClick={generate}>Generar doc</Button>
    </>
  );
};
