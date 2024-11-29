import { Button, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import Menu from "../components/Menu";
import InformeColeccion from "../components/InformeColeccion";
function Reports() {


    const [datosColeccion, setDatosColeccion] = useState<any[]>([]);


    const [mostrarInforme, setMostrarInforme] = useState(false);

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

    const handleInformeClick = () => {
        fetchData();
        setMostrarInforme(true);
    };
    return (
        <>
            <Menu />
            <Tooltip title="Generar informe de colección" placement="bottom" arrow>
            {!mostrarInforme && (
            <Button
                onClick={handleInformeClick}
                type="submit"
                variant="contained"
                sx={{ marginRight: 1, backgroundColor: "primary.main",  color: "white", }} > INFORME COLECCIÓN </Button>
            )}
            </Tooltip>
            {mostrarInforme && <InformeColeccion datos={datosColeccion} />}
        </>
    );
}





export default Reports;