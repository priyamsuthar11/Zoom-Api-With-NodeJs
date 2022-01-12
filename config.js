const env = 'production'

//insert your API Key & Secret for each environment, keep this file local and never push it to a public repo for security purposes.
const config = {
	production:{
		APIKey : 'npB7hc30Qzqd1eSVC3Tgdg',
		APISecret : 'ABZHmWGDJiDX0vAV7e7wfEf9YRyNeM78w913'
	}

};

module.exports = config[env]
