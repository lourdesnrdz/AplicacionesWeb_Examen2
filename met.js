
const request = require('request')

const getObjectId = function (object, callback) {
	const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + object

	request({url, json:true}, function(error, response) {
		if(error) {
			console.log(error)
			callback("ERROR conexión fallida", null)
		} else {
			const data = response.body

			if(data.total === 0){
				callback("ERROR: No se encontró objeto", null)
			} else {
				const info = {
					objectId : data.objectIDs[0],
					search: object
				}

				callback(null, info)
			}
		}
	})
}

const getObjectInfo = function(objectId, search, callback) {
	const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objectId

	request({url, json:true}, function(error, response) {
		if(error) {
			console.log(error)
			callback("ERROR conexión fallida", null)
		} else {
			const data = response.body

			const info = {
				searchTerm : search,
				artist : data.constituents[0].name,
				title : data.title,
				year : data.objectEndDate,
				technique : data.medium,
				metUrl : data.objectURL
			}

				callback(null, info)
		}
	})
}

module.exports = {
	getObjectId : getObjectId,
	getObjectInfo : getObjectInfo
}