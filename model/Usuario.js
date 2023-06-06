const { leerArchivo, escribirArchivo } = require('../utils/operaciones.js');

class Usuario {
	constructor(id, nombre, apellido, email) {
		this.id = id;
		this.nombre = nombre;
		this.apellido = apellido;
		this.email = email;
	}
	async findAll() {
		return await leerArchivo('personas.json');
	}
	findByName(name) {
		console.log('Buscar por nombre');
	}
	findByEmail(email) {
		console.log('Buscar por email');
	}
	async save() {
		let data = await this.findAll();
		let usuario = {
			id: this.id,
			nombre: this.nombre,
			apellido: this.apellido,
			email: this.email,
		};
		data.usuarios.push(usuario);
		return await escribirArchivo('personas.json', data);
	}
	update(usuario) {
		console.log('actualizar usuario');
	}
	delete(id) {
		console.log('eliminar usuario');
	}
}

// let usuario = new Usuario();
// let respuesta = usuario.findAll();
// respuesta.then((resp) => console.log(resp));

module.exports = Usuario;
