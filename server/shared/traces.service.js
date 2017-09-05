  var winston = require('winston');
  require('winston-daily-rotate-file');
  // Generamos el logger por defecto
  
  
  var logger = new (winston.Logger)({
	  	level: 'debug',
	    transports: [
	    	new (winston.transports.DailyRotateFile)({
	    	    filename: './logs/log.log',
	    	    datePattern: 'dd-MM-yyyy.',
	    	    prepend: true,
	    	    json: false, // If true, messages will be logged as JSON (default true).
	    	    tailable: true,
	    	    zippedArchive: true, // If true, all log files but the current one will be zipped.
	    	    maxFiles: 5, // Numero maximo de archivos
 	    
	    	  }),
	    	new (winston.transports.Console)({
	    		colorize: true, // Colorea las trazas por consola
	    		timestamp: true, // Coloca el tiempo justamente de la traza.
	    	})
	    ] 
	  });

 
 function writeTrace(level, message, params, meta) {
	 if (!params) {
		 params = {}
	 };
	 logger[getLevel(level)](meta, message, params);
 }
 
 function getLevel(level) {
	 var levels = ['error', 'warn', 'info', 'debug'];
	 return levels[level] || 'debug';
 }
 const TRACES_LEVEL = {
	 ERROR: 0,
	 WARN: 1,
	 INFO: 2,
	 DEBUG: 3,
 }
 exports.writeTrace = writeTrace;
 exports.TRACES_LEVEL = TRACES_LEVEL;