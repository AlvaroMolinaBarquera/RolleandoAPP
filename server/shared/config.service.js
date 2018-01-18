const ENVIROMENT = './enviroments/env.json';
const fs = require('fs');
var cfg;

try {
    /** Lee el entorno de un archivo env,*/
    var env = fs.readFileSync(ENVIROMENT);
    JSON.parse(env).env
    var readed = fs.readFileSync('./enviroments/' + JSON.parse(env).env + '.config.json');
    cfg = JSON.parse(readed);
} catch (e) {
    console.error('Se ha producido un error al cargar la configuración basica del Node', e);
}


/** Obtiene una propiedad de la configuración */
exports.getProperty = function (property) {
    return cfg[property] || null;
}
