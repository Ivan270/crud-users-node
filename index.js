const express = require('express');
const { create } = require('express-handlebars');

// Instancia express
const app = express();

// Instancia handlebars
const hbs = create({
	partialsDir: ['views/partials'],
});

// registra motor de plantillas en app, con el proposito que se puedan reconocer los archivos con extension handlebars
app.engine('handlebars', hbs.engine);
// establece handlebars como motor predeterminado con el fin que pueda renderizar las vistas
app.set('view engine', 'handlebars');
// indica ubicacion de las vistas
app.set('views', __dirname + '/views');
// Establecer carpeta public como publica, de manera que quedan sus archivos disponibles para ser consumidos accediendo a localhost:3000/public
app.use(express.static('public'));
// Publicar carpeta dist de BOOTSTRAP
app.use(
	'/bootstrap',
	express.static(__dirname + '/node_modules/bootstrap/dist')
);

// RUTAS
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
app.get('/usuarios', (req, res) => {
	res.render('usuarios', {
		usuarios: [
			{
				id: 1,
				nombre: 'Carlos',
				apellido: 'Pérez',
				email: 'carlos@mail.com',
				telefono: '1111111',
			},
			{
				id: 2,
				nombre: 'Maria',
				apellido: 'López',
				email: 'maria@mail.com',
				telefono: '2222222',
			},
			{
				id: 3,
				nombre: 'José',
				apellido: 'Faúndez',
				email: 'jose@mail.com',
				telefono: '3333333',
			},
			{
				id: 4,
				nombre: 'Antonia',
				apellido: 'Bustos',
				email: 'antonia@mail.com',
				telefono: '4444444',
			},
		],
	});
});

// INICIAR SERVIDOR
// Metodo listen para escuchar peticiones de apps cliente
const PORT = 3000;
app.listen(PORT, () => {
	console.log('Servidor escuchando en puerto http://localhost:' + PORT);
});
