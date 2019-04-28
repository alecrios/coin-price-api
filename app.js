const express = require('express');
const apicache = require('apicache');
const to = require('await-to-js').default;
const CoinGecko = require('coingecko-api');

const app = express();
const port = 3000;
const coinGecko = new CoinGecko();
const cache = apicache.options({
	defaultDuration: '1 minute',
	statusCodes: {
		include: [200],
	},
}).middleware;

app.use(cache());

app.get('/price', async (req, res) => {
	const [error, response] = await to(coinGecko.coins.fetch('nano'));
	if (!response || !response.success) throw Error(error);
	res.send(response.data.market_data.current_price);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
