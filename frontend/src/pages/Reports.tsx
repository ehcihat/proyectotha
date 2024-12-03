import { Button, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import Menu from "../components/Menu";
import InformeColeccion from "../components/InformeColeccion";
import InformeUsuario from "../components/InformeUsuario";

function Reports() {


    const [datosColeccion, setDatosColeccion] = useState<any[]>([]);
    const [datosUsuario, setDatosUsuario] = useState<any[]>([]);

    const [mostrarInformeCol, setMostrarInformeCol] = useState(false);
    const [mostrarInformeUser, setMostrarInformeUser] = useState(false);

    
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3030/getItem");
            const result = await response.json();
            if (response.ok) {
                if (Array.isArray(result.data)) {
                    setDatosColeccion(result.data);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const fetchDataUser = async () => {
        try {
            const response = await fetch("http://localhost:3030/getUser");
            const result = await response.json();
            if (response.ok) {
                if (Array.isArray(result.data)) {
                    setDatosUsuario(result.data);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleInformeClick = () => {
        fetchData();
        setMostrarInformeCol(true);
    };

    const handleInformeUserClick = () => {
        fetchDataUser()
        setMostrarInformeUser(true);
    }
    return (
        <>
            <Menu />
            <Tooltip title="Generar informe de colección" placement="bottom" arrow>
            {!mostrarInformeCol && (
            <Button
                onClick={handleInformeClick}
                type="submit"
                variant="contained"
                sx={{ marginRight: 1, backgroundColor: "primary.main",  color: "white", }} > INFORME COLECCIÓN </Button>
                
            )}
            </Tooltip>
            {!mostrarInformeUser && (
            <Button onClick={handleInformeUserClick} type="submit" variant="contained"
            sx={{ marginRight: 1, backgroundColor: "primary.main",  color: "white", }}>  INFORME USUARIO </Button>
             )}
            {mostrarInformeCol && <InformeColeccion datos={datosColeccion} />}
            {mostrarInformeUser && <InformeUsuario datos={datosUsuario}/>}
         </>
    );
}





export default Reports;