// Я оставил этот контроллер тут в качестве примера. Он нигде не используеться
const logger = require('logger').logger;
const config = require('config');
const crypto = require('crypto');

const google = config.get('google');
const language = google.maps.language;

//https://googlemaps.github.io/libraries
const createClient = require('@google/maps').createClient;

const cache = {};

module.exports.init = () => Promise.resolve().then(() => {
	const client = createClient({
		key: google.console_api_key
		, Promise
		//, language: google.maps.language
	});

	module.exports.client = client;

	/*
		API collection in client
		{ directions: [Function],
			distanceMatrix: [Function],
			elevation: [Function],
			elevationAlongPath: [Function],
			geocode: [Function],
			geolocate: [Function],
			reverseGeocode: [Function],
			places: [Function],
			placesNearby: [Function],
			placesRadar: [Function: deprecated],
			place: [Function],
			placesPhoto: [Function],
			placesAutoComplete: [Function],
			placesQueryAutoComplete: [Function],
			snapToRoads: [Function],
			nearestRoads: [Function],
			speedLimits: [Function],
			snappedSpeedLimits: [Function],
			timezone: [Function] 
		}
	*/
});

function queryToKey(query) {
	const key = crypto
		.createHash('sha1')
		.update(JSON.stringify(query))
		.digest('hex');

	return key;
}

function queryFunctWrapper(query, functName) {
	const client = module.exports.client;
	const queryHash = queryToKey(query);

	logger.debug(
		'Requesting to Google Maps API.'
		, `funct: '${functName}'`
		, 'query: ', query
	);

	const request = () => Promise.resolve()
		.then(() => {
			if (!client) {
				const message = `Not init client for ${functName}`;
				logger.error(message);
				throw new Error(message);
			}
		})
		.then(() => {

			if (!(functName in cache)) {
				cache[functName] = {};
			}
			if (queryHash in cache[functName]) {
				logger.debug(`Return result from ${functName} cache, query:`, query);
				return cache[functName][queryHash];
			}

			return client[functName](query).asPromise()
				.then((response) => {

					let data = null;

					if (functName === 'placesPhoto') {
						data = response.requestUrl;
					} else {
						data = response.json;
					}

					logger.debug('Request to Google Maps API cpmplete.');

					return data;
				})
				.catch((err) => {

					logger.warn(`Problems is gooogle api. Code: ${err.code}`);
					throw ({
						status: 'gooogle_api_err'
						, code: err.code  || err
					});
				});
		});

	return new Promise((res, rej) => {

		let tryRequestNo = 1;
		request()
			.catch((err) => {

				if (!(err.status === 'gooogle_api_err' && err.code === 'EAI_AGAIN')) {
					throw err;
				}

				tryRequestNo++;
				if (tryRequestNo > 3) {
					rej(err);
				}

				logger.warn(`Try request to google api no ${tryRequestNo}`);
				return request();
			})
			.then((data) => {

				if (functName === 'placesPhoto') {
					res(data);
					return;
				}

				const status = data.status;

				if (status === 'ZERO_RESULTS') {
					res(data);
					return;
				}

				if (status !== 'OK') {
					const message = `Geoapi request problem, status: ${status}`;
					logger.warn(message);
					throw new Error(message);
				}

				if (!(functName in cache)) {
					cache[functName] = {};
				}

				cache[functName][queryHash] = data;
				res(data);
			});
	});
}

module.exports.placesAutoComplete = (query) => {
	return queryFunctWrapper(query, 'placesAutoComplete').then((data) => {
		return data.predictions;
	});
};

module.exports.geocode = (query) => {
	return queryFunctWrapper(query, 'geocode').then((data) => {
		const results = data.results;
		return results;
	});
};

module.exports.place = (query) => {
	return queryFunctWrapper(query, 'place').then((data) => {
		const result = data.result;
		return result;
	});
};

module.exports.placesPhoto = (query) => {
	return queryFunctWrapper(query, 'placesPhoto');
};
