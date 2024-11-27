import { useState } from 'react';
import { Button, Box, TextField, Alert, Paper, Typography } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { authActions } from '../store/authSlice'
function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({ name: '', password: '' });
    const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error'} | null>(null);
    const bduser = "tahiche";
    const bdpasswd = "1234";

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setAlert(null);
    
        async function isVerifiedUser () {
            fetch(`http://localhost:3030/login?user=${data.name}&password=${data.password}`)
            .then(response => response.json())
            .then (response => {
            console.log('Lo que nos llega de la base de datos: ')
            console.log(response.data)
            if (response.data.length !== 0){
                setAlert({ message: 'Credenciales correctas.', severity: 'success' });
    
                setTimeout(() => {
                    dispatch(
                        authActions.login({
                            name: data.name,
                            role: response.data.rol,
                        })
                    );
                    navigate('/home');
                }, 2000);
            } else{
                setAlert({
                    message: 'Credenciales incorrectas. Por favor, intente nuevamente.',
                    severity: 'error',
                });
            }
           })
           .catch((error) => {
            console.error('Error al conectar con el servidor:', error);
            setAlert({
                message: 'Error al conectar con el servidor.',
                severity: 'error',
            });
        });
           }
           isVerifiedUser();
        }
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
            <Button variant='contained' fullWidth type='submit' sx={{ backgroundColor: "primary.main", mt: 2 }}>
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
