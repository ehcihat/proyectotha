import { useState } from 'react'
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { Button } from '@mui/material'
function Login() {


    return (

        <Container>
            <header>
                <Typography variant="h1" sx={{ color: "primary.main", margin: 4 }}>
                    Página Login de Tahiche Hernández Almeida
                </Typography>
            </header>

            <main>
                <Typography variant="h2" sx={{ color: "secondary.main", margin: 4 }}>
                    Ejemplo color secundario
                </Typography>
                <Typography variant="h3" sx={{ color: "warning.main", margin: 4 }}>
                    Ejemplo color de advertencia
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "error.main", margin: 4, fontWeight: "bold" }}>
                    Ejemplo color de error
                </Typography>
                <Typography variant="body1" sx={{ color: "info.main", margin: 4, fontWeight: "bold" }}>
                    Ejemplo color de información
                </Typography>
                <Typography variant="caption" sx={{ color: "success.main", margin: 4, fontWeight: "bold" }}>
                    Ejemplo color de éxito
                </Typography>

                <Button variant="text" sx={{ color: "primary.main", margin: 4 }}>
                    Botón Principal
                </Button>
                <Button variant="contained" sx={{ margin: 4, backgroundColor: "secondary.main", color: "white" }}>
                    Botón secundario
                </Button>
                <Button variant="outlined" sx={{ margin: 4, backgroundColor: "warning.main", color: "white" }}>
                    Botón terciario
                </Button>
            </main>
        </Container>
    );
}
export default Login
