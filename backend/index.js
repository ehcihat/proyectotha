//importo el express y el cors
const express = require('express')
const cors = require('cors')
//importo el fichero login.js que está en la carpeta services
const login = require('./services/login')
const addItem = require('./services/item')
const getItem = require('./services/item')
const deleteItem = require('./services/item')
const addUser = require('./services/user')
const getUser = require('./services/user')
//Definimos el puerto por que va a escuchar nuestra API las peticiones
const port  = 3030

const app = express()
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(cors())



//Ejemplo para ver cómo funciona un endpoint:
//este endpoint / y devuelve un mensaje
app.get('/', function (req, res) {
    res.json({message: 'Hola Mundo!'})
})

//Creación del endpoint: /login
//llama al fichero login.js usando el método getUserData pasándole
//el login (user) y la contraseña (password)
app.get('/login', async function(req, res, next) {
    console.log(req.query)
    console.log(req.query.user)
    console.log(req.query.password)
    try {
        res.json(await login.getUserData(req.query.user, req.query.password))
    } catch (err) {
        console.error(`Error while getting data `, err.message)
        next(err)
    }
})

app.post('/addItem', async function(req, res, next) {
    try {
       
        req.query = req.body
        const rowsInserted = await addItem.insertData(req, res) 
        res.json({ success: true, rowsInserted })
    } catch (err) {
    console.error(`Error while inserting items `, err.message)
    next(err)
    }
    })
app.post('/addUser', async function(req, res, next) {

    try{

        req.query = req.body
        const rowsInserted = await addUser.insertUserData(req, res)
        res.json({ success: true, rowsInserted })
    }catch (err){
        console.error(`Error while inserting users: ${err.message}`)
        next(err)
    }

})

    app.get('/getItem', async function (req, res, next) {
        try {
            const { nombre, marca, tipo, precio } = req.query
            const result = await getItem.getData(nombre, marca, tipo, precio)
            res.json(result)
        } catch (err) {
            console.error(`Error while getting items: ${err.message}`)
            next(err)  
        }
    })

    app.get('/getUser', async function (req, res, next) {
        try {
            const { nombre, login, password, rol} = req.query
            const result = await getUser.getUserData(nombre, login, password, rol)
            res.json(result)
        }catch (err){
            console.error(`Error while getting items: ${err.message}`)
            next(err)
        }
    })

    app.delete('/deleteItem/:id', async function(req, res, next) {
        try {
            const { id } = req.params;  
        
            
            if (!id) {
                return res.status(400).json({ message: 'Introduzca un ID válido' });
            }
            
            const result = await deleteItem.deleteData(id);
    
            if (result === 0) {
                return res.status(404).json({ message: `El ID ${id} no existe` });
            }
    
            res.json({ message: `El ID ${id} se ha eliminado correctamente` });
        } catch (err) {
            console.error(`Error while deleting items`, err.message)
            next(err);
        }
    });

//Iniciamos la API
app.listen(port)
console.log('API escuchando en el puerto ' + port)