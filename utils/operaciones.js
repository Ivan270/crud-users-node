const fs = require('fs');

const leerArchivo = (archivo) => {
	return new Promise((resolve, reject) => {
		fs.readFile(`./db/${archivo}`, 'utf8', (error, data) => {
			if (error) {
				console.log(error);
				reject('Error al leer archivo');
			}
			resolve(JSON.parse(data));
		});
	});
};

const escribirArchivo = (archivo, data) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(
			`./db/${archivo}`,
			JSON.stringify(data, null, 4),
			'utf8',
			(error) => {
				if (error) {
					console.log(error);
					reject('Error al escribir archivo');
				}
				resolve('Se ha guardado correctamente la información');
			}
		);
	});
};

module.exports = { leerArchivo, escribirArchivo };
