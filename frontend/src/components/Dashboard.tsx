
import React, { useEffect } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid2 from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store';


function Dashboard() {
    const userData = useSelector((state: RootState) => state.authenticator);
    const [data, setData] = useState({})
    const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error' } | null>(null)
    const [tableData, setTableData] = useState<itemtype[]>([])
    interface itemtype {
        id?: number
        nombre: string
        marca: string
        tipo: string
        precio: number
    }

    const itemInitialState: itemtype = {
        nombre: ' ',
        marca: ' ',
        tipo: ' ',
        precio: 0
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

        if (!item.nombre.trim() || !item.marca.trim() || !item.tipo.trim() || item.precio < 0) {
            setAlert({
                message: 'Por favor, complete todos los campos.',
                severity: 'error',
            })
            return
        }

        setAlert(null)



        async function insertData() {
            try {
                const response = await fetch('http://localhost:3030/addItem', {
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

    const handleDeleteItem = async (row: itemtype) => {
        if (row.id === undefined) {
            setAlert({ message: 'ID no válido.', severity: 'error' });
            return;
        }
        try {
            const response = await fetch(`http://localhost:3030/deleteItem/${row.id}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (response.ok) {
                setTableData(tableData.filter(item => item.id !== row.id));
                setAlert({ message: 'Item eliminado correctamente.', severity: 'success' });
            } else {
                setAlert({ message: result.message || 'Error al eliminar el item.', severity: 'error' });
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
            setAlert({ message: 'Error al conectar con el servidor.', severity: 'error' });
        }
    }


    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3030/getItem');
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
                                label='Marca'
                                variant='outlined'
                                fullWidth
                                name="marca"
                                value={item.marca}
                                onChange={handleChange}
                            />
                        </Grid2>
                        <Grid2 size={3}>
                            <TextField
                                required
                                label='Tipo'
                                variant='outlined'
                                fullWidth
                                name="tipo"
                                value={item.tipo}
                                onChange={handleChange}

                            />
                        </Grid2>
                        <Grid2 size={3}>
                            <TextField
                                required
                                label='Precio'
                                variant='outlined'
                                fullWidth
                                type="number"
                                name="precio"
                                value={item.precio}
                                onChange={handleChange}
                            />
                        </Grid2>

                        <Grid2 size={12} sx={{ padding: 2 }}>
                            <Tooltip title="Insertar datos" placement="bottom" arrow>
                                <Button type="submit" color='primary' variant='contained' sx={{ marginRight: 1 }}>Insertar Datos</Button>
                            </Tooltip>
                            <Tooltip title="Limpiar campos" placement="bottom" arrow>
                                <Button type="button" color='secondary' variant='outlined' onClick={handleClear}>Limpiar</Button>
                            </Tooltip>
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

                                        {userData.userRole === 'admin' ?
                                            <Button onClick={() => handleDeleteItem(row)}>
                                                <Tooltip title="Eliminar registro" placement="top" arrow>
                                                    <DeleteForeverIcon sx={{ color: "secondary.main" }} />
                                                </Tooltip>
                                            </Button>
                                            : ""}

                                    </TableCell>

                                    <TableCell>{row.nombre}</TableCell>
                                    <TableCell>{row.marca}</TableCell>
                                    <TableCell>{row.tipo}</TableCell>
                                    <TableCell>{row.precio}</TableCell>
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




export default Dashboard