
const express = require('express')
const request = require('request')
const met = require('./met.js')

const app = express()

const port = process.env.PORT || 3000


const matricula = 'A01039707'
const nombre = 'Lourdes Navarrete Rodríguez'

app.get('', function(req, res) {
	res.send("<h1>Hola!</h1>")
	res.send("<h2> Ingresa la ruta /students/ con tu id o /met?search= para buscar un objeto</h2>")
})

app.get('/students/:id', function(req, res) {
	if(req.params.id === matricula){
		res.send({
			id : matricula,
			fullname : nombre,
			nickname : "Luly",
			age : 22
		})
	} else {
		res.send({
			ERROR : 'Matrícula Inválida'
		})
	}
})

app.get('/met', function(req, res) {
	if (!req.query.search) {
	    return res.send('ERROR: Debes enviar un objeto')
	}

	met.getObjectId(req.query.search, function(error, response) {
		if(error){
			return res.send({
				error : error
			})
		}
		met.getObjectInfo(response.objectId, response.search, function(error, response) {
			if(error){
				return res.send({
					error : error
				})
			} 
			res.send(response)
		})
	})

})

app.get('*', function(req, res) {
  res.send({
    error:'ERROR: Ruta no valida'
  })
})

app.listen(port, function() {
	console.log('up and at em')
})
