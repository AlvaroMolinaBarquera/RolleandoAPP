const dbconnection = 'mongodb://admin:St0ryt3ll3r@ds119524.mlab.com:19524/chat_messages';
const MongoClient = require('mongodb').MongoClient
const tracesService = require('./traces.service')
let db;
var app = require('./../../server.js');

exports.databaseStore = databaseStore;
exports.databaseRecover = databaseRecover;
exports.databaseUpdateOne = databaseUpdateOne;
exports.databaseInsertOne = databaseInsertOne
MongoClient.connect(dbconnection, (err, database) => {
    if (err) return tracesService.writeTrace(tracesService.TRACES_LEVEL.ERROR, 'Error conneting db', err);
    db = database
    app.listen(4444, () => {
    	tracesService.writeTrace(tracesService.TRACES_LEVEL.INFO, 'MONGODB listening: 4444')
    })
})


function databaseStore(collection, storeData) {
	tracesService.writeTrace(tracesService.TRACES_LEVEL.INFO, 'Se procede a guardar en la colección ' + collection,  storeData)
    db.collection(collection).save(storeData, (err, result) => {
        if (err) return tracesService.writeTrace(tracesService.TRACES_LEVEL.ERROR, 'Error saving MONGODBDB ',  err)
        tracesService.writeTrace(tracesService.TRACES_LEVEL.INFO, 'Data saved in DB: ' + collection, storeData);
    })
}

function databaseInsertOne(collection, storeData, callback) {
	tracesService.writeTrace(tracesService.TRACES_LEVEL.INFO, 'Se procede a guardar en la colección ' + collection,  storeData)
    db.collection(collection).insert(storeData, (err, result) => {
        if (err) {
            tracesService.writeTrace(tracesService.TRACES_LEVEL.ERROR, 'Error saving MONGODBDB ',  err);
            return callback(err);
        } 
        tracesService.writeTrace(tracesService.TRACES_LEVEL.INFO, 'Data saved in DB: ' + collection, storeData);
        return callback(result);
    })
}

function databaseRecover(collection, searchParams, callback) {
	db.collection(collection).find(searchParams).toArray((err, result) => {
        if (err) return tracesService.writeTrace(tracesService.TRACES_LEVEL.ERROR, 'Error recovering MONGODBDB ',  err)
        tracesService.writeTrace(tracesService.TRACES_LEVEL.INFO, 'Data recover from DB: ' + collection, result);
        return callback(result);	
	})
}

function databaseUpdateOne(collection, query, update) {
	db.collection(collection).updateOne(query, update, (err, result) => {
        if (err) return tracesService.writeTrace(tracesService.TRACES_LEVEL.ERROR, 'Error updating MONGODBDB ',  err)
        tracesService.writeTrace(tracesService.TRACES_LEVEL.INFO, 'Update data in DB: ' + collection, result);
	})
}
