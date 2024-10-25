import { useState } from 'react';
import { Button, Box, TextField, Alert, Paper, Typography } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({ name: '', password: '' });
    const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error'} | null>(null);
    const bduser = "tahiche";
    const bdpasswd = "1234";

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setAlert(null);
    
        if (data.name === bduser && data.password === bdpasswd) {
            setAlert({ message: 'Credenciales correctas.', severity: 'success' });
            setTimeout(() => {navigate("/home")}, 2000)
        } else {
            setAlert({ message: 'Credenciales incorrectas. Por favor, intente nuevamente.', severity: 'error' });
        }

        console.log('Datos enviados:', data);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
   
        <Paper elevation={10} square={false} sx={{ textAlign: 'center' }} >
                 <Typography paddingTop={2} variant = "h5" margin = {2}>Sistema de acceso </Typography>
                 <LockIcon/>
        <Box component='form' onSubmit={handleSubmit}>
 
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <TextField
                        required
                        label='Nombre'
                        variant='outlined'
                        fullWidth
                        name='name'
                        value={data.name}
                        onChange={handleChange}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        required
                        label='Contraseña'
                        variant='outlined'
                        fullWidth
                        type='password'
                        name='password'
                        value={data.password}
                        onChange={handleChange}
                    />
                </Grid2>
            </Grid2>
            <Button variant='contained' fullWidth type='submit' sx={{ mt: 2 }}>
                Acceder
            </Button>
            {alert && (
                <Alert severity={alert.severity} sx={{ mt: 2 }}>
                    {alert.message}
                </Alert>
            )}
       
        </Box>
        </Paper>
    );
}

export default Login;
