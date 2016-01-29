import 'babel-polyfill'

import fs from 'fs'
import Baby from 'babyparse'
import elasticsearch from 'elasticsearch'

let client = new elasticsearch.Client({
	host: 'localhost:9200',
	log: 'trace'
})

const index = 'twitter', type = 'sentiment', filename = 'Sentiment.csv'

fs.readFile( filename, ( err, data ) => {
	if ( err ) {
		throw err
	}

	let json = Baby.parse( data.toString(), { header: true } )

	json.data.forEach(( d ) => {
		client.create({
			index,
			type,
			id: d.id,
			body: d
		})
	})
})
