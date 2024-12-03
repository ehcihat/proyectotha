import React, { useState } from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Column } from "@material-table/core";
import { useTheme } from '@mui/material/styles';
interface IUsuario {
    nombre: string;
    login: string;
    password: string;
    rol: string;
}

interface InformeUsuarioProps {
    datos: IUsuario[];
}

function InformeUsuario({ datos }: InformeUsuarioProps) {

    const columnas: Column<IUsuario>[] = [

        { title: "Nombre", field: "nombre", filtering: true },
        { title: "Login", field: "login", filtering: false },
        { title: "Password", field: "password", filtering: false },
        { title: "Rol", field: "rol", filtering: false },
    ];



    const theme = useTheme();




    return (
       
        <MaterialTable
         
            columns={columnas}
            data={datos}
            title="Informe de Usuarios"
            options={{
                columnsButton: true,
                draggable: true,
                filtering: true,
                exportMenu: [
                    {
                        label: "Exportar a PDF",
                        exportFunc: (cols, datas) => {
                     
                            const totalRow = {
                                nombre: "",
                                login: "",
                                password: "",
                                rol: ""
                            };
                      
                            const newData = [...datas, totalRow];
                            return ExportPdf(cols, newData, "informe_usuario.pdf");
                        },
                    },
                    {
                        label: "Exportar a CSV",
                        exportFunc: (cols, datas) => {
            
                            const totalRow = {
                                nombre: "",
                                login: "",
                                password: "",
                                rol: ""
                            };
                  
                            const newData = [...datas, totalRow];
                            return ExportCsv(cols, newData, "informe_usuario.csv");
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
          
        />

    );
}



export default InformeUsuario