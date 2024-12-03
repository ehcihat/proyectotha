import React, { useState } from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Column } from "@material-table/core";
import { useTheme } from '@mui/material/styles';
interface IColeccion {
    nombre: string;
    marca: string;
    tipo: string;
    precio: number;
}

interface InformeColeccionProps {
    datos: IColeccion[];
}

function InformeColeccion({ datos }: InformeColeccionProps) {

    const columnas: Column<IColeccion>[] = [

        { title: "Nombre", field: "nombre", filtering: false },
        { title: "Marca", field: "marca", filtering: true },
        { title: "Tipo", field: "tipo", filtering: true },
        { title: "Precio", field: "precio", type: "numeric", filtering: false },
    ];



    const theme = useTheme();




    const totalPrecio = datos.reduce((agg, row) => agg + row.precio, 0);

    return (
       
        <MaterialTable
         
            columns={columnas}
            data={datos}
            title="Informe de Colección"
            options={{
                columnsButton: true,
                draggable: true,
                filtering: true,
                exportMenu: [
                    {
                        label: "Exportar a PDF",
                        exportFunc: (cols, datas) => {
                     
                            const totalRow = {
                                nombre: "Total",
                                marca: "",
                                tipo: "",
                                precio: totalPrecio
                            };
                      
                            const newData = [...datas, totalRow];
                            return ExportPdf(cols, newData, "informe_coleccion.pdf");
                        },
                    },
                    {
                        label: "Exportar a CSV",
                        exportFunc: (cols, datas) => {
            
                            const totalRow = {
                                nombre: "Total",
                                marca: "",
                                tipo: "",
                                precio: totalPrecio
                            };
                  
                            const newData = [...datas, totalRow];
                            return ExportCsv(cols, newData, "informe_coleccion.csv");
                        },
                    },
                ],
                headerStyle: {
                    backgroundColor: theme.palette.secondary.main,
                    color: "white",
                },
                rowStyle: {
                    backgroundColor: "white",
                },
            }}
            style={{  width: '100vh', overflowX: 'auto' }}
            renderSummaryRow={({ column, data }) =>
                column.field === "precio"
                    ? {
                        value: data.reduce((agg, row) => agg + row.precio, 0),
                        style: { background: theme.palette.primary.main, color: "white", fontWeight: "bold" },
                    }
                    : undefined
            }
        />

    );
}



export default InformeColeccion