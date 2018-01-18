const _ = require('underscore');
const XlsxPopulate = require('xlsx-populate');
const tracesService = require('./traces.service')
const cfgService = require('./config.service');
const EXCEL_PATH = cfgService.getProperty('node').templates.excel;

/**
 * @desc En base a una salida de una transacción lee 
 * de una ruta predefinida un excel y sustituye los (Nombres Definidos) por lo que se corresponda con el campo de salida
 * de dicha transacción.
 * @param {string} fileTemplate Nombre del archivo donde va a estar la plantilla de excel
 * @param {any} trxData Datos de la transacción
 */
function trxToExcel(fileTemplate, trxData) {
    XlsxPopulate.fromFileAsync(`${EXCEL_PATH}${fileTemplate}.xlsx`)
        .then((workbook) => {
            for (var trxFormat in trxData) {
                // Si no es un Array lo igualamos para tratar a todas las entradas por igual
                if (!_.isArray(trxData[trxFormat])) {
                    trxData[trxFormat] = [trxData[trxFormat]];
                }
                // Recorremos cada objeto del array
                for (var format in trxData[trxFormat]) {
                    // Luego recorremos las claves de cada objeto
                    for (var key in trxData[trxFormat][format]) {
                        // Si el nombre del nombre del formato mas clave PEM9804.SURNAM2 existe
                        // Obtenemos la celda
                        var cell = workbook.definedName(`${trxFormat}.${key}`);

                        if (cell != null) {
                            var sheet = cell.sheet().name();
                            var row = cell.rowNumber();
                            var column = cell.columnNumber()
                            // A la columna le añadimos la posición en el Array
                            workbook.sheet(sheet).cell(row + Number(format), column).value(trxData[trxFormat][format][key])
                        }
                    }
                }
            }
            return workbook.outputAsync();
        })
        .then((data) => {
            // Set the output file name.
            res.attachment(fileTemplate + '.xlsx');

            // Send the workbook.
            return data;
        })
        .catch((error) => {
            tracesService.writeNodeLogs(
                'trxToExcel: Error en la exportación a EXCEL',
                0,
                'excelService.js',
                error
            )
            return error;
        })

}