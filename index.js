const express = require('express');
const { create } = require('express-handlebars');
const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');
const Usuario = require('./model/Usuario.js');

// Instancia express
const app = express();

// Instancia handlebars
const hbs = create({
	partialsDir: ['views/partials'],
});

// JSON usuarios
let usuarios = fs.readFileSync(
	path.join(__dirname, 'db', 'usuarios.json'),
	'utf8',
	(error, data) => {
		let usuarios = data;
		return usuarios;
	}
);
let arrayUsuarios = JSON.parse(usuarios);

// registra motor de plantillas en app, con el proposito que se puedan reconocer los archivos con extension handlebars
app.engine('handlebars', hbs.engine);

// establece handlebars como motor predeterminado con el fin que pueda renderizar las vistas
app.set('view engine', 'handlebars');

// indica ubicación de las vistas
app.set('views', __dirname + '/views');

// MIDDLEWARES
// permite procesar información enviada en body (payload) de un request
app.use(express.json());

// Establecer carpeta public como publica, de manera que quedan sus archivos disponibles para ser consumidos accediendo a localhost:3000/public
app.use(express.static('public'));

// Publicar carpeta dist de BOOTSTRAP
app.use(
	'/bootstrap',
	express.static(__dirname + '/node_modules/bootstrap/dist')
);

// RUTAS VISTAS
// configurar ruta principal para renderizar Home
app.get(['/', '/home'], (req, res) => {
	res.render('home');
});
// Se cambiará el layout de vista about al de nombre secondary
// app.get('/about', (req, res) => {
// 	res.render('about', {
// 		layout: 'secondary',
// 	});
// });
app.get('/about', (req, res) => {
	res.render('about');
});

app.get('/productos', (req, res) => {
	res.render('productos', {
		titulo: 'Productos',
		productos: [
			{ id: 1, nombre: 'Pan', precio: 1500 },
			{ id: 2, nombre: 'Queso', precio: 3000 },
			{ id: 3, nombre: 'Jamón', precio: 2800 },
			{ id: 4, nombre: 'Cloro', precio: 800 },
			{ id: 5, nombre: 'Toalla', precio: 5500 },
		],
	});
});
// app.get('/usuarios', (req, res) => {
// 	res.render('usuarios', { usuarios: arrayUsuarios });
// });

app.get('/users', (req, res) => {
	let usuario = new Usuario();
	let respuesta = usuario.findAll();
	respuesta.then((data) => {
		res.render('users', {
			users: data.usuarios,
		});
	});
});

// RUTAS ENDPOINTS
app.post('/usuarios', async (req, res) => {
	try {
		let { nombre, apellido, email } = req.body;
		let id = uuid().slice(0, 6);
		let newUser = new Usuario(id, nombre, apellido, email);
		let respuesta = await newUser.save();
		res.status(201).send({ code: 201, message: respuesta });
	} catch (error) {
		res.status(500).send('Ha ocurrido un error al crear el usuario en la DB');
	}
});

// INICIAR SERVIDOR
// Metodo listen para escuchar peticiones de apps cliente
const PORT = 3000;
app.listen(PORT, () => {
	console.log('Servidor escuchando en puerto http://localhost:' + PORT);
});
