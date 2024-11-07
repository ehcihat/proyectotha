import { Button, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { RootState } from '../store/index'
import { authActions } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
export default function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((state: RootState) => state.authenticator)
    console.log(userData)
    const handleLogout = () =>{
        dispatch(authActions.logout())
        navigate('/')
    }


    return <>

        <Container>
            <Typography variant="h1">Página Home Tahiche Hernández Almeida: Soy el usuario {userData.userName} y tengo el rol {userData.userRole}</Typography>
            <Button variant='contained'  onClick={handleLogout}>Cerrar Sesión</Button>
        </Container>




    </>

};

