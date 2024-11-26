import React, { useEffect } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid2 from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import { useState } from 'react'



function UserManager() {
    const [data, setData] = useState({})
    const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error' } | null>(null)
    const [tableData, setTableData] = useState<itemtype[]>([])
    interface itemtype {
        id?: number
        nombre: string
        login: string
        password: string
        rol: string
    }

    const itemInitialState: itemtype = {
        nombre: '',
        login: '',
        password: '',
        rol: ''
    }

    React.useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                setAlert(null)
            }, 4000)
            return () => clearTimeout(timer)
        }
    }, [alert])

    const [item, setItem] = useState(itemInitialState)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setItem({
            ...item,
            [name]: value
        })
    }


    const handleClear = () => {
        setItem(itemInitialState)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!item.nombre.trim() || !item.login.trim() || !item.password.trim() || !item.rol.trim() ) {
            setAlert({
                message: 'Por favor, complete todos los campos.',
                severity: 'error',
            })
            return
        }

        setAlert(null)



        async function insertData() {
            try {
                const response = await fetch('http://localhost:3030/addUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    
                    body: JSON.stringify(item),
                })

                const result = await response.json()
                if (response.ok) {
                    setAlert({
                        message: 'Datos insertados correctamente.',
                        severity: 'success',
                    })
                    fetchData()
                    setItem(itemInitialState)

                } else {
                    setAlert({
                        message: result.message || 'Error al insertar los datos.',
                        severity: 'error',
                    })
                }
            } catch (error) {
                console.error('Error al conectar con el servidor:', error)
                setAlert({
                    message: 'Error al conectar con el servidor.',
                    severity: 'error',
                })
            }
        }

        insertData()
    }

  


    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3030/getUser');
            const result = await response.json();
            if (response.ok) {
                if (Array.isArray(result.data)) {
                    const filteredData = result.data.filter((item: itemtype) => item.id !== undefined);
                    setTableData(filteredData);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

  
    useEffect(() => {
        fetchData();
    }, []);

    
    return (
        <Container>
            <Paper elevation={10} square={false} sx={{ textAlign: 'center' }} >

                <Box
                    component='form'
                    onSubmit={handleSubmit}
                >

                    <Grid2 container spacing={0}>
                        <Grid2 size={3}>
                            <TextField
                                required
                                label='Nombre'
                                variant='outlined'
                                fullWidth
                                name="nombre"
                                value={item.nombre}
                                onChange={handleChange}
                            />
                        </Grid2>
                        <Grid2 size={3}>
                            <TextField
                                required
                                label='Login'
                                variant='outlined'
                                fullWidth
                                name="login"
                                value={item.login}
                                onChange={handleChange}
                            />
                        </Grid2>
                        <Grid2 size={3}>
                            <TextField
                                required
                                label='Password'
                                variant='outlined'
                                fullWidth
                                name="password"
                                value={item.password}
                                onChange={handleChange}

                            />
                        </Grid2>
                        <Grid2 size={3}>
                            <TextField
                                required
                                label='Rol'
                                variant='outlined'
                                fullWidth
                                name="rol"
                                value={item.rol}
                                onChange={handleChange}
                            />
                        </Grid2>

                        <Grid2 size={12} sx={{ padding: 2 }}>
                            <Button type="submit" color='primary' variant='contained' sx={{ marginRight: 1 }}>Insertar Datos</Button>
                            <Button type="button" color='secondary' variant='outlined' onClick={handleClear}>Limpiar</Button>
                            {alert && (
                                <Alert severity={alert.severity} sx={{ mt: 2 }}>
                                    {alert.message}
                                </Alert>
                            )}
                        </Grid2>
                    </Grid2>
                </Box>
            </Paper>
            <TableContainer 
               component={Paper}
               sx={{
                   maxHeight: 400, 
                   overflowY: 'auto',
                   marginTop: 2, 
               }}
           >

                <Table aria-label='Tabla de Items'>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
   
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
    {tableData.length > 0 ? (
        tableData.map((row: itemtype) => (
            <TableRow key={row.id}>
                <TableCell>
                </TableCell>
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.login}</TableCell>
                <TableCell>{row.password}</TableCell>
                <TableCell>{row.rol}</TableCell>
            </TableRow>
        ))
    ) : (
        <TableRow>
            <TableCell colSpan={5}>Sin datos</TableCell>
        </TableRow>
    )}
</TableBody>
                </Table>

            </TableContainer>

        </Container>

    )

}




export default UserManager